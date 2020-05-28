import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/shards-dashboards.1.1.0.min.css';
import './App.css';

import LoginPage from './views/Login';


// This example has 3 pages: a public page, a protected
// page, and a login screen. In order to see the protected
// page, you must first login. Pretty standard stuff.
//
// First, visit the public page. Then, visit the protected
// page. You're not yet logged in, so you are redirected
// to the login page. After you login, you are redirected
// back to the protected page.
//
// Notice the URL change each time. If you click the back
// button at this point, would you expect to go back to the
// login page? No! You're already logged in. Try it out,
// and you'll see you go back to the page you visited
// just *before* logging in, the public page.


export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <ul>
            <li>
              <Link to="/login">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/thong-bao">Thông báo</Link>
            </li>
          </ul> */}
          <Switch>
            <Route path="/thong-bao">
              <h1>trang thông báo</h1>
            </Route>
            <Route path="/login">
              <LoginPage auth={fakeAuth} />
            </Route>
            <PrivateRoute path="/">
              <h3>Home Page</h3>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}
