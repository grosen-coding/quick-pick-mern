import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeModes = {
  dark: "dark",
  light: "light",
};

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette =
      mode === themeModes.dark
        ? {
            primary: {
              main: "#68b0ab",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#4a7c59",
              contrastText: "#ffffff",
            },
            tertiary: {
              main: "#8fc0a9",
              contrastText: "#ffffff",
            },
            fourth: {
              main: "#c8d5b9",
              contrastText: "#ffffff",
            },
            fifth: {
              main: "#faf3dd",
              contrastText: "#ffffff",
            },
            background: {
              default: "#000000",
              paper: "#131313",
            },
          }
        : {
            primary: {
              main: "#4a7c59",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#68b0ab",
              contrastText: "#ffffff",
            },
            tertiary: {
              main: "#8fc0a9",
              contrastText: "#ffffff",
            },
            fourth: {
              main: "#c8d5b9",
              contrastText: "#ffffff",
            },
            fifth: {
              main: "#faf3dd",
              contrastText: "#ffffff",
            },
            background: {
              default: colors.grey["100"],
            },
          };

    return createTheme({
      palette: {
        mode,
        ...customPalette,
      },
      components: {
        MuiButton: {
          defaultProps: {
            disableElevation: true,
          },
        },
      },
    });
  },
};

export default themeConfigs;
