import CategoryHeader from "@/components/CategoryHeader";
import Icon from "@/components/Icon";
import { Box, Button, Grid, TextField } from "@mui/material";
import Head from "next/head";
import { useState, useContext } from "react";
import { VehicleData } from "../../../../../types";
import { LoadingContext } from "@/loadingContext";
import { useRouter } from "next/router";
import config from "@/config";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

type DriverDataPut = Omit<VehicleData, "placa">;

export default function VehicleEdit({
  vehicle,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);

  const [vehicleData, setDriverData] = useState<DriverDataPut>({
    id: vehicle.id,
    marcaModelo: vehicle.marcaModelo,
    anoFabricacao: vehicle.anoFabricacao,
    kmAtual: vehicle.kmAtual,
  });

  const handleInputChange = (value: string, input: string) => {
    setDriverData({ ...vehicleData, [input]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      await fetch(`${config.api}/Veiculo/${router.query.id}`, {
        method: "PUT",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(vehicleData),
      });
      router.push(`/veiculo/${router.query.id}`);
    } catch (e) {
      console.log(e);
      router.push(`/veiculo/${router.query.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Editar veículo</title>
      </Head>
      <Box component="main">
        <CategoryHeader title="Editar veíclo" icon={<Icon name="vehicle" />} />
        <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Marca / Modelo"
              fullWidth
              color="secondary"
              required
              value={vehicleData.marcaModelo}
              onChange={(e) => handleInputChange(e.target.value, "marcaModelo")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Ano de fabricação"
              fullWidth
              color="secondary"
              required
              value={vehicleData.anoFabricacao}
              onChange={(e) =>
                handleInputChange(e.target.value, "anoFabricacao")
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Km atual"
              fullWidth
              color="secondary"
              required
              value={vehicleData.kmAtual}
              onChange={(e) => handleInputChange(e.target.value, "kmAtual")}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              size="large"
              sx={{ width: { xs: "50%", md: "25%" }, mt: 1, py: 2 }}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  if (params) {
    try {
      const res = await fetch(`${config.api}/Veiculo/${params.id}`);
      const vehicle: VehicleData = await res.json();
      return { props: { vehicle } };
    } catch (e) {
      return {
        redirect: {
          destination: `/veiculo/${params.id}`,
        },
      };
    }
  }
}
