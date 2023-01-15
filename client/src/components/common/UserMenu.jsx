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
            sx={{ userSelect: "none", marginRight: "40px" }}
          >
            Welcome!{" "}
            <span
              style={{
                color: "#c8d5b9",
                textTransform: "uppercase",
                fontWeight: "700",
                marginLeft: "5px",
                paddingBottom: "2px",
                borderBottom: "1px solid #c8d5b9",
              }}
            >
              {user.displayName}
            </span>
          </Typography>

          {/* SignOut */}
          <Button
            sx={{
              borderRadius: "10px",
              border: "1px solid rgb(200, 213, 185, 0.5)",
            }}
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
