import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";
import "@fontsource/roboto";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
