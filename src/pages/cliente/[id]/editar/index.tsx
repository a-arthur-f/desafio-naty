import CategoryHeader from "@/components/CategoryHeader";
import Icon from "@/components/Icon";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Head from "next/head";
import { useState, useContext } from "react";
import { ClientData } from "../../../../types";
import { LoadingContext } from "@/loadingContext";
import { useRouter } from "next/router";
import config from "@/config";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ErrorContext } from "@/errorContext";

const ufList = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

type ClientDataPut = Omit<ClientData, "numeroDocumento" | "tipoDocumento">;

export default function ClienteEdit({
  client,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { setError } = useContext(ErrorContext);
  const { setLoading } = useContext(LoadingContext);
  const [clientData, setClientData] = useState<ClientDataPut>({
    id: client.id,
    nome: client.nome,
    cidade: client.cidade,
    bairro: client.bairro,
    logradouro: client.logradouro,
    numero: client.numero,
    uf: client.uf.toUpperCase(),
  });

  const handleInputChange = (value: string, input: string) => {
    setClientData({ ...clientData, [input]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      await fetch(`${config.api}/Cliente/${router.query.id}`, {
        method: "PUT",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(clientData),
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
        <title>Editar cliente</title>
      </Head>
      <Box component="main">
        <CategoryHeader title="Editar cliente" icon={<Icon name="client" />} />
        <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Nome"
              fullWidth
              color="secondary"
              required
              value={clientData.nome}
              onChange={(e) => handleInputChange(e.target.value, "nome")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Cidade"
              fullWidth
              color="secondary"
              required
              value={clientData.cidade}
              onChange={(e) => handleInputChange(e.target.value, "cidade")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Bairro"
              fullWidth
              color="secondary"
              required
              value={clientData.bairro}
              onChange={(e) => handleInputChange(e.target.value, "bairro")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Logradouro"
              fullWidth
              color="secondary"
              required
              value={clientData.logradouro}
              onChange={(e) => handleInputChange(e.target.value, "logradouro")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Número"
              fullWidth
              color="secondary"
              required
              value={clientData.numero}
              onChange={(e) => handleInputChange(e.target.value, "numero")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl
              variant="outlined"
              fullWidth
              color="secondary"
              required
            >
              <InputLabel id="uf-input-label">UF</InputLabel>
              <Select
                labelId="uf-input-label"
                value={clientData.uf}
                onChange={(e) => handleInputChange(e.target.value, "uf")}
                label="UF"
              >
                <MenuItem value=""></MenuItem>
                {ufList.map((uf) => (
                  <MenuItem value={uf} key={uf}>
                    {uf}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
      const res = await fetch(`${config.api}/Cliente/${params.id}`);
      const client: ClientData = await res.json();
      return { props: { client } };
    } catch (e) {
      return {
        redirect: {
          destination: `/cliente/${params.id}`,
        },
      };
    }
  }
}
