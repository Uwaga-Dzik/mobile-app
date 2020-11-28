import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
// import posed from "react-native-pose";

const StyledHamburger = styled.TouchableHighlight`
  position: relative;
  height: 25px;
  width: 40px;
  padding: 0 0;
`;

const PosedHamburgerTop = posed.View({
  open: {
    rotate: "45deg",
    y: "10%",
    x: "0",
    scale: 1,
    transition: {
      default: { ease: "linear", duration: 200 },
    },
  },
  close: {
    rotate: "0",
    y: "0",
    x: "0",
    scale: 1,
    transition: {
      default: { ease: "linear", duration: 200 },
    },
  },
});

const StyledHamburgerTop = styled(PosedHamburgerTop)`
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 18px;
`;

const PosedHamburgerBottom = posed.View({
  open: {
    rotate: "-45deg",
    y: "-10%",
    x: "0",
    scale: 1,
    transition: {
      default: { ease: "linear", duration: 200 },
    },
  },
  close: {
    rotate: "0",
    y: "0",
    x: "0",
    scale: 1,
    transition: {
      default: { ease: "linear", duration: 200 },
    },
  },
});

const StyledHamburgerBottom = styled(PosedHamburgerBottom)`
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
        <StyledHamburgerTop pose={isOpen ? "open" : "close"} />
        <StyledHamburgerBottom pose={isOpen ? "open" : "close"} />
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
