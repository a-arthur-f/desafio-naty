import CategoryHeader from "@/components/CategoryHeader";
import Icon from "@/components/Icon";
import { Box, Button, Grid, TextField } from "@mui/material";
import Head from "next/head";
import { useState, useContext } from "react";
import { VehicleData } from "../../../types";
import { LoadingContext } from "@/loadingContext";
import { useRouter } from "next/router";
import config from "@/config";
import { ErrorContext } from "@/errorContext";

type DriverDataPost = Omit<VehicleData, "id">;

export default function VehicleNew() {
  const router = useRouter();
  const { setError } = useContext(ErrorContext);
  const { setLoading } = useContext(LoadingContext);

  const [vehicleData, setDriverData] = useState<DriverDataPost>({
    placa: "",
    marcaModelo: "",
    anoFabricacao: new Date().getFullYear() as number,
    kmAtual: 0,
  });

  const handleInputChange = (value: string, input: string) => {
    setDriverData({ ...vehicleData, [input]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      await fetch(`${config.api}/Veiculo`, {
        method: "POST",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(vehicleData),
      });
      router.back();
    } catch (e) {
      setError("Houve uma falha!");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Novo veículo</title>
      </Head>
      <Box component="main">
        <CategoryHeader title="Novo veíclo" icon={<Icon name="vehicle" />} />
        <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Placa"
              fullWidth
              color="secondary"
              required
              value={vehicleData.placa}
              onChange={(e) => handleInputChange(e.target.value, "placa")}
            />
          </Grid>

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
