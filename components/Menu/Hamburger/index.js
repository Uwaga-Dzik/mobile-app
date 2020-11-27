import React from "react";
import styled from "styled-components";
import { Text } from "react-native";

const StyledHamburger = styled.TouchableHighlight`
  position: relative;
  width: 30px;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.black};

  ::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 0;
    width: 30px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.orange};
  }
`;

const Hamburger = () => {
  return (
    <StyledHamburger>
      <Text>Menu</Text>
    </StyledHamburger>
  );
};

export default Hamburger;
