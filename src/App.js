import React from 'react';

import "./App.css";
import Home from "./home/home.js";
import Setup from './setup/setup.js';
import Basketball from "./scoreboards/basketball.js";
import Clock from "./clocks/clock.js";
import ShotClock from "./clocks/shotclock.js";
import Client from "./client/client.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/setup" component={Setup}/>
        <Route path="/scoreboards/:id" component={Basketball}/>
        <Route path="/clocks/:id" component={Clock}/>
        <Route path="/clocks/:id" component={ShotClock}/>
        <Route path="/client" component={Client}/>
      </Switch>
    </Router>
  );
}

export default App;
