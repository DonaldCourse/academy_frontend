import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PublicRouter from './routes/PublicRouter';
import ProtectRouter from './routes/ProtectRouter';

import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
// Pages
const LoginPage = React.lazy(() => import('./features/login/LoginPage'));
const RegisterPage = React.lazy(() => import('./features/register/RegisterPage'));
const ForgotPage = React.lazy(() => import('./features/forgot/ForgotPage'));
const ValidateRegisterPage = React.lazy(() => import('./features/forgot/ValidateRegisterPage'));
const SettingPage = React.lazy(() => import('./features/setting/SettingPage'));
const VerifyPassNewPage = React.lazy(() => import('./features/forgot/VerifyPassNewPage'));

// Containers
const TheLayout = React.lazy(() => import('./components/layout/TheLayout'));

function App(props) {
  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <PublicRouter exact path="/login" name="Login" component={LoginPage} />
          <PublicRouter exact path="/register" name="Register" component={RegisterPage} />
          <PublicRouter exact path="/register/validate" name="Register" component={ValidateRegisterPage} />
          <PublicRouter exact path="/resetpassword" name="Reset Password" component={VerifyPassNewPage} />
          <PublicRouter exact path="/forgot" name="Forgot" component={ForgotPage} />
          <ProtectRouter exact={false} path="/setting" name="Setting" component={SettingPage}></ProtectRouter>
          <PublicRouter path="/" name="Home" component={TheLayout} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}
App.propTypes = {

};

export default App;