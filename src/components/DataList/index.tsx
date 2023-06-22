import { useTheme } from "@mui/material";
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
  items: Data[];
  icon: React.ReactNode;
  link: string;
}

interface DataItemProps {
  data: Data;
  link: string;
  icon: React.ReactNode;
}

type Data = {
  id: number;
  info1: { name: string; value: string };
  info2: { name: string; value: string };
};

export default function DataList({ items, icon, link }: DataListProps) {
  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
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
  return (
    <ListItem alignItems="flex-start" disablePadding>
      <Link href={`/${link}/${data.id}`} style={{ width: "100%" }}>
        <Card
          sx={[
            {
              "&:hover, &:active": {
                color: "primary.main",
                bgcolor: "secondary.main",
                transition: "all .5s",
              },
            },
          ]}
        >
          <CardContent sx={{ display: "flex", gap: 4 }}>
            <Box
              component="span"
              sx={[
                {
                  "& svg": {
                    fontSize: { xs: theme.spacing(6), md: theme.spacing(8) },
                  },
                },
              ]}
            >
              {icon}
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography
                paragraph
                m={0}
                fontSize={{ xs: theme.spacing(2), md: theme.spacing(3) }}
              >
                <Typography
                  component="span"
                  fontSize={{ xs: theme.spacing(2), md: theme.spacing(3) }}
                  fontWeight="bold"
                >
                  {data.info1.name}:
                </Typography>{" "}
                {data.info1.value}
              </Typography>
              <Typography
                paragraph
                m={0}
                fontSize={{ xs: theme.spacing(2), md: theme.spacing(3) }}
              >
                <Typography
                  component="span"
                  fontSize={{ xs: theme.spacing(2), md: theme.spacing(3) }}
                  fontWeight="bold"
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
