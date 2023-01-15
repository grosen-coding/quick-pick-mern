import { useTheme } from "@mui/material";

const Logo = () => {
  const theme = useTheme();

  return (
    <h2 fontWeight="700" style={{ fontSize: "1.8rem", color: "#c8d5b9" }}>
      Quick{" "}
      <span
        style={{
          color: theme.palette.primary.main,
          opacity: 1,
          letterSpacing: "1.5px",
          fontSize: "2rem",
          // marginLeft: "50px",
          // fontWeight: "700",
        }}
      >
        FLICK{" "}
      </span>
      Picker
    </h2>
  );
};

export default Logo;
