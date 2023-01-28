import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { Button, Box, Typography } from "@mui/material";
import Logo from "./Logo";

export default function SimpleModal() {
  //   const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(true);
      setScale(1);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setScale(0);
  };

  return (
    <div>
      <Modal
        sx={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.9)",
          //   zIndex: "999999",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box
          sx={{
            width: { xs: "90%", md: "60%" },
            height: "auto",
            maxHeight: "90%",
            margin: "0 auto",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${scale})`,
            textAlign: "center",
            backgroundColor: "#333",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            // transition: "0.9s !important",
            padding: "3rem",
            animation: "fadeIn 0.9s ease",
            // transformOrigin: "center",

            "@keyframes fadeIn": {
              "0%": { opacity: 0, transform: "translate(-50%, -50%) scale(0)" },
              "100%": {
                opacity: 1,
                transform: "translate(-50%, -50%) scale(1)",
              },
            },
          }}
        >
          <Typography
            variant="h2"
            fontSize={{ xs: "1.3rem", md: "2rem", lg: "2rem", xl: "3.5rem" }}
            sx={{ fontWeight: "400" }}
          >
            Welcome to Your &nbsp;
            <Logo size={{ xs: "1.5rem", md: "2rem", lg: "3.5rem" }} />
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textTransform: "uppercase",
              paddingBottom: "2rem",
              color: "#c8d5b9",
              marginTop: "10px",

              "& + p": {
                xs: {
                  fontSize: ".8rem",
                  marginTop: "-20px",
                },
                sm: {
                  fontSize: "1.1rem",
                },
                md: {
                  fontSize: "1.3rem",
                  marginTop: "0",
                },
                lg: {
                  fontSize: "1.6rem",
                },
              },
            }}
          >
            The Movie APP for the Indecisive
          </Typography>
          <p>
            Can't decide what to watch? We've got you. Simply play around on the
            site selecting your favourite movies and tv shows, then save each
            one to your{" "}
            <strong style={{ fontWeight: "800", color: "#c8d5b9" }}>
              Favourites
            </strong>{" "}
            list by clicking on the heart. Once you've created your own personal{" "}
            <strong style={{ fontWeight: "800", color: "#c8d5b9" }}>
              "Cinema Playlist"
            </strong>
            , then let <Logo size={{ xs: "1rem", md: "1.6rem" }} /> help you
            decide what to watch!
          </p>
          <Button
            size={"large"}
            onClick={handleClose}
            sx={{
              backgroundColor: "#c8d5b9",
              color: "#333",
              fontWeight: "600",
              width: { xs: "100%", sm: "50%" },
              marginTop: "2rem",
              transition: "0.4s",
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.6rem" },

              "&:hover": {
                backgroundColor: "#8fc0a9",
                transition: "0.4s",
              },
            }}
          >
            Get Started!
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
