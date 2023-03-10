import { useSelector } from "react-redux";
import { Paper, Box, LinearProgress, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [globalLoading]);

  return (
    <>
      <Paper
        sx={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: "none",
          transition: "all .3s ease",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 999,
        }}
      >
        <Toolbar />
        <LinearProgress />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            textAlign: "center",
            width: { xs: "100%", md: "50%", lg: "20%" },
            transform: {
              xs: "translate(-50%, -50%) scale(0.9)",
              md: "translate(-50%, -50%) scale(2.5)",
            },
          }}
        >
          <Logo size={"2rem"} />
        </Box>
      </Paper>
    </>
  );
};

export default GlobalLoading;
