import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';

import './index.css';
import './pages/Formpages.css';

import Select from './pages/Select/Select.jsx';
import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import Home from './pages/Home/Home.jsx';

import AuthAdapter from './adapters/auth/auth.adapter';
import Services from './pages/Services/Services.jsx';

function PrivateRoute({ children, ...rest }) {
  const [checkForAuth, setCheckForAuth] = useState(false);

  useEffect(() => {
    AuthAdapter.verify().then(() => {
      setCheckForAuth(true);
    });
  }, []);

  return checkForAuth ? (
    <Route
      {...rest}
      render={() => {
        return AuthAdapter.isAuthentified == true ? (
          children
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  ) : null;
}

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Select />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <PrivateRoute exact path="/home">
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path="/services">
            <Services />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
