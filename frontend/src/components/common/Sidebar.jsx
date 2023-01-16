import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import Logo from "./Logo";
import uiConfigs from "../../configs/ui.configs";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { setUser } from "../../redux/features/userSlice";

const Sidebar = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);

  const sidebarWidth = uiConfigs.size.sidebarWidth;

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: "30px" }}>
        <Typography variant="h6" marginBottom="20px" color="#c8d5b9">
          Site Menu
        </Typography>
        {menuConfigs.main.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              borderRadius: "10px",
              marginY: 1,
              backgroundColor: appState.includes(item.state)
                ? "primary.main"
                : "unset",
            }}
            component={Link}
            to={item.path}
            onClick={() => toggleSidebar(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography textTransform="uppercase">{item.title}</Typography>
              }
            />
          </ListItemButton>
        ))}

        {/* If User Exists - Show User Menu */}
        {user && (
          <>
            <Typography variant="h6" marginBottom="20px" color="#c8d5b9">
              {user.displayName}'s Menu
            </Typography>
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                key={index}
                sx={{
                  borderRadius: "10px",
                  marginY: 1,
                  backgroundColor: appState.includes(item.state)
                    ? "primary.main"
                    : "unset",
                }}
                component={Link}
                to={item.path}
                onClick={() => toggleSidebar(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {item.title}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}

            {user && (
              <ListItemButton
                sx={{ borderRadius: "10px" }}
                onClick={() => dispatch(setUser(null))}
              >
                <ListItemIcon>
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">sign out</Typography>
                  }
                />
              </ListItemButton>
            )}
          </>
        )}
      </List>
    </>
  );

  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        "& .MuiDrawer-Paper": {
          boxSizing: "border-box",
          width: sidebarWidth,
          borderRight: "0px",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
