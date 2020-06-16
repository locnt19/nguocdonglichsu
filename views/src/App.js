import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/shards-dashboards.1.1.0.min.css';
import './App.css';

import { AppProvider } from './AppProvider';
import LoginPage from './views/Login';
import DashboardPage from './views/Dashboard';
import OpeningPage from './views/Opening';
import Question from './views/partical/Question';

export default function App(props) {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route path="/users/login" component={LoginPage} />
          <PrivateRoute path="/opening" component={OpeningPage} />
          <PrivateRoute path="/section-1" component={Question} />
          <PrivateRoute path="/" component={DashboardPage} />
        </Switch>
      </Router>
    </AppProvider>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  let cookie = document.cookie.split(';');
  let token = cookie.find(item => item.includes('token'))
  console.log(token);
  return (<Route {...rest} render={
    (props) => {
      const result = token
        ? <Component {...props} />
        : <Redirect to='/users/login' />
      return result;
    }
  } />)
};