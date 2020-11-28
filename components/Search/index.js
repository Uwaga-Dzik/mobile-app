import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";

const Search = () => {
  const [text, setText] = useState("");

  return (
    <View>
      <TextInput
        onChangeText={(text) => setText(text)}
        value={text}
        placeholder={"Wyszukaj dziki"}
      />
      <Button title="Szukaj" />
    </View>
  );
};

export default Search;
