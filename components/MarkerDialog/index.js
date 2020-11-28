import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Text, TouchableOpacity, Image} from "react-native";

const StyledView = styled.View`
  z-index: 4;
  width: 95%;
  height: 180px;
  background-color: white;
  border-radius: 18px;
`;

const StyledTextsContainer = styled.View`
    margin: 15px 20px 15px;
`;

const StyledTexts = styled.View`
    flex-direction: row;
    margin-top: 2px;
`;

const StyledText = styled.Text`
  font-size: 20px;
`;

const StyledTextBold = styled(StyledText)`
  font-weight: bold;
  margin-left: 10px;
`;

const StyledButton = styled.TouchableOpacity`
    background-color: #43C079;
    flex: 1;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    justify-content: center;
    align-items: center;
`;

const StyledButtonText = styled.Text`
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
`;

const StyledIcon = styled.Image`
    width: 20px; 
    height: 20px;
    margin-top: 4px;
`;

const MarkerDialog = ({marker, onCloseClicked}) => {

    const groupSize = () => {
        if (marker.report.size === 0) return "mała";
        else if (marker.report.size === 1) return "średnia";
        else return "duża";
    };

    return (
        <StyledView>
            <StyledTextsContainer>
                <StyledTexts>
                    <StyledIcon source={require("../../assets/icons/icon_location.png")}
                                style={{resizeMode: 'contain'}}/>
                    <StyledTextBold>Adres:</StyledTextBold><StyledText>{` ul. ${marker.street ? marker.street : ''}, ${marker.city ? marker.city : ''}`}</StyledText>
                </StyledTexts>
                <StyledTexts>
                    <StyledIcon source={require("../../assets/icons/icon_numbers.png")}/>
                    <StyledTextBold>Rozmiar grupy:</StyledTextBold><StyledText> {groupSize()}</StyledText>
                </StyledTexts>
                <StyledTexts>
                    <StyledIcon source={require("../../assets/icons/icon_boar.png")}/>
                    <StyledTextBold>Występowanie
                        młodych:</StyledTextBold><StyledText> {marker.report && marker.report.with_children ? marker.report.with_children : "nie"}</StyledText>
                </StyledTexts>
            </StyledTextsContainer>

                <StyledButton onPress={() => onCloseClicked()}>
                    <StyledButtonText>Zamknij</StyledButtonText>
                </StyledButton>
        </StyledView>
    );
};

export default MarkerDialog;