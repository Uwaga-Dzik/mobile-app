import React from "react";
import styled from "styled-components";
import Menu from "../Menu";
import Search from "../Search";

const StyledHeader = styled.View`
  display: flex;
  flex-direction: row;
  margin: 0 15px;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0 20px 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

const StyledLogo = styled.Image`
  width: 75px;
  height: 75px;
  padding: 0;
`;

const Header = ({ isOpen, setIsOpen }) => {
  return (
    <StyledHeader>
      <StyledLogo source={require("../../assets/logo/logo.png")} />
      <Search />
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
    </StyledHeader>
  );
};

export default Header;
