import React from "react";
import styled from "styled-components";
import Menu from "../Menu";
import Search from "../Search";

const StyledHeader = styled.View`
  display: flex;
  flex-direction: row;
  margin: 0 15px;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 10px 0;
`;

const StyledLogo = styled.Image`
  width: 60px;
  height: 100px;
`;

const Header = ({ isOpen, setIsOpen }) => {
  return (
    <StyledHeader>
      <StyledLogo source={require("../../assets/logo/logo-text.png")} />
      <Search />
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
    </StyledHeader>
  );
};

export default Header;
