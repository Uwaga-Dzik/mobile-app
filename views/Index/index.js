import React, { useState } from "react";
import { NativeRouter, Route } from "react-router-native";
import Header from "../../components/Header";
import Layout from "../../components/Layout/";
import LinksBox from "../../components/Menu/LinksBox";
import Dzikopedia from "../Dzikopedia";
import Home from "../Home";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NativeRouter>
      <Layout>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <LinksBox isOpen={isOpen} setIsOpen={setIsOpen} />

        <Route exact path="/" component={Home} />
        <Route exact path="/dzikopedia" component={Dzikopedia} />
        {/* <Route path="/moje-zgłoszenia" component={MySubmissions} />
      <Route path="/ustawienia" component={Settings} />
      <Route path="/moje-konto" component={MyAccount} />
      <Route path="/logowanie" component={Login} />
      <Route path="/rejestracja" component={Register} />
      <Route path="/wyloguj-sie" component={LogOut} /> */}
      </Layout>
    </NativeRouter>
  );
};

export default Index;
