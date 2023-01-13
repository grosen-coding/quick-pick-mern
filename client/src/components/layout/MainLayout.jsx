import React from "react";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import Topbar from "../common/Topbar";
import { Box } from "@mui/material";
import AuthModal from "../common/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import userAPI from "../../api/modules/user.api";
import favouriteAPI from "../../api/modules/favourite.api";
import { setListFavourites, setUser } from "../../redux/features/userSlice";

const MainLayout = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {
      const { response, error } = await userAPI.getInfo();

      if (response) dispatch(setUser(response));
      if (error) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  return (
    <>
      <GlobalLoading />

      {/* Login Modal */}
      <AuthModal />

      <Box
        className="menu"
        display="flex"
        minHeight="100%"
        // height="50vh"
        // padding="100px"
        border="1px solid blue"
        width="1500px"
        maxWidth="100%"
        margin=" 65px auto 0"
        padding="25px"
      >
        {/* header */}
        <Topbar />
        {/* header */}

        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* main */}
      </Box>

      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  );
};

export default MainLayout;
