import { AppBar, Grid, SxProps, Box } from "@mui/material";
import Image from "next/image";
import logoImage from "../../../public/logo.png";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";

export default function Header() {
  const theme = useTheme();
  const gridContainerStyle: SxProps = {
    justifyContent: "center",
    alignItems: "center",
    py: { xs: 2, md: 3 },
    px: { xs: 4, md: 6 },
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.light" }}>
      <Grid container sx={gridContainerStyle} spacing={6} direction="row">
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
    </AppBar>
  );
}
