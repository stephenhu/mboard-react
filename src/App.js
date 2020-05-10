import React from 'react';

import "./App.css";
import Home from "./home/home.js";
import Setup from './setup/setup.js';
import Basketball from "./scoreboards/basketball.js";
import GameClock from "./clocks/gameclock.js";
import ShotClock from "./clocks/shotclock.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/setup" component={Setup}/>
        <Route path="/basketball" component={Basketball}/>
        <Route path="/clocks/shot" component={ShotClock}/>
        <Route path="/clocks/game" component={GameClock}/>
      </Switch>
    </Router>
  );
}

export default App;
