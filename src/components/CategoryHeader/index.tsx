import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";

interface CategoryHeaderProps {
  title: string;
  icon: React.ReactNode;
  action: React.ReactNode[];
}

export default function CategoryHeader({
  title,
  icon,
  action,
}: CategoryHeaderProps) {
  const theme = useTheme();
  return (
    <Box
      component="header"
      display="flex"
      justifyContent="space-between"
      alignItems={{ md: "center" }}
      flexDirection={{ xs: "column", md: "row" }}
    >
      <Box
        display="flex"
        alignItems="center"
        sx={[
          {
            "& > svg": {
              fontSize: { xs: theme.spacing(5), md: theme.spacing(8) },
              border: "1px solid #000",
              borderRadius: "4px",
            },
          },
        ]}
        gap={{ xs: 2, md: 3 }}
      >
        {icon}
        <Typography sx={{ typography: { xs: "h4", md: "h3" } }} variant="h2">
          {title}
        </Typography>
      </Box>
      <Box
        component="ul"
        sx={{ listStyle: "none" }}
        p={0}
        display="flex"
        gap={2}
      >
        {action.map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </Box>
    </Box>
  );
}
