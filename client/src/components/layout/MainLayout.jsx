import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";

const MainLayout = () => {
  return (
    <>
      {/* Global Loading */}
      <GlobalLoading />

      {/* Login Modal */}

      <Container>
        {/* header */}

        {/* header ENDS */}

        {/* main */}
        <MainPageLayout>
          <Outlet />
        </MainPageLayout>
        {/* main ENDS */}
      </Container>

      {/* footer */}

      {/* footer ENDS */}
    </>
  );
};

export default MainLayout;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;
const MainPageLayout = styled.main`
  flex-grow: 1;
  overflow: hidden;
  min-height: 100vh;
`;
