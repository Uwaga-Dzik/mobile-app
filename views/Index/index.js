import React from "react";
import { NativeRouter, Route } from "react-router-native";
import Layout from "../../components/Layout/";
import Menu from "../../components/Menu";
import Home from "../Home";

const Index = () => {
  return (
    <NativeRouter>
      <Layout>
        <Menu />

        <Route exact path="/" component={Home} />
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
