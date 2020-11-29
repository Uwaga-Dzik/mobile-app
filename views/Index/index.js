import React, { useState, useEffect } from "react";
import { NativeRouter, Route } from "react-router-native";
import Header from "../../components/Header";
import Layout from "../../components/Layout/";
import LinksBox from "../../components/Menu/LinksBox";
import Dzikopedia from "../Dzikopedia";
import Home from "../Home";

import {API} from '../../utils/api-helper';
window.API = API;

import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import PromiseMiddleware from "redux-promise-middleware";
import rootReducer from "../../redux/store";
import { Provider } from "react-redux";
// const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, PromiseMiddleware)
);

const Index = () => {

  useEffect(() => {
    API.setupToken();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Provider store={store}>
      <NativeRouter>
        <Layout>
          <Header isOpen={isOpen} setIsOpen={setIsOpen} />
          <Route exact path="/" component={Home} />
          <LinksBox isOpen={isOpen} setIsOpen={setIsOpen} />

          <Route exact path="/dzikopedia" component={Dzikopedia} />
          {/* <Route path="/moje-zgłoszenia" component={MySubmissions} />
      <Route path="/ustawienia" component={Settings} />
      <Route path="/moje-konto" component={MyAccount} />
      <Route path="/logowanie" component={Login} />
      <Route path="/rejestracja" component={Register} />
      <Route path="/wyloguj-sie" component={LogOut} /> */}
        </Layout>
      </NativeRouter>
    </Provider>
  );
};

export default Index;
