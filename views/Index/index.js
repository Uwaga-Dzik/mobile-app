import React from "react";
import MainButton from "../../components/MainButton";
import Layout from "../../components/Layout/";

const Index = () => {
  return (
    <Layout>
      <MainButton isGreen={false}>Test</MainButton>
      <MainButton isGreen>Test</MainButton>
    </Layout>
  );
};

export default Index;
