import React from "react";
import { Text, View } from "react-native";
import { Link } from "react-router-native";
import styled from "styled-components";
import Hamburger from "./Hamburger";

const StyledMenu = styled.View`
  width: 100%;
  flex-direction: column;
`;

const Menu = () => {
  return (
    <StyledMenu>
      <Hamburger />

      <Link to="/">
        <Text>Strona główna</Text>
      </Link>
      <Link to="/dzikopedia">
        <Text>Dzikopedia</Text>
      </Link>
    </StyledMenu>
  );
};

export default Menu;
