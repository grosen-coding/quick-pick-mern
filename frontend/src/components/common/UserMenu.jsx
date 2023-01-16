import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { setUser } from "../../redux/features/userSlice";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  return (
    <>
      {user && (
        <>
          <Typography
            variant="h6"
            sx={{ userSelect: "none", color: "#c8d5b9" }}
            // onClick={toggleMenu}
          >
            {user.displayName}
          </Typography>
          <ArrowDropDownCircleIcon
            className="user-circle"
            style={{}}
            onClick={toggleMenu}
          />
          <Menu
            sx={{ marginTop: "10px" }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={index}
                onClick={() => setAnchorEl(null)}
              >
                <ListItemIcon
                  style={{
                    color: "#68b0ab",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
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
            <ListItemButton
              sx={{ borderRadius: "10px" }}
              onClick={() => dispatch(setUser(null))}
            >
              <ListItemIcon>
                <LogoutOutlinedIcon
                  style={{
                    color: "#68b0ab",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform="uppercase">sign out</Typography>
                }
              />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};

export default UserMenu;
