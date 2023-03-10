import React from "react";
import SimpleModal from "../common/InitialLoadModal";

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

  useEffect(() => {
    const getFavourites = async () => {
      const { response, error } = await favouriteAPI.getList();

      if (response) dispatch(setListFavourites(response));
      if (error) toast.error(error.message);
    };

    if (user) getFavourites();
    if (!user) dispatch(setListFavourites([]));
  }, [user, dispatch]);

  return (
    <>
      <GlobalLoading />

      <SimpleModal />

      {/* Login Modal */}

      {/* Login Modal */}
      <AuthModal />

      <Box className="menu" display="flex" minHeight="100%">
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
