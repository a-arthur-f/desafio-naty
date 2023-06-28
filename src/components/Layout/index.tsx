import { Alert, Container, Slide, SlideProps, Snackbar } from "@mui/material";
import Header from "../Header";
import { useContext } from "react";
import { ErrorContext } from "@/errorContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { error, setError } = useContext(ErrorContext);
  return (
    <>
      <Snackbar
        open={error.length > 0}
        autoHideDuration={3000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={TransitionLeft}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Header />
      <Container sx={{ py: { xs: 5, md: 10 } }}>{children}</Container>
    </>
  );
}

function TransitionLeft(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}
