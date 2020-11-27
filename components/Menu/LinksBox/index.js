import React from "react";
import { Text, View } from "react-native";
import { Link } from "react-router-native";
import styled from "styled-components";

const StyledLinksBox = styled.View`
  position: absolute;
  top: 0;
  left: -24%;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const LinksBox = () => {
  return (
    <StyledLinksBox>
      <Link to="/">
        <Text>Strona główna</Text>
      </Link>
      <Link to="/dzikopedia">
        <Text>Dzikopedia</Text>
      </Link>
    </StyledLinksBox>
  );
};

export default LinksBox;
