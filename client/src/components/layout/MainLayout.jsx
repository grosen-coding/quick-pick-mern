import React from "react";
// import styled from "styled-components";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import Topbar from "../common/Topbar";

import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      {/* globalloading */}
      <GlobalLoading />
      {/* globalloading */}

      <Box display="flex" minHeight="100vh" minWidth="100vw">
        {/* header */}
        <Topbar />
        {/* header */}

        {/* main */}
        <Box
          component="main"
          flexGrow={1}
          overflow="hidden"
          minHeight="100vh"
          minWidth="100%"
        >
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
