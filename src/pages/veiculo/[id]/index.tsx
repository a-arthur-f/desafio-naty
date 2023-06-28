import Details from "@/components/Details";
import config from "@/config";
import { Box, Button } from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { VehicleData } from "../../../../types";
import CategoryHeader from "@/components/CategoryHeader";
import Icon from "@/components/Icon";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import RemoveDialog from "@/components/RemoveDialog";
import { LoadingContext } from "@/loadingContext";

export default function VehicleDetails({
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
      await fetch(`${config.api}/Veiculo/${router.query.id}`, {
        method: "DELETE",
        body: JSON.stringify({ id: Number(router.query.id) }),
        headers: [["Content-Type", "application/json"]],
      });
      router.push("/veiculo");
    } catch (e) {
      console.log(e);
      router.push("/veiculo");
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
        title="Detalhes do veículo"
        action={[
          <Link key={"editar"} href={`/veiculo/${router.query.id}/editar`}>
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
        icon={<Icon name="vehicle" />}
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
      const res = await fetch(`${config.api}/Veiculo/${params.id}`);
      const vehicle: VehicleData = await res.json();
      return {
        props: {
          data: [
            { name: "ID", value: String(vehicle.id) },
            { name: "Placa", value: vehicle.placa },
            {
              name: "Marca / Modelo",
              value: vehicle.marcaModelo,
            },
            { name: "Ano de fabricação", value: String(vehicle.anoFabricacao) },
            {
              name: "Km atual",
              value: String(vehicle.kmAtual),
            },
          ],
        },
      };
    } catch (e) {
      return {
        redirect: {
          destination: "/veiculo",
          permanent: false,
        },
      };
    }
  }
}
