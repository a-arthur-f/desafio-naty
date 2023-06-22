import CategoryHeader from "@/components/CategoryHeader";
import DataList, { DataItem } from "@/components/DataList";
import Icon from "@/components/Icon";
import config from "@/config";
import { Box, Button, Typography } from "@mui/material";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { ClientData } from "../../../types";

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
  return (
    <>
      <Head>
        <title>Clientes</title>
      </Head>
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        gap={{ xs: 1, md: 4 }}
      >
        <CategoryHeader
          title="Clientes"
          icon={<Icon name="client" />}
          action={[
            <Button variant="outlined" color="secondary" size="large">
              Adicionar
            </Button>,
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
