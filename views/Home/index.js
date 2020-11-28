import React from "react";
import { View } from "react-native";
import MainButton from "../../components/MainButton";

import Map from "../../components/Map";
import styled from "styled-components";

const StyledButtonContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  position: absolute;
  bottom: 30%;
  z-index: 2;
  margin-left: 0.25%;
`;

const Home = () => {
  return (
    <View>
      <Map />
      <StyledButtonContainer>
        <MainButton
          isGreen={true}
          text={"Widzę dziki"}
          hasIcon={true}
          isBoar={true}
        />
        <MainButton
          isGreen={false}
          text={"Widzę ślady"}
          hasIcon={true}
          isBoar={false}
        />
      </StyledButtonContainer>
    </View>
  );
};

export default Home;
