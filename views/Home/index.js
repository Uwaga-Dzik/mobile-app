import React from "react";
import { View, Dimensions } from "react-native";
import MainButton from "../../components/MainButton";
import MapView from "react-native-maps";
import styled from "styled-components";

const StyledButtonContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  position: absolute;
  bottom: 55px;
  z-index: 2;
`;

const Home = () => {
  return (
    <View>
      <MapView
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: -1,
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <StyledButtonContainer>
        <MainButton isGreen={true} text={"Widzę dzika"} />
        <MainButton isGreen={false} text={"Widzę ślady"} />
      </StyledButtonContainer>
    </View>
  );
};

export default Home;
