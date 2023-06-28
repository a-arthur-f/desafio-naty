import Details from "@/components/Details";
import config from "@/config";
import { Box, Button } from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { DriverData } from "../../../../types";
import CategoryHeader from "@/components/CategoryHeader";
import Icon from "@/components/Icon";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import RemoveDialog from "@/components/RemoveDialog";
import { LoadingContext } from "@/loadingContext";

export default function DriverDetails({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const handleRemoveDialogClose = () => {
    setOpenRemoveDialog(false);
  };
  const handleRemoveDialogAction = async () => {
    try {
      setLoading(true);
      await fetch(`${config.api}/Condutor/${router.query.id}`, {
        method: "DELETE",
        body: JSON.stringify({ id: Number(router.query.id) }),
        headers: [["Content-Type", "application/json"]],
      });
      router.push("/condutor");
    } catch (e) {
      console.log(e);
      router.push("/condutor");
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
        title="Detalhes do condutor"
        action={[
          <Link key={"editar"} href={`/condutor/${router.query.id}/editar`}>
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
        icon={<Icon name="driver" />}
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
      const res = await fetch(`${config.api}/Condutor/${params.id}`);
      const driver: DriverData = await res.json();
      return {
        props: {
          data: [
            { name: "ID", value: String(driver.id) },
            { name: "Nº da habilitação", value: driver.numeroHabilitacao },
            {
              name: "Categoria da habilitação",
              value: driver.catergoriaHabilitacao,
            },
            { name: "Nome", value: driver.nome },
            {
              name: "Vencimento da habilitação",
              value: new Date(
                driver.vencimentoHabilitacao
              ).toLocaleDateString(),
            },
          ],
        },
      };
    } catch (e) {
      return {
        redirect: {
          destination: "/condutor",
          permanent: false,
        },
      };
    }
  }
}
