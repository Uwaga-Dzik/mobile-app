import React from "react";
import MainButton from "../../components/MainButton";
import Layout from "../../components/Layout/";
import { Text } from "react-native";
import styled from "styled-components";

const Index = () => {
  return (
    <Layout>
      <MainButton isGreen={false} text={"Widzę"} />
      <MainButton isGreen text={"Widzę"} />
    </Layout>
  );
};

export default Index;
