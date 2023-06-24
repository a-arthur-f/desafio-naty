import { SxProps, Typography, useTheme } from "@mui/material";

interface InfoProps {
  name: string;
  value: string;
}

export default function Info({ name, value }: InfoProps) {
  const theme = useTheme();
  const typographyStyle: SxProps = {
    fontSize: { xs: theme.spacing(2), md: theme.spacing(3) },
    m: 0,
  };
  return (
    <Typography paragraph sx={typographyStyle}>
      <Typography
        component="span"
        sx={{ ...typographyStyle, fontWeight: "bold" }}
      >
        {name}:
      </Typography>{" "}
      {value}
    </Typography>
  );
}
