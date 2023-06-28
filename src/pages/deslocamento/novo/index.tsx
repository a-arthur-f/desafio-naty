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
import {
  ClientData,
  DisplacementData,
  DriverData,
  VehicleData,
} from "../../../types";
import { LoadingContext } from "@/loadingContext";
import { useRouter } from "next/router";
import config from "@/config";
import { DateField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { InferGetServerSidePropsType } from "next";

type DisplacementDataPost = {
  idCliente: number | "";
  idCondutor: number | "";
  idVeiculo: number | "";
} & Omit<DisplacementData, "id" | "idCliente" | "idCondutor" | "idVeiculo">;

export default function DisplacementNew({
  client,
  driver,
  vehicle,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);
  const [expirationDateError, setExpirationDateError] = useState(true);
  const [displacementData, setDisplacementData] =
    useState<DisplacementDataPost>({
      kmInicial: 0,
      inicioDeslocamento: "",
      checkList: "",
      motivo: "",
      observacao: "",
      idCliente: "",
      idCondutor: "",
      idVeiculo: "",
    });

  const handleInputChange = (value: string, input: string) => {
    setDisplacementData({ ...displacementData, [input]: value });
  };

  const handleExpirationDateChange = (value: Dayjs) => {
    if (value && value.isValid()) {
      setExpirationDateError(false);
      setDisplacementData({
        ...displacementData,
        inicioDeslocamento: value?.toISOString() as string,
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
      await fetch(`${config.api}/Deslocamento/IniciarDeslocamento`, {
        method: "POST",
        headers: [["Content-Type", "application/json"]],
        body: JSON.stringify(displacementData),
      });
      router.push("/deslocamento");
    } catch (e) {
      console.log(e);
      router.push("/deslocamento");
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
            <FormControl variant="outlined" color="secondary" fullWidth>
              <InputLabel id="client-label">Cliente (id)</InputLabel>
              <Select
                label="Cliente (id)"
                labelId="client-label"
                value={String(displacementData.idCliente)}
                onChange={(e) => handleInputChange(e.target.value, "idCliente")}
                required
              >
                <MenuItem value=""></MenuItem>
                {client.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.nome} ({c.id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl
              variant="outlined"
              color="secondary"
              fullWidth
              required
            >
              <InputLabel id="driver-label">Condutor (id)</InputLabel>
              <Select
                label="Condutor (id)"
                labelId="driver-label"
                value={String(displacementData.idCondutor)}
                onChange={(e) =>
                  handleInputChange(e.target.value, "idCondutor")
                }
              >
                <MenuItem value=""></MenuItem>
                {driver.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.nome} ({d.id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl
              variant="outlined"
              color="secondary"
              fullWidth
              required
            >
              <InputLabel id="vehicle-label">Veículo (id)</InputLabel>
              <Select
                label="Veículo (id)"
                labelId="vehicle-label"
                value={String(displacementData.idVeiculo)}
                onChange={(e) => handleInputChange(e.target.value, "idVeiculo")}
              >
                <MenuItem value=""></MenuItem>
                {vehicle.map((v) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.marcaModelo} ({v.id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Km inicial"
              fullWidth
              color="secondary"
              required
              value={displacementData.kmInicial}
              onChange={(e) => handleInputChange(e.target.value, "kmInicial")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DateField
              variant="outlined"
              label="Ínicio do deslocamento"
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
              label="Checklist"
              fullWidth
              color="secondary"
              value={displacementData.checkList}
              onChange={(e) => handleInputChange(e.target.value, "checkList")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Motivo"
              fullWidth
              color="secondary"
              required
              value={displacementData.motivo}
              onChange={(e) => handleInputChange(e.target.value, "motivo")}
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

export async function getServerSideProps() {
  const resClient = await fetch(`${config.api}/Cliente`);
  const client: ClientData[] = await resClient.json();
  const resDriver = await fetch(`${config.api}/Condutor`);
  const driver: DriverData[] = await resDriver.json();
  const resVehicle = await fetch(`${config.api}/Veiculo`);
  const vehicle: VehicleData[] = await resVehicle.json();
  return {
    props: {
      client,
      driver,
      vehicle,
    },
  };
}
