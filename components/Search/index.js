import React, { useState } from "react";
import styled from "styled-components";
import * as Location from "expo-location";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as mapActions from "../../redux/actions/MapActions";

const StyledSearch = styled.View`
  width: 90%;
  display: flex;
  flex-direction: row;
  padding: 5px;
  justify-content: center;
  align-items: center;
  border: 1px solid #dedede;
  border-radius: 8px;
  height: 100%;
`;

const StyledButton = styled.TouchableOpacity``;

const StyledIcon = styled.Image`
  margin-left: 3px;
`;

const StyledInput = styled.TextInput`
  width: 85%;
  font-size: 16px;
`;

const Search = ({ mapActions, closeLinksBox }) => {
  const [text, setText] = useState("");

  const handleSearch = () => {
    Location.geocodeAsync(text)
      .then((resp) => {
        if (resp.length > 0) {
          mapActions.navigateToRegion(resp[0].latitude, resp[0].longitude);
            closeLinksBox();
        } else {
          console.log("Nie znaleziono lokalizacji");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <StyledSearch>
      <StyledInput
        onChangeText={(text) => setText(text)}
        value={text}
        placeholder={"Wyszukaj lokalizacje na mapie"}
        onSubmitEditing={handleSearch}
      />
      <StyledButton onPress={handleSearch}>
        <StyledIcon source={require("../../assets/icons/search.png")} />
      </StyledButton>
    </StyledSearch>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    mapActions: bindActionCreators(mapActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Search);
