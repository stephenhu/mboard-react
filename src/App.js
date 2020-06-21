import React from 'react';
import { Provider } from "react-redux";
import store from "./client/store";
import "./App.css";
import Home from "./home/home.js";
import Setup from './setup/setup.js';
import Basketball from "./scoreboards/basketball.js";
import Clock from "./client/clock.js";
//import ShotClock from "./clocks/shotclock.js";
import Client from "./client/client.js";
import MainMenu from "./client/mainmenu.js";
import Media from "./client/media.js";
import Monitor from "./client/monitor.js";
import Ads from "./client/ads.js";
import Settings from "./client/settings.js";
import BasketballClient from "./client/basketballclient.js";
import Games from "./client/games.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Setup}/>
          <Route path="/setup" component={Setup}/>
          <Route path="/games" component={Games}/>
          <Route path="/controllers/:id" component={BasketballClient}/>
          <Route path="/scoreboards/:id" component={Basketball}/>
          <Route path="/clocks/:id" component={Clock}/>
          <Route path="/client" component={Client}/>
          <Route path="/home" component={MainMenu}/>
          <Route path="/media" component={Media}/>
          <Route path="/ads" component={Ads}/>
          <Route path="/monitor" component={Monitor}/>
          <Route path="/settings" component={Settings}/>
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
