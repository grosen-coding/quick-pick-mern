import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

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
              maxHeight: "70px",
              height: "100%",
              padding: " 20px 0",
              // backgroundColor: "lightblue",
              maxWidth: "1500px",
              margin: "0 auto",
              width: "100%",
              // border: "1px solid red",
            }}
          >
            {/* <Stack direction="row" spacing={1} alignItems="center"> */}
            <IconButton
              color="inherit"
              sx={{
                mr: 2,
                display: { md: "none" },
                ml: 2,
                position: "relative",
                zIndex: "10000000",
              }}
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: { xs: "none", md: "none" } }}>
              <Logo />
            </Box>
            {/* </Stack> */}

            {/* Main Menu */}
            <Box
              flexGrow={1}
              alignItems="center"
              display={{ xs: "none", md: "flex" }}
            >
              <Box mr={2}>
                <Logo />
              </Box>
              <ButtonContainer>
                {menuConfigs.main.map((item, index) => (
                  <Button
                    key={index}
                    sx={{
                      fontWeight: "500",
                      fontSize: "1.1rem",
                      width: "auto",
                      letterSpacing: "1px",
                      color: appState.includes(item.state)
                        ? "primary.contrastText"
                        : "inherit",
                      mr: 2,
                      // border: "1px solid green",
                      padding: "5px 10px",
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
            </Box>
            {/* End Main Menu */}

            {/* User Favourites Menu */}

            {/* {user && (
              <Button
                sx={{
                  // fontWeight: "700",
                  // letterSpacing: "1px",
                  fontSize: { xs: ".5rem", md: "1.1rem" },
                  display: { xs: "none", md: "flex" },
                  width: "auto",
                  padding: "5px 10px",
                  color: "#e2e2e2",
                  mr: 4,
                  backgroundColor: "#4a7c59",
                }}
                component={Link}
                to={"/favourites"}
              >
                Favourites
              </Button>
            )} */}
            {/* End User Favourites */}

            {/* User Menu */}
            <UserWrap>
              <Stack spacing={3} direction="row" alignItems="center">
                {!user && (
                  <>
                    <Button
                      variant="contained"
                      onClick={() => dispatch(setAuthModalOpen(true))}
                    >
                      sign in
                    </Button>
                  </>
                )}
              </Stack>

              {user && (
                <>
                  <UserMenu />
                </>
              )}

              {/* END User Menu */}
            </UserWrap>
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

const UserWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .user-circle {
    font-size: 2.5rem;
    color: #68b0ab;
    margin-left: 10px;
    cursor: pointer;
    opacity: 0.7;
    transition: 0.25s;
    margin-right: 10px;
    &:hover {
      opacity: 1;
      transform: scale(1.1);
      transition: 0.25s;
    }
  }
`;
