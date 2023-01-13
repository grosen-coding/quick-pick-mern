import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { cloneElement, useState } from "react";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { themeModes } from "../../configs/theme.config";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === themeModes.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === themeModes.dark
        ? "transparent"
        : "background.paper",
    },
  });
};
const Topbar = () => {
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;

    dispatch(setThemeMode(theme));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <ScrollAppBar>
        <AppBar
          elevation={0}
          sx={{
            zIndex: 99999,
          }}
        >
          <Toolbar
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              maxHeight: "50px",
              // backgroundColor: "lightblue",
              maxWidth: "1500px",
              margin: "0 auto",
              width: "100%",
              border: "1px solid red",
            }}
          >
            {/* <Stack direction="row" spacing={1} alignItems="center"> */}
            <IconButton
              color="inherit"
              sx={{ mr: 2, display: { md: "none" } }}
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
              <Logo />
            </Box>
            {/* </Stack> */}

            {/* Main Menu */}
            <Box
              flexGrow={1}
              alignItems="center"
              display={{ xs: "none", md: "flex" }}
            >
              <Box
                sx={{
                  padding: "0",
                  margin: "0",
                  // height: "50px",
                  width: "30%",
                  border: "1px solid red",
                  lineHeight: "0",
                }}
              >
                <Logo />
              </Box>
              <ButtonContainer>
                {menuConfigs.main.map((item, index) => (
                  <Button
                    key={index}
                    sx={{
                      fontWeight: "500",
                      letterSpacing: "1px",
                      color: appState.includes(item.state)
                        ? "primary.contrastText"
                        : "inherit",
                      mr: 2,
                      border: "1px solid green",
                      padding: "5px 15px",
                    }}
                    component={Link}
                    to={item.path}
                    variant={
                      appState.includes(item.state) ? "contained" : "text"
                    }
                  >
                    {item.title}
                  </Button>
                ))}
              </ButtonContainer>
              <IconButton
                sx={{
                  justifySelf: "flex-end",
                  color: "inherit",
                  border: "1px solid yellow",
                }}
                onClick={onSwitchTheme}
              >
                {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
              </IconButton>
            </Box>
            {/* End Main Menu */}

            {/* User Menu */}
            <Stack spacing={2} direction="row" alignItems="center">
              {!user && (
                <Button
                  variant="contained"
                  onClick={() => dispatch(setAuthModalOpen(true))}
                >
                  sign in
                </Button>
              )}
            </Stack>
            {user && <UserMenu />}
            {/* END User Menu */}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Topbar;

const ButtonContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  margin: 0 30px;
`;
