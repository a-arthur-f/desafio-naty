import { Container } from "@mui/material";
import Header from "../Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container sx={{ py: { xs: 5, md: 10 } }}>{children}</Container>
    </>
  );
}
