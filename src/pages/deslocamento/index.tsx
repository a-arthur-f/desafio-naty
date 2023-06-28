import CategoryHeader from "@/components/CategoryHeader";
import DataList, { DataItem } from "@/components/DataList";
import Icon from "@/components/Icon";
import config from "@/config";
import { Box, Button, SxProps } from "@mui/material";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { ClientData, DisplacementData, DriverData } from "../../types";
import Link from "next/link";

export default function Vehicle({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  function getListItems(): DataItem[] {
    return data.map<DataItem>((item) => ({
      id: item.id,
      info1: { name: "Condutor", value: item.nomeCondutor },
      info2: { name: "Cliente", value: item.nomeCliente },
    }));
  }
  const mainStyle: SxProps = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <>
      <Head>
        <title>Deslocamentos</title>
      </Head>
      <Box sx={mainStyle}>
        <CategoryHeader
          title="Deslocamentos"
          icon={<Icon name="displacement" />}
          action={[
            <Link key="new-displacement-link" href="/deslocamento/novo">
              <Button variant="outlined" color="secondary" size="large">
                NOVO DESLOCAMENTO
              </Button>
            </Link>,
          ]}
        />

        <DataList
          link="deslocamento"
          icon={<Icon name="displacement" />}
          items={getListItems()}
        />
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const resDisplacement = await fetch(`${config.api}/Deslocamento`);
  const dataDisplacement: DisplacementData[] = await resDisplacement.json();
  const data: { id: number; nomeCondutor: string; nomeCliente: string }[] = [];

  for (const displacement of dataDisplacement) {
    const resClient = await fetch(
      `${config.api}/Cliente/${displacement.idCliente}`
    );
    const dataClient: ClientData = await resClient.json();
    const resDriver = await fetch(
      `${config.api}/Condutor/${displacement.idCondutor}`
    );
    const dataDriver: DriverData = await resDriver.json();

    data.push({
      id: displacement.id,
      nomeCliente: dataClient.nome,
      nomeCondutor: dataDriver.nome,
    });
  }

  return { props: { data } };
}
