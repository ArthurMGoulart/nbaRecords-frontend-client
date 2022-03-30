import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Home, User } from './pages/';

import './App.css';

export default function App() {
  return (
    <div className="background d-flex justify-content-center align-items-center">
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/user" component={ User } />
      </Switch>
    </div>
  );
}
