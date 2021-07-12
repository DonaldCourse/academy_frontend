import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import App from "./App";
import { Provider } from "react-redux";
import store from "./reducer/store";
import reportWebVitals from "./reportWebVitals";

import theme from './theme';
import { Globalstyled } from "./GlobalStyle";

import { AuthProvider } from './context/auth'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Globalstyled />
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <AuthProvider persistKey='auth'>
            <App />
          </AuthProvider>
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
