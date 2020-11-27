import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../../utils/theme";
import { Platform, StatusBar } from "react-native";

const StyledWrapper = styled.SafeAreaView`
  min-height: 100%;
  width: 100%;
  flex-direction: column;
  paddingTop: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}
`;

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <StyledWrapper>
            {children}
        </StyledWrapper>
      </>
    </ThemeProvider>
  );
};

export default Layout;
