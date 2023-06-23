import CategoryHeader from "@/components/CategoryHeader";
import DataList, { DataItem } from "@/components/DataList";
import Icon from "@/components/Icon";
import config from "@/config";
import { Box, Button, SxProps } from "@mui/material";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { ClientData } from "../../../types";
import Link from "next/link";

export default function Client({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  function getListItems(): DataItem[] {
    return data.map<DataItem>((item) => ({
      id: item.id,
      info1: { name: "Nº do documento", value: item.numeroDocumento },
      info2: { name: "Nome", value: item.nome },
    }));
  }
  const mainStyle: SxProps = {
    display: "flex",
    flexDirection: "column",
    gap: { xs: 1, md: 4 },
  };

  return (
    <>
      <Head>
        <title>Clientes</title>
      </Head>
      <Box sx={mainStyle}>
        <CategoryHeader
          title="Clientes"
          icon={<Icon name="client" />}
          action={[
            <Link href="/cliente/novo">
              <Button variant="outlined" color="secondary" size="large">
                NOVO CLIENTE
              </Button>
            </Link>,
          ]}
        />

        <DataList
          link="cliente"
          icon={<Icon name="client" />}
          items={getListItems()}
        />
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${config.api}/Cliente`);
  const data: ClientData[] = await res.json();

  return { props: { data } };
}
