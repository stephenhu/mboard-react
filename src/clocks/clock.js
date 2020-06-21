// basketballclient.js

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { WS_SUBSCRIBER, WS_CONTROLLER } from "./config.js";


export default function Clock() {

  const [gameId]  = useState(0);
  let { id }      = useParams();
  const sub       = useRef(new WebSocket(`${WS_SUBSCRIBER}/${id}`));
  const ctl       = useRef(new WebSocket(`${WS_CONTROLLER}/${id}`));

  useEffect(() => {

    sub.current.onopen = function(e) {
      console.log("sub opened");
    }

    sub.current.onmessage = function(e) {

      var obj = JSON.parse(e.data);

      console.log(obj);

      listener(obj);

    }

    ctl.current.onopen = function(e) {
      console.log("ctl opened");
    };

  }, []);

  useEffect(() => () => sub.current.close(), [sub]);
  useEffect(() => () => ctl.current.close(), [ctl]);


  function gameClockToString(c, mins) {

    var delta   = mins * 60 - c.seconds;
    var ndelta  = delta - 1;
    var seconds = delta % 60;
    var minutes = Math.floor(delta/60);
    var tenths  = 10 - c.tenths;

    if(delta == 60) {

      if(minutes == 1) {

        if(tenths == 10) {
          return minutes + ":00";
        } else {
          return ndelta + "." + tenths;
        }

      } else {
        return minutes + ":59." + tenths;
      }

    } else if(minutes == 0) {

      if(ndelta == -1) {
        return "0.0";
      } else if(tenths == 10) {
        return delta + ".0";
      } else {
        return ndelta + "." + tenths;
      }

    } else if(seconds == 0) {
      return minutes + ":00";
    } else if(seconds < 10 && seconds >= 0) {
      return minutes + ":0" + seconds;
    } else {
      return minutes + ":" + seconds;
    }

  } // gameClockToString


  function shotClockToString(c, secs) {
    return secs - c.seconds;
  } // shotClockToString


  function updateClock(g, t, m, sc) {

    document.getElementById("shot").innerText = shotClockToString(t, sc);
    document.getElementById("clock").innerText = gameClockToString(g, m);

  } // updateClock


  function listener(obj) {

    console.log(obj);
    switch(obj.key) {
      case "":
        updateScore("HOME", obj.val);
        break;

      case "AWAY_SCORE":
        updateScore("AWAY", obj.val);
        break;

      case "HOME_FOUL":
        updateFouls("HOME", obj.val);
        break;

      case "AWAY_FOUL":
        updateFouls("AWAY", obj.val);
        break;

      case "GAME_STATE":
        //updateDisplay(obj.state);
        break;

      default:
        break;

    }

  } // listener

  function command(c, s) {

    console.log("cmd called " + c);
    if(ctl.current.readyState === 1) {
      ctl.current.send(JSON.stringify({"cmd": c, "step": s}));
    }

  } // command

  return (
    <Container fluid className="mt-3">
      <Row className="mt-3">
        <Col xl={12}>
          <div className="d-flex justify-content-center">
            <h1 className="d-inline text-success" id="clock">12:00</h1>
            <h5 className="d-inline ml-3 text-info align-self-center" id="period">1st</h5>
            <h5 className="d-inline ml-3 text-warning align-self-center" id="shot">24</h5>
          </div>
        </Col>
      </Row>
    </Container>
  );

} // Clock

