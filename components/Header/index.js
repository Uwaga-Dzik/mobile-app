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
  height: 50px;
  margin-left: -40px;
`;

const Header = ({ isOpen, setIsOpen }) => {
  return (
    <StyledHeader>
      <StyledLogo
        source={require("../../assets/logo/logo-text.png")}
        style={{ resizeMode: "contain" }}
      />
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
    </StyledHeader>
  );
};

export default Header;
