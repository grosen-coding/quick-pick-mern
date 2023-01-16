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
            sx={{
              userSelect: "none",
              marginRight: { xs: "0", md: "40px" },
              fontSize: { xs: "1.1rem", md: "1.5rem" },
            }}
          >
            Welcome,{" "}
            <span
              style={{
                color: "#c8d5b9",
                textTransform: "uppercase",
                fontWeight: "700",
                marginLeft: "5px",
                paddingBottom: "2px",
              }}
            >
              {user.displayName}
            </span>{" "}
            !
          </Typography>

          {/* SignOut */}
          <Button
            sx={{ backgroundColor: "#4a7c59" }}
            variant="contained"
            onClick={() => dispatch(setUser(null))}
          >
            <Typography
              textTransform="uppercase"
              fontWeight="700"
              sx={{
                fontSize: { xs: ".7rem", md: "1rem" },
              }}
            >
              sign out
            </Typography>
          </Button>
        </>
      )}
    </>
  );
};

export default UserMenu;
