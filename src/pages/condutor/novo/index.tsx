import CategoryHeader from "@/components/CategoryHeader";
import Icon from "@/components/Icon";
import { Box, Button, Grid, TextField } from "@mui/material";
import Head from "next/head";
import { useState, useContext } from "react";
import { DriverData } from "../../../types";
import { LoadingContext } from "@/loadingContext";
import { useRouter } from "next/router";
import config from "@/config";
import { DateField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

type DriverDataPost = { categoriaHabilitacao: string } & Omit<
  DriverData,
  "id" | "catergoriaHabilitacao"
>;

export default function DriverNew() {
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);
  const [expirationDateError, setExpirationDateError] = useState(true);
  const [driverData, setDriverData] = useState<DriverDataPost>({
    numeroHabilitacao: "",
    categoriaHabilitacao: "",
    nome: "",
    vencimentoHabilitacao: "",
  });

  const handleInputChange = (value: string, input: string) => {
    setDriverData({ ...driverData, [input]: value });
  };

  const handleExpirationDateChange = (value: Dayjs) => {
    if (value && value.isValid()) {
      setExpirationDateError(false);
      setDriverData({
        ...driverData,
        vencimentoHabilitacao: value?.toISOString() as string,
      });
    } else {
      setExpirationDateError(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (expirationDateError) return;
      setLoading(true);
      await fetch(`${config.api}/Condutor`, {
        method: "POST",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(driverData),
      });
      router.push("/condutor");
    } catch (e) {
      console.log(e);
      router.push("/condutor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Novo condutor</title>
      </Head>
      <Box component="main">
        <CategoryHeader title="Novo condutor" icon={<Icon name="driver" />} />
        <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Nº da habilitação"
              fullWidth
              color="secondary"
              required
              value={driverData.numeroHabilitacao}
              onChange={(e) =>
                handleInputChange(e.target.value, "numeroHabilitacao")
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Categoria da Habilitação"
              fullWidth
              color="secondary"
              required
              value={driverData.categoriaHabilitacao}
              onChange={(e) =>
                handleInputChange(e.target.value, "categoriaHabilitacao")
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Nome"
              fullWidth
              color="secondary"
              required
              value={driverData.nome}
              onChange={(e) => handleInputChange(e.target.value, "nome")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DateField
              label="Vencimento da habilitação"
              color="secondary"
              format="DD/MM/YYYY"
              required
              fullWidth
              onChange={(value) => {
                handleExpirationDateChange(value as Dayjs);
              }}
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
