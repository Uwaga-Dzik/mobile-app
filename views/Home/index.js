import React from "react";
import { View } from "react-native";
import MainButton from "../../components/MainButton";

const Home = () => {
  return (
    <View>
      <View></View>
      <View>
        <MainButton text={"Widzę"} />
        <MainButton isGreen={false} text={"Widzę"} />
      </View>
    </View>
  );
};

export default Home;
