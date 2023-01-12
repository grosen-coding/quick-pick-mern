import { Typography, useTheme } from "@mui/material";

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography fontWeight="700" fontSize="1.7rem">
      Quick{" "}
      <span
        style={{
          color: theme.palette.primary.main,
          opacity: 1,
          letterSpacing: "1.5px",
          fontWeight: "700",
        }}
      >
        FLICK{" "}
      </span>
      Picker
    </Typography>
  );
};

export default Logo;
