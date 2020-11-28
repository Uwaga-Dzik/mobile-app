import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styled from "styled-components";
import MainButton from "../MainButton";
import * as ImagePicker from "expo-image-picker";
import { ButtonGroup, CheckBox, Input } from "react-native-elements";
import Textarea from "react-native-textarea";

const StyledFormModal = styled.View`
  position: absolute;
  top: 2%;
  left: 5%;
  height: 67%;
  width: 90%;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 3;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
`;

const StyledText = styled.Text`
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;
`;

const StyledButton = styled.TouchableOpacity`
  margin-top: 10px;
`;

const StyledImage = styled.Image`
  width: 200;
  height: 200;
  margin-top: 20px;
`;

const StyledFormWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin: 4px 0;
`;

const StyledDescription = styled.TextInput`
  width: 80%;
  margin: 5px;
  padding: 10px;
  border: 1px solid black;
`;

const StyledFormModalTwo = styled(StyledFormModal)`
  margin-top: 20%;
`;

const buttons = ["mały", "średni", "duży"];

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const FormModal = ({ isBoar, setIsBoar, isFootPrints, setIsFootPrint }) => {
  const [image, setImage] = useState(null);
  const [isChildern, setIsChildren] = useState(false);
  const [buttonIndex, setButtonIndex] = useState(1);
  const [description, setDescription] = useState("");
  const [isDeath, setIsDeath] = useState(false);

  const handleCloseModal = (isCancle = false) => {
    setIsBoar(false);
    setIsFootPrint(false);
    setImage(null);
    setIsChildren(false);
    setButtonIndex(1);
    setDescription("");
    setIsDeath(false);

    if (isCancle) return;
    else alert("Dziękujemy, Twoje zgłoszenie zostało poprawnie dodane 😀");
  };

  const handleAddCameraRoll = async () => {
    Keyboard.dismiss();

    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();

        if (status !== "granted") {
          alert(
            "Musisz dać dostęp aplikacji do galerii zdjęć, aby użyć tej funkcji"
          );
        }
      }
    })();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleAddCamera = async () => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== "granted") {
          alert("Musisz dać dostęp aplikacji do aparatu, aby użyć tej funkcji");
        }
      }
    })();

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (isBoar || isFootPrints) {
    return (
      <StyledFormModal
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        {isFootPrints && (
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <StyledFormModalTwo>
              <StyledText>Dodatkowe informacje</StyledText>
              <Text>Wszystkie pola są opcjonalne</Text>
              <Text>Twoje zgłoszenie zostało już dodane</Text>

              <Text style={{ marginTop: 10, marginBottom: 10 }}>
                Opis napotkanych śladów:
              </Text>

              <Textarea
                containerStyle={{ padding: 10, height: 100 }}
                onChangeText={setDescription}
                defaultValue={description}
                maxLength={120}
                placeholder={"Wprowadź opis"}
                placeholderTextColor={"#c7c7c7"}
                underlineColorAndroid={"transparent"}
              />

              <StyledButton onPress={handleAddCameraRoll}>
                <MainButton text={"Wybierz zdjęcie"} />
              </StyledButton>
              <StyledButton onPress={handleAddCamera}>
                <MainButton text={"Zrób zdjęcie"} />
              </StyledButton>

              {image && (
                <Text style={{ marginTop: 10, marginBottom: 10 }}>
                  Zdjęcie zostało dodane pomyślnie 😃
                </Text>
              )}

              <StyledFormWrapper>
                <StyledButton onPress={() => handleCloseModal()}>
                  <MainButton text={"Zatwierdź"} />
                </StyledButton>
                <Text>&nbsp;</Text>
                <StyledButton onPress={() => handleCloseModal(true)}>
                  <MainButton text={"Anuluj"} isGreen={false} />
                </StyledButton>
              </StyledFormWrapper>
            </StyledFormModalTwo>
          </TouchableWithoutFeedback>
        )}
        {isBoar && (
          <>
            <StyledText>Co widzisz? </StyledText>
            <Text>Wszystkie pola są opcjonalne</Text>
            <Text>Twoje zgłoszenie zostało już dodane</Text>

            <Text style={{ marginTop: 10 }}>Rozmiar grupy</Text>
            <StyledFormWrapper>
              <ButtonGroup
                onPress={setButtonIndex}
                selectedIndex={buttonIndex}
                buttons={buttons}
                containerStyle={{ height: 50, width: 250 }}
                textStyle={{ fontSize: 20 }}
                selectedButtonStyle={{ backgroundColor: "#43C079" }}
              />
            </StyledFormWrapper>

            <StyledFormWrapper>
              <CheckBox
                checked={isDeath}
                onValueChange={setIsDeath}
                title="martwy dzik"
                onPress={() => setIsDeath(!isDeath)}
                checkedColor={"#FE9454"}
              />
            </StyledFormWrapper>

            <StyledFormWrapper>
              <CheckBox
                checked={isChildern}
                onValueChange={setIsChildren}
                title="zauważyłem/łam młode dziki"
                onPress={() => setIsChildren(!isChildern)}
                checkedColor={"#43C079"}
              />
            </StyledFormWrapper>

            <StyledButton onPress={handleAddCameraRoll}>
              <MainButton text={"Wybierz zdjęcie"} />
            </StyledButton>

            <StyledButton onPress={handleAddCamera}>
              <MainButton text={"Zrób zdjęcie"} />
            </StyledButton>

            {image && (
              <Text style={{ marginTop: 10 }}>
                Zdjęcie zostało dodane pomyślnie 😃
              </Text>
            )}

            <StyledFormWrapper>
              <StyledButton onPress={() => handleCloseModal()}>
                <MainButton text={"Zatwierdź"} />
              </StyledButton>
              <Text>&nbsp;</Text>
              <StyledButton onPress={() => handleCloseModal(true)}>
                <MainButton text={"Anuluj"} isGreen={false} />
              </StyledButton>
            </StyledFormWrapper>
          </>
        )}
      </StyledFormModal>
    );
  } else return null;
};

export default FormModal;
