import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../utils/theme";

const StyledWrapper = styled.SafeAreaView`
  min-height: 100%;
  width: 100%;
  flex: 1;
  flex-direction: column;
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
