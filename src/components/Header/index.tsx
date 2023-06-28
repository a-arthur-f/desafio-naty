import { AppBar, Grid, SxProps, Box, LinearProgress } from "@mui/material";
import Image from "next/image";
import logoImage from "../../../public/logo.png";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { useContext } from "react";
import { LoadingContext } from "@/loadingContext";
import BackButton from "../BackButton";

export default function Header() {
  const { loading } = useContext(LoadingContext);
  const theme = useTheme();
  const gridContainerStyle: SxProps = {
    justifyContent: "center",
    alignItems: "center",
    py: { xs: 2, md: 3 },
    px: { xs: 4, md: 6 },
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "primary.light" }}
      variant="outlined"
      elevation={0}
    >
      <Grid container sx={gridContainerStyle} spacing={6} direction="row">
        <Box
          sx={{
            position: "absolute",
            left: theme.spacing(2),
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <BackButton />
        </Box>
        <Grid item>
          <Box width={{ xs: theme.spacing(7), md: theme.spacing(10) }}>
            <Link href="/">
              <Image
                alt="logo da secretária naty"
                width={196}
                height={196}
                src={logoImage}
                style={{ width: "100%", height: "auto" }}
              />
            </Link>
          </Box>
        </Grid>
      </Grid>

      {loading && <LinearProgress color="secondary" />}
    </AppBar>
  );
}
