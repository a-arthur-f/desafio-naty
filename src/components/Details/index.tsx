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
      sx={{ px: theme.spacing(3), py: theme.spacing(2) }}
    >
      {data.map((info) => (
        <Info name={info.name} value={info.value} />
      ))}
    </Paper>
  );
}
