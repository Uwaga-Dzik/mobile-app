import React, { useState } from "react";
import styled from "styled-components";
import * as Location from "expo-location";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as mapActions from "../../redux/actions/MapActions";

const StyledSearch = styled.View`
  width: 60%;
  display: flex;
  flex-direction: row;
  padding: 5px;
  justify-content: center;
  align-items: center;
  border: 1px solid #dedede;
  border-radius: 8px;
  height: 50%;
`;

const StyledButton = styled.TouchableWithoutFeedback``;

const StyledIcon = styled.Image`
  margin-left: 3px;
`;

const StyledInput = styled.TextInput`
  width: 85%;
  font-size: 16px;
`;

const Search = ({ mapActions }) => {
  const [text, setText] = useState("");

  const handleSearch = () => {
    Location.geocodeAsync(text)
      .then((resp) => {
        if (resp.length > 0) {
          const respArr = Object.values(...resp);
          mapActions.navigateToRegion(respArr[0], respArr[1]);
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
        placeholder={"Wyszukaj lokalizacje"}
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
