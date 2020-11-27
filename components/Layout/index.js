import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../utils/theme";

const StyledWrapper = styled.View`
  ${theme.mixins.center}
  min-height: 100vh;
`;

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <StyledWrapper>{children}</StyledWrapper>
      </>
    </ThemeProvider>
  );
};

export default Layout;
