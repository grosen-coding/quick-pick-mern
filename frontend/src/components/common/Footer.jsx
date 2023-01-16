import { Paper, Stack, Button, Box } from "@mui/material";
import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import menuConfigs from "../../configs/menu.configs";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "0 10px" }}>
        <FooterContainer>
          <Stack
            alignItems="center"
            justifyContent="space-between"
            direction={{ xs: "column", md: "row " }}
          >
            <Logo />

            <Box>
              {menuConfigs.main.map((item, index) => (
                <Button
                  key={index}
                  sx={{ color: "inherit", padding: "0 10px" }}
                  component={Link}
                  to={item.path}
                >
                  {item.title}
                </Button>
              ))}
            </Box>

            <TMDBImg src="./img/tmdb.svg" />
          </Stack>
        </FooterContainer>
      </Paper>
    </Container>
  );
};

export default Footer;

const FooterContainer = styled.div`
  max-width: 1366px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const TMDBImg = styled.img`
  width: 20%;
  height: 100%;
`;
