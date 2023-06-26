import Details from "@/components/Details";
import config from "@/config";
import { Box, Button } from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ClientData } from "../../../../types";
import CategoryHeader from "@/components/CategoryHeader";
import Icon from "@/components/Icon";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ClientDetails({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <Box component="main">
      <CategoryHeader
        title="Detalhes do cliente"
        action={[
          <Link key={"editar"} href={`/cliente/${router.query.id}/editar`}>
            <Button variant="outlined" color="secondary" size="large">
              Editar
            </Button>
          </Link>,

          <Button key={"remover"} variant="outlined" color="error" size="large">
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
