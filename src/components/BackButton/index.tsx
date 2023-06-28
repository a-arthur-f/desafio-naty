import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BackButton() {
  const router = useRouter();
  const [showBackButton, setShowBackButton] = useState(false);

  useEffect(() => {
    if (router.pathname !== "/") setShowBackButton(true);
    else setShowBackButton(false);
  }, [router]);
  return (
    <>
      {showBackButton && (
        <IconButton
          sx={{ display: { xs: "flex", md: "none" } }}
          color="secondary"
          onClick={() => router.back()}
        >
          <ArrowBackIosIcon fontSize="large" />
        </IconButton>
      )}
    </>
  );
}
