import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import Container from "../common/Container";

const MainLayout = () => {
  return (
    <>
      {/* Global Loading */}
      <GlobalLoading />

      {/* Login Modal */}

      <MainContainer>
        {/* header */}

        {/* Navbar */}
        <Navbar />

        {/* header ENDS */}

        {/* main */}

        <Container>
          <MainPageLayout>
            <Outlet />
          </MainPageLayout>
        </Container>
        {/* main ENDS */}
      </MainContainer>

      {/* footer */}
      <Footer />
      {/* footer ENDS */}
    </>
  );
};

export default MainLayout;

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;
const MainPageLayout = styled.main`
  flex-grow: 1;
  overflow: hidden;
  min-height: 100vh;
`;
