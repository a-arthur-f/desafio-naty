import Details from "@/components/Details";
import config from "@/config";
import { Box, Button } from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ClientData } from "../../../types";
import CategoryHeader from "@/components/CategoryHeader";
import Icon from "@/components/Icon";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import RemoveDialog from "@/components/RemoveDialog";
import { LoadingContext } from "@/loadingContext";
import { ErrorContext } from "@/errorContext";

export default function ClientDetails({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { setError } = useContext(ErrorContext);
  const { setLoading } = useContext(LoadingContext);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const handleRemoveDialogClose = () => {
    setOpenRemoveDialog(false);
  };
  const handleRemoveDialogAction = async () => {
    try {
      setLoading(true);
      await fetch(`${config.api}/Cliente/${router.query.id}`, {
        method: "DELETE",
        body: JSON.stringify({ id: Number(router.query.id) }),
        headers: [["Content-Type", "application/json"]],
      });
      router.push("/cliente");
    } catch (e) {
      setError("Houve uma falha!");
      router.push("/cliente");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box component="main">
      <RemoveDialog
        open={openRemoveDialog}
        action={handleRemoveDialogAction}
        onClose={handleRemoveDialogClose}
      />
      <CategoryHeader
        title="Detalhes do cliente"
        action={[
          <Link key={"editar"} href={`/cliente/${router.query.id}/editar`}>
            <Button variant="outlined" color="secondary" size="large">
              Editar
            </Button>
          </Link>,

          <Button
            key={"remover"}
            variant="outlined"
            color="error"
            size="large"
            onClick={() => setOpenRemoveDialog(true)}
          >
            Remover
          </Button>,
        ]}
        icon={<Icon name="client" />}
      />
      <Details data={data} />
    </Box>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  if (params) {
    try {
      const res = await fetch(`${config.api}/Cliente/${params.id}`);
      const client: ClientData = await res.json();
      return {
        props: {
          data: [
            { name: "ID", value: String(client.id) },
            { name: "Nº do documento", value: client.numeroDocumento },
            { name: "Tipo do documento", value: client.tipoDocumento },
            { name: "Nome", value: client.nome },
            { name: "Cidade", value: client.cidade },
            { name: "Bairro", value: client.bairro },
            { name: "Logradouro", value: client.logradouro },
            { name: "Número", value: client.numero },
            { name: "UF", value: client.uf },
          ],
        },
      };
    } catch (e) {
      return {
        redirect: {
          destination: "/cliente",
          permanent: false,
        },
      };
    }
  }
}
