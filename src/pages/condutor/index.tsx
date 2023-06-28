import CategoryHeader from "@/components/CategoryHeader";
import DataList, { DataItem } from "@/components/DataList";
import Icon from "@/components/Icon";
import config from "@/config";
import { Box, Button, SxProps } from "@mui/material";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { DriverData } from "../../types";
import Link from "next/link";

export default function Driver({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  function getListItems(): DataItem[] {
    return data.map<DataItem>((item) => ({
      id: item.id,
      info1: { name: "Nº da habilitação", value: item.numeroHabilitacao },
      info2: { name: "Nome", value: item.nome },
    }));
  }
  const mainStyle: SxProps = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <>
      <Head>
        <title>Condutores</title>
      </Head>
      <Box sx={mainStyle}>
        <CategoryHeader
          title="Condutores"
          icon={<Icon name="driver" />}
          action={[
            <Link key="new-driver-link" href="/condutor/novo">
              <Button variant="outlined" color="secondary" size="large">
                NOVO CONDUTOR
              </Button>
            </Link>,
          ]}
        />

        <DataList
          link="condutor"
          icon={<Icon name="driver" />}
          items={getListItems()}
        />
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${config.api}/Condutor`);
  const data: DriverData[] = await res.json();

  return { props: { data } };
}
