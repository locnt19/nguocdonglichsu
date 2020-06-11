import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
          <Route path="/users/login">
            <LoginPage />
          </Route>
          <Route path="/opening">
            <OpeningPage />
          </Route>
          <Route path="/section-1">
            <Question />
          </Route>
          <Route path="/">
            <DashboardPage />
          </Route>
        </Switch>
      </Router>
    </AppProvider>
  );
};