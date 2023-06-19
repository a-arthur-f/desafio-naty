import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

interface CategoryCardProps {
  categoryName: string;
  icon: React.ReactNode;
}

export default function CategoryCard({
  categoryName,
  icon,
}: CategoryCardProps) {
  const theme = useTheme();
  const cardStyle = [
    {
      "&:hover, &:active": {
        color: "primary.main",
        backgroundColor: "secondary.main",
        transition: "all .5s",
      },
    },
  ];
  const iconStyle = [
    {
      "& svg": {
        fontSize: { xs: theme.spacing(10), md: theme.spacing(20) },
      },
    },
  ];

  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            justifyContent="center"
            display="flex"
            sx={iconStyle}
          >
            {icon}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" component={"p"} textAlign="center">
              {categoryName}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
