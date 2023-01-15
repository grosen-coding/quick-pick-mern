import React from "react";
import { Button, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { setUser } from "../../redux/features/userSlice";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <>
      {user && (
        <>
          <Typography
            variant="h6"
            sx={{ userSelect: "none", marginRight: "20px" }}
          >
            Welcome! <span>{user.displayName}</span>
          </Typography>

          {/* SignOut */}
          <Button
            sx={{ borderRadius: "10px", border: "1px solid green" }}
            onClick={() => dispatch(setUser(null))}
          >
            <Typography textTransform="uppercase">sign out</Typography>
          </Button>
        </>
      )}
    </>
  );
};

export default UserMenu;
