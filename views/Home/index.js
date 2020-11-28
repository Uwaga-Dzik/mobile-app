import React, { useState } from "react";
import { TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import MainButton from "../../components/MainButton";

import Map from "../../components/Map";
import styled from "styled-components";
import MarkerDialog from "../../components/MarkerDialog";
import FormModal from "../../components/FormModal";

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

const StyledDialogContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 28%;
  z-index: 3;
`;

const Home = () => {

  const [isBoar, setIsBoar] = useState(false);
  const [isFootPrints, setIsFootPrint] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState({});
    const [showMarkerDialog, setShowMarkerDialog] = useState(false);

    return (
        <View>
            <Map onMarkerClick={(marker) => setSelectedMarker(marker)}
                 selectedMarker={selectedMarker}
                 showMarkerDialog={showMarkerDialog}
                 setShowMarkerDialog={(show) => setShowMarkerDialog(show)}/>
                         <FormModal
        isBoar={isBoar}
        setIsBoar={setIsBoar}
        isFootPrints={isFootPrints}
        setIsFootPrint={setIsFootPrint}
      />
            <StyledButtonContainer>
        <TouchableOpacity onPress={() => setIsBoar(true)}>
          <MainButton
            isGreen={true}
            text={"Widzę dziki"}
            hasIcon={true}
            isBoar={true}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFootPrint(true)}>
          <MainButton
            isGreen={false}
            text={"Widzę ślady"}
            hasIcon={true}
            isBoar={false}
          />
        </TouchableOpacity>
            </StyledButtonContainer>

            {
                showMarkerDialog ?
                    <StyledDialogContainer>
                        <MarkerDialog marker={selectedMarker}/>
                    </StyledDialogContainer>
                    : null
            }
        </View>
    );
};

export default Home;
