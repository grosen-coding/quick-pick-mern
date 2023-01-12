import React from "react";
import styled from "styled-components";
import colorStyles from "../../styleVariables/colors";

const Container = ({ header, children }) => {
  return (
    <Wrap colorStyles={colorStyles}>
      <div></div>

      <h1>Container</h1>
      <div></div>
      <div></div>
    </Wrap>
  );
};

export default Container;

const Wrap = styled.div`
  margin: 5rem auto 0;
  background-color: #000;
  color: ${({ colorStyles }) => (colorStyles ? colorStyles.tertiary : "#888")};
  /* transform: ${(props) => (props.showNav ? "scale(0)" : "scale(1)")}; */
`;
