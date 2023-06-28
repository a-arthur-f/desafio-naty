import { SxProps, Typography, useTheme } from "@mui/material";
import { Box, Card, CardContent, List, ListItem } from "@mui/material";
import Link from "next/link";
import Info from "../Info";

interface DataListProps {
  items: DataItem[];
  icon: React.ReactNode;
  link: string;
}

interface DataItemProps {
  data: DataItem;
  link: string;
  icon: React.ReactNode;
}

export type DataItem = {
  id: number;
  info1: { name: string; value: string };
  info2: { name: string; value: string };
};

export default function DataList({ items, icon, link }: DataListProps) {
  const listStyle: SxProps = {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  };
  return (
    <>
      {(items.length > 0 && (
        <List sx={listStyle}>
          {items.map((item) => (
            <DataItem
              data={{ id: item.id, info1: item.info1, info2: item.info2 }}
              link={link}
              icon={icon}
              key={item.id}
            />
          ))}
        </List>
      )) || (
        <Typography
          paragraph
          sx={{ typography: "h4", mt: 4, textAlign: "center" }}
        >
          Ops! Ainda não tem nada aqui.
        </Typography>
      )}
    </>
  );
}

function DataItem({ data, link, icon }: DataItemProps) {
  const theme = useTheme();
  const cardStyle: SxProps = [
    {
      "&:hover, &:active": {
        color: "primary.main",
        bgcolor: "secondary.main",
        transition: "all .5s",
      },
    },
  ];
  const cardIconstyle: SxProps = [
    {
      "& svg": {
        fontSize: { xs: theme.spacing(6), md: theme.spacing(8) },
      },
    },
  ];

  return (
    <ListItem alignItems="flex-start" disablePadding>
      <Link href={`/${link}/${data.id}`} style={{ width: "100%" }}>
        <Card sx={cardStyle} variant="outlined">
          <CardContent sx={{ display: "flex", gap: 4 }}>
            <Box component="span" sx={cardIconstyle}>
              {icon}
            </Box>
            <Box display="flex" flexDirection="column">
              <Info name={data.info1.name} value={data.info1.value} />
              <Info name={data.info2.name} value={data.info2.value} />
            </Box>
          </CardContent>
        </Card>
      </Link>
    </ListItem>
  );
}
