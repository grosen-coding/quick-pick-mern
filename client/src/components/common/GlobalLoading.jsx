import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [globalLoading]);

  return (
    <>
      <Card className="loadingSpinnerContainer" isLoading={isLoading}>
        <div className="loadingSpinner"></div>
      </Card>
    </>
  );
};

export default GlobalLoading;

const Card = styled.div`
  opacity: ${({ isLoading }) => (isLoading ? 1 : 0)};
  pointer-events: none;
  position: fixed;
  transform: 0.3s;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;

  .loadingSpinner {
    width: 64px;
    height: 64px;
    border: 8px solid;
    border-color: red transparent #555 transparent;
    border-radius: 50%;
    animation: spin 1.2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
