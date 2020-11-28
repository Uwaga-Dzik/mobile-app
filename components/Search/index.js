import React, { useState } from "react";
import styled from "styled-components";

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

const Search = () => {
  const [text, setText] = useState("");

  return (
    <StyledSearch>
      <StyledInput
        onChangeText={(text) => setText(text)}
        value={text}
        placeholder={"Wyszukaj lokalizacje"}
      />
      <StyledButton>
        <StyledIcon source={require("../../assets/icons/search.png")} />
      </StyledButton>
    </StyledSearch>
  );
};

export default Search;
