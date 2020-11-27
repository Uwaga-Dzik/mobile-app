import React, { useState } from "react";

import styled from "styled-components";
import Hamburger from "./Hamburger";
import LinksBox from "./LinksBox";

const StyledMenu = styled.View`
  /* width: 100%; */
  flex-direction: column;
`;

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledMenu>
      <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
      <LinksBox isOpen={isOpen} setIsOpen={setIsOpen} />
    </StyledMenu>
  );
};

export default Menu;
