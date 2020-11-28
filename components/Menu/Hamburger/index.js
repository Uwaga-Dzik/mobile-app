import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
// import posed from "react-native-pose";

// const PosedHamburgerTop = posed.View({

// })

const StyledHamburger = styled.TouchableHighlight`
  position: relative;
  height: 25px;
  width: 40px;
  padding: 0 0;
`;

const StyledHamburgerTop = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 18px;
`;

const StyledHamburgerBottom = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 18px;
`;

const Hamburger = ({ isOpen, setIsOpen }) => {
  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledHamburger onPress={handlePress}>
      <>
        <StyledHamburgerTop></StyledHamburgerTop>
        <StyledHamburgerBottom></StyledHamburgerBottom>
      </>
    </StyledHamburger>
  );
};

Hamburger.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

Hamburger.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
};

export default Hamburger;
