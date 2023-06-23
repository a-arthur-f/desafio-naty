import { SxProps, useTheme } from "@mui/material";
import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Link from "next/link";

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
  const typographyStyle: SxProps = {
    fontSize: { xs: theme.spacing(2), md: theme.spacing(3) },
    m: 0,
  };

  return (
    <ListItem alignItems="flex-start" disablePadding>
      <Link href={`/${link}/${data.id}`} style={{ width: "100%" }}>
        <Card sx={cardStyle}>
          <CardContent sx={{ display: "flex", gap: 4 }}>
            <Box component="span" sx={cardIconstyle}>
              {icon}
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography paragraph sx={typographyStyle}>
                <Typography
                  component="span"
                  sx={{ ...typographyStyle, fontWeight: "bold" }}
                >
                  {data.info1.name}:
                </Typography>{" "}
                {data.info1.value}
              </Typography>
              <Typography paragraph m={0} sx={typographyStyle}>
                <Typography
                  component="span"
                  sx={{ ...typographyStyle, fontWeight: "bold" }}
                >
                  {data.info2.name}:
                </Typography>{" "}
                {data.info2.value}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </ListItem>
  );
}
