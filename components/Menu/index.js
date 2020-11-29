import React from "react";
import styled from "styled-components";
import Hamburger from "./Hamburger";

const StyledMenu = styled.View`
  flex-direction: column;
`;

const Menu = ({ isOpen, setIsOpen }) => {
  return (
    <StyledMenu>
      <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} inHeader={true} />
    </StyledMenu>
  );
};

export default Menu;
