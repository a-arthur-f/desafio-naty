import CategoryHeader from "@/components/CategoryHeader";
import DataList, { DataItem } from "@/components/DataList";
import Icon from "@/components/Icon";
import config from "@/config";
import { Box, Button, SxProps } from "@mui/material";
import { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { VehicleData } from "../../types";
import Link from "next/link";

export default function Vehicle({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  function getListItems(): DataItem[] {
    return data.map<DataItem>((item) => ({
      id: item.id,
      info1: { name: "Placa", value: item.placa },
      info2: { name: "Marca / Modelo", value: item.marcaModelo },
    }));
  }
  const mainStyle: SxProps = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <>
      <Head>
        <title>Veículos</title>
      </Head>
      <Box sx={mainStyle}>
        <CategoryHeader
          title="Veículos"
          icon={<Icon name="vehicle" />}
          action={[
            <Link key="new-vehicle-link" href="/veiculo/novo">
              <Button variant="outlined" color="secondary" size="large">
                NOVO VEÍCULO
              </Button>
            </Link>,
          ]}
        />

        <DataList
          link="veiculo"
          icon={<Icon name="vehicle" />}
          items={getListItems()}
        />
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${config.api}/Veiculo`);
  const data: VehicleData[] = await res.json();

  return { props: { data } };
}
