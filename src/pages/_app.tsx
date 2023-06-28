import Layout from "@/components/Layout";
import { LoadingContext } from "@/loadingContext";
import "@/styles/globals.css";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";
import "@fontsource/roboto";
import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const loadingContextValue = {
    loading,
    setLoading: (value: boolean) => setLoading(value),
  };

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    };
    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </LoadingContext.Provider>
  );
}
