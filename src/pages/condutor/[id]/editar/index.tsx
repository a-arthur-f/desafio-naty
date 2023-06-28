import CategoryHeader from "@/components/CategoryHeader";
import Icon from "@/components/Icon";
import { Box, Button, Grid, TextField } from "@mui/material";
import Head from "next/head";
import { useState, useContext } from "react";
import { DriverData } from "../../../../types";
import { LoadingContext } from "@/loadingContext";
import { useRouter } from "next/router";
import config from "@/config";
import { DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ErrorContext } from "@/errorContext";

type DriverDataPut = { categoriaHabilitacao: string } & Omit<
  DriverData,
  "catergoriaHabilitacao" | "nome" | "numeroHabilitacao"
>;

export default function DriverEdit({
  driver,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { setError } = useContext(ErrorContext);
  const { setLoading } = useContext(LoadingContext);
  const [expirationDateError, setExpirationDateError] = useState(true);
  const [driverData, setDriverData] = useState<DriverDataPut>({
    id: driver.id,
    categoriaHabilitacao: driver.catergoriaHabilitacao,
    vencimentoHabilitacao: driver.vencimentoHabilitacao,
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
      await fetch(`${config.api}/Condutor/${router.query.id}`, {
        method: "PUT",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(driverData),
      });
      router.back();
    } catch (e) {
      setError("Houve uma folha!");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Editar condutor</title>
      </Head>
      <Box component="main">
        <CategoryHeader title="Editar condutor" icon={<Icon name="driver" />} />
        <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
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
            <DateField
              label="Vencimento da habilitação"
              color="secondary"
              format="DD/MM/YYYY"
              required
              fullWidth
              defaultValue={dayjs(driverData.vencimentoHabilitacao)}
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

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  if (params) {
    try {
      const res = await fetch(`${config.api}/Condutor/${params.id}`);
      const driver: DriverData = await res.json();
      return { props: { driver } };
    } catch (e) {
      return {
        redirect: {
          destination: `/condutor/${params.id}`,
        },
      };
    }
  }
}
