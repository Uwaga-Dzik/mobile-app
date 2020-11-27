import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import Menu from "../Menu";

const StyledHeader = styled.View`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Text>Logo</Text>
      <Text>Search...</Text>
      <Menu />
    </StyledHeader>
  );
};

export default Header;
