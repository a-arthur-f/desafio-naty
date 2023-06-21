import CategoryCard from "@/components/CategoryCard";
import Icon from "@/components/Icon";
import { Box, Grid } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Desafio Naty</title>
        <meta
          name="description"
          content="Implementação do desafio para vaga de desenvolvedor front-end"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box component="main">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Link href="/cliente">
              <CategoryCard
                categoryName="Clientes"
                icon={<Icon name="client" />}
              />
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link href="/condutor">
              <CategoryCard
                categoryName="Condutores"
                icon={<Icon name="driver" />}
              />
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link href="/veiculo">
              <CategoryCard
                categoryName="Veículos"
                icon={<Icon name="vehicle" />}
              />
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link href="/deslocamento">
              <CategoryCard
                categoryName="Deslocamentos"
                icon={<Icon name="displacement" />}
              />
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
