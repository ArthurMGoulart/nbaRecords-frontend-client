import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import './App.css';

export default function App() {
  return (
    <div className="background d-flex justify-content-center align-items-center">
        <Switch>
          <Route exact path="/" component={ Home } />
      </Switch>
    </div>
  );
}
