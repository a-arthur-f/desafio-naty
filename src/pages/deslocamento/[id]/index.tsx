import Details from "@/components/Details";
import config from "@/config";
import { Box, Button } from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import {
  ClientData,
  DisplacementData,
  DriverData,
  VehicleData,
} from "../../../../types";
import CategoryHeader from "@/components/CategoryHeader";
import Icon from "@/components/Icon";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import RemoveDialog from "@/components/RemoveDialog";

export default function DisplacementDetails({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const handleRemoveDialogClose = () => {
    setOpenRemoveDialog(false);
  };
  const handleRemoveDialogAction = async () => {
    try {
      await fetch(`${config.api}/Deslocamento/${router.query.id}`, {
        method: "DELETE",
        body: JSON.stringify({ id: Number(router.query.id) }),
        headers: [["Content-Type", "application/json"]],
      });
      router.push("/deslocamento");
    } catch (e) {
      console.log(e);
      router.push("/deslocamento");
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
        title="Detalhes do deslocamento"
        action={[
          <Link key={"editar"} href={`/deslocamento/${router.query.id}/editar`}>
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
        icon={<Icon name="displacement" />}
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
      const res = await fetch(`${config.api}/Deslocamento/${params.id}`);
      const displacement: DisplacementData = await res.json();

      const resClient = await fetch(
        `${config.api}/Cliente/${displacement.idCliente}`
      );
      const client: ClientData = await resClient.json();

      const resDriver = await fetch(
        `${config.api}/Condutor/${displacement.idCondutor}`
      );
      const driver: DriverData = await resDriver.json();

      const resVehicle = await fetch(
        `${config.api}/Veiculo/${displacement.idVeiculo}`
      );
      const vehicle: VehicleData = await resVehicle.json();

      return {
        props: {
          data: [
            { name: "ID", value: String(displacement.id) },
            { name: "ID do cliente", value: String(client.id) },
            { name: "Nome do cliente", value: client.nome },
            { name: "ID do condutor", value: String(driver.id) },
            { name: "Nome do condutor", value: driver.nome },
            { name: "ID do veículo", value: String(vehicle.id) },
            { name: "Marca / Modelo", value: vehicle.marcaModelo },
            { name: "Km inicial", value: String(displacement.kmInicial) },
            {
              name: "Km final",
              value: displacement.kmFinal
                ? String(displacement.kmFinal)
                : "Em andamento...",
            },
            {
              name: "Ínicio do deslocamento",
              value: new Date(
                displacement.inicioDeslocamento
              ).toLocaleDateString(),
            },
            {
              name: "Fim do deslocamento",
              value: displacement.fimDeslocamento
                ? new Date(displacement.fimDeslocamento).toLocaleDateString()
                : "Em andamento...",
            },
            { name: "Checklist", value: displacement.checkList },
            { name: "Motivo", value: displacement.motivo },
            { name: "Observação", value: displacement.observacao },
          ],
        },
      };
    } catch (e) {
      return {
        redirect: {
          destination: "/deslocamento",
          permanent: false,
        },
      };
    }
  }
}
