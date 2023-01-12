import { useTheme } from "@mui/material";

const Logo = () => {
  const theme = useTheme();

  return (
    <h2 fontWeight="700" fontSize="1.5rem">
      Quick{" "}
      <span
        style={{
          color: theme.palette.primary.main,
          opacity: 1,
          letterSpacing: "1.5px",
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
