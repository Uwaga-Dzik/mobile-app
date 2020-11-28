import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { Text, View, Animated } from "react-native";
import posed from "react-native-pose";
import { Link } from "react-router-native";
import styled from "styled-components";
import Hamburger from "../Hamburger";

const PosedLinksBox = posed.View({
  open: {
    y: "0",
    opacity: 1,
  },
  close: {
    y: -1000,
    opacity: 0,
  },
});

const StyledLinksBox = styled(PosedLinksBox)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StyledLinksHeader = styled.View`
  display: flex;
  flex-direction: row;
`;

const StyledHamburgerWrapper = styled.View`
  display: flex;
  justify-content: flex-end;
`;

const StyledImage = styled.Text`
  width: 50%;
`;

const LinksBox = ({ isOpen, setIsOpen }) => {
  return (
    <StyledLinksBox isOpen={isOpen} pose={isOpen ? "open" : "close"}>
      <StyledHamburgerWrapper>
        <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
      </StyledHamburgerWrapper>
      <StyledLinksHeader>
        <StyledImage>IMG</StyledImage>
        <View>
          <Text>Witaj,</Text>
          <Text>Angelika!</Text>
        </View>
      </StyledLinksHeader>
      <View>
        <Link to="/">
          <Text>Strona główna</Text>
        </Link>
        <Link to="/dzikopedia">
          <Text>Dzikopedia</Text>
        </Link>
        <Link to="/moje-zgloszenia">
          <Text>Moje zgłoszenia</Text>
        </Link>
        <Link to="/ustawienia">
          <Text>Ustawienia</Text>
        </Link>
        <Link to="/rejestracja">
          <Text>Rejestracja</Text>
        </Link>
        <Link to="/logowanie">
          <Text>Logowanie</Text>
        </Link>
      </View>
    </StyledLinksBox>
  );
};

LinksBox.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default LinksBox;
