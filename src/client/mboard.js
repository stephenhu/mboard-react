// mboard.js

import axios from "axios";
import { REST_API } from "./config.js";

export const API_PARAM_GAME_CONFIG    = "gameConfig";

export function newGame(obj) {

  console.log(obj);
  //console.log(obj);
  var formData = new FormData();

  formData.append(API_PARAM_GAME_CONFIG, JSON.stringify({
    "periods": parseInt(obj.periods),
    "minutes": parseInt(obj.minutes),
    "shot": parseInt(obj.shot),
    "timeouts": parseInt(obj.timeouts),
    "fouls": parseInt(obj.fouls),
    "home": obj.home,
    "away": obj.away
  }));

  axios({
    url: `${REST_API}/games`,
    method: "post",
    data: formData
  })
    .then(function(res) {
      console.log(res.data);
      window.location = `/scoreboards/${res.data}`;
    })
    .catch(function(err) {
      console.log(err);
    })

} // newGame


export function getGames() {

  axios({
    url: `${REST_API}/games`,
    method: "get"
  })
    .then(function(res) {
      console.log(res.data);
    })
    .catch(function(err) {
      console.log(err);
    })

} // getGames
