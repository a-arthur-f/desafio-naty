import { Paper, useTheme } from "@mui/material";
import Info from "../Info";

interface DetailsProps {
  data: Detail[];
}

type Detail = { name: string; value: string };

export default function Details({ data }: DetailsProps) {
  const theme = useTheme();
  return (
    <Paper
      variant="outlined"
      elevation={0}
      sx={{
        px: theme.spacing(3),
        py: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {data.map((info, index) => (
        <Info key={index} name={info.name} value={info.value} />
      ))}
    </Paper>
  );
}
