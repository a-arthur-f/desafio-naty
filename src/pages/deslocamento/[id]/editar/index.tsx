import CategoryHeader from "@/components/CategoryHeader";
import Icon from "@/components/Icon";
import { Box, Button, Grid, TextField } from "@mui/material";
import Head from "next/head";
import { useState, useContext } from "react";
import { DisplacementData } from "../../../../../types";
import { LoadingContext } from "@/loadingContext";
import { useRouter } from "next/router";
import config from "@/config";
import { DateField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

type DisplacementDataPut = Omit<
  DisplacementData,
  | "kmInicial"
  | "inicioDeslocamento"
  | "checkList"
  | "idCliente"
  | "idCondutor"
  | "idVeiculo"
  | "motivo"
>;

export default function DisplacementNew({
  displacement,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);
  const [expirationDateError, setExpirationDateError] = useState(true);
  const [displacementData, setDisplacementData] = useState<DisplacementDataPut>(
    {
      id: displacement.id,
      kmFinal: 0,
      fimDeslocamento: "",
      observacao: displacement.observacao,
    }
  );

  const handleInputChange = (value: string, input: string) => {
    setDisplacementData({ ...displacementData, [input]: value });
  };

  const handleExpirationDateChange = (value: Dayjs) => {
    if (value && value.isValid()) {
      setExpirationDateError(false);
      setDisplacementData({
        ...displacementData,
        fimDeslocamento: value?.toISOString() as string,
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
      await fetch(
        `${config.api}/Deslocamento/${router.query.id}/EncerrarDeslocamento`,
        {
          method: "PUT",
          headers: [["Content-Type", "application/json"]],
          body: JSON.stringify(displacementData),
        }
      );
      router.back();
    } catch (e) {
      console.log(e);
      router.back();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Novo deslocamento</title>
      </Head>
      <Box component="main">
        <CategoryHeader
          title="Novo deslocamento"
          icon={<Icon name="displacement" />}
        />

        <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Km final"
              fullWidth
              color="secondary"
              required
              value={displacementData.kmFinal}
              onChange={(e) => handleInputChange(e.target.value, "kmFinal")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DateField
              variant="outlined"
              label="Fim do deslocamento"
              fullWidth
              color="secondary"
              format="DD/MM/YYYY"
              onChange={(value) => {
                handleExpirationDateChange(value as Dayjs);
              }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Observação"
              fullWidth
              color="secondary"
              value={displacementData.observacao}
              onChange={(e) => handleInputChange(e.target.value, "observacao")}
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
      const res = await fetch(`${config.api}/Deslocamento/${params.id}`);
      const displacement: DisplacementData = await res.json();
      return {
        props: { displacement },
      };
    } catch (e) {
      return {
        redirect: {
          destination: `/deslocamento/${params.id}`,
        },
      };
    }
  }
}
