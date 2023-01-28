import { Typography, useTheme } from "@mui/material";

const Logo = ({ size }) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h2"
      fontWeight="700"
      fontSize={size}
      style={{
        color: "#c8d5b9",
        opacity: "0.7",
        display: "inline-flex",
      }}
    >
      Quick{" "}
      <span
        style={{
          color: theme.palette.primary.main,
          opacity: 0.8,
          letterSpacing: "1.5px",
          padding: "0 0.5rem",
          // fontSize: "2rem",

          // marginLeft: "50px",
          // fontWeight: "700",
        }}
      >
        FLICK{" "}
      </span>
      Picker
    </Typography>
  );
};

export default Logo;
