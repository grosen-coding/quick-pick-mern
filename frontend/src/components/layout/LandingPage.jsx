import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import styled from "styled-components";
import Container from "../common/Container";

const LandingPage = () => {
  return (
    <>
      <Container>
        <h1>Welcome to Quick Flick Picker</h1>
        <p>The app for the indecisive.</p>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<LandingPage />}> */}

            <Route path="/main" element={<MainLayout />}>
              <EnterButton>Get Started!</EnterButton>
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
};

export default LandingPage;

const EnterButton = styled.button``;
