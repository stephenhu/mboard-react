// basketballclient.js

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToggleButton from "react-bootstrap/ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward, faCircle, faMinus, faPlay, faPlus, faRedo, faStepBackward, faStepForward, faStop } from "@fortawesome/free-solid-svg-icons";
import { WS_SUBSCRIBER, WS_CONTROLLER } from "./config.js";


export default function Clock() {

  const [away, setAway]   = useState("AWAY");
  const [home, setHome]   = useState("HOME");
  const [possession, setPossession]   = useState(null);
  const [awayTimeout, setAwayTimeout] = useState(3);
  const [homeTimeout, setHomeTimeout] = useState(3);
  const [clock, setClock]             = useState("12:00");
  const [clockState, setClockState]   = useState(false);
  const [shot, setShot]               = useState("24");
  const [period, setPeriod]           = useState(1);

  let { id }      = useParams();
  const sub       = useRef(new WebSocket(`${WS_SUBSCRIBER}/${id}`));
  const ctl       = useRef(new WebSocket(`${WS_CONTROLLER}/${id}`));

  const PERIODS   = ["1st", "2nd", "3rd", "4th"];


  useEffect(() => {

    sub.current.onopen = function(e) {
      console.log("subscribed successfully");
    }

    sub.current.onmessage = function(e) {

      var obj = JSON.parse(e.data);

      console.log(obj);

      listener(obj);

    }

    ctl.current.onopen = function(e) {
      console.log("ctl opened");
      command("GAME_STATE");
    }

  }, []);

  useEffect(() => () => sub.current.close(), [sub]);
  useEffect(() => () => ctl.current.close(), [ctl]);


  function updateState(o) {

    setHome(o.state.home.name);
    setAway(o.state.away.name);

    document.getElementById("home").innerText = o.state.home.name;
    document.getElementById("away").innerText = o.state.away.name;


    if(o.state.possession) {
      setPossession("HOME");
      selectPossession("HOME");
    } else {
      setPossession("AWAY");
      selectPossession("AWAY");
    }

    var game = gameClockToString(o.state.game, o.state.settings.minutes);
    var shot = shotClockToString(o.state.shot, o.state.settings.shot);

    document.getElementById("clock").innerText  = game;
    document.getElementById("shot").innerText   = shot;

    updatePeriod(o.state.period);

    setClock(game);
    setShot(shot);

  } // updateState


  function updatePeriod(val) {

    var p   = parseInt(val);
    var str = PERIODS[0];

    if(p > 3) {
      str = "OT" + (p - 3);
    } else {
      str = PERIODS[p];
    }

    document.getElementById("period").innerHTML = str;

    setPeriod(val);

  } // updatePeriod


  function updatePossession(t) {

  } // updatePossession


  function gameClockToString(c, mins) {

    var delta   = mins * 60 - c.seconds;
    var ndelta  = delta - 1;
    var seconds = delta % 60;
    var minutes = Math.floor(delta/60);
    var tenths  = 10 - c.tenths;

    if(delta === 60) {

      if(minutes === 1) {

        if(tenths === 10) {
          return minutes + ":00";
        } else {
          return ndelta + "." + tenths;
        }

      } else {
        return minutes + ":59." + tenths;
      }

    } else if(minutes === 0) {

      if(ndelta === -1) {
        return "0.0";
      } else if(tenths === 10) {
        return delta + ".0";
      } else {
        return ndelta + "." + tenths;
      }

    } else if(seconds === 0) {
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


  function updateClock(o) {

    document.getElementById("shot").innerText = shotClockToString(o.shot, o.shotclock);
    document.getElementById("clock").innerText = gameClockToString(o.game, o.minutes);

  } // updateClock


  function updateTimeout(t, v) {

    if(t === "HOME") {
      //document.getElementById("homeTimeout").innerText = v;
    } else {

    }

  } // updateTimeout


  function listener(obj) {

    switch(obj.key) {
      case "CLOCK":

        var j = JSON.parse(obj.val);

        updateClock(j);
        break;

      case "PERIOD":
        console.log(obj);
        //updateScore("AWAY", obj.val);
        break;

      case "POSSESSION_HOME":
        updatePossession("HOME");
        break;

      case "POSSESSION_AWAY":
        updatePossession("AWAY");
        break;

      case "GAME_STATE":
        updateState(obj);
        break;

      case "HOME_TIMEOUT":
        //updateDisplay(obj.state);
        break;

      case "AWAY_TIMEOUT":
        //updateDisplay(obj.state);
        break;

      case "END_PERIOD":
        updatePeriod(obj.val);
        break;

      case "SHOT_VIOLATION":
        playButton();
        break;

      default:
        break;

    }

  } // listener

  function command(c, s, m) {

    console.log("cmd called " + c);
    if(ctl.current.readyState === 1) {
      ctl.current.send(JSON.stringify({"cmd": c, "step": s, "meta": m}));
    }

  } // command


  function playButton() {
    document.getElementById("play").setAttribute("class", "rounded-circle p-5 btn btn-outline-success");
    document.getElementById("stop").setAttribute("class", "d-none rounded-circle p-5 btn btn-outline-danger");
  } // playButton


  function stopButton() {
    document.getElementById("play").setAttribute("class", "d-none rounded-circle p-5 btn btn-outline-success");
    document.getElementById("stop").setAttribute("class", "rounded-circle p-5 btn btn-outline-danger");
  } // stopButton


  function toggleClock() {

    if(clockState) {

      playButton();

      command("CLOCK_STOP");

    } else {

      stopButton();

      command("CLOCK_START");

    }

    setClockState(!clockState)



  } // toggleClock


  function selectPossession(t) {

    if(t === "HOME") {
      document.getElementById("home").setAttribute("class", "rounded text-uppercase float-right btn btn-info");
      document.getElementById("away").setAttribute("class", "rounded text-uppercase btn btn-outline-info");
    } else {
      document.getElementById("home").setAttribute("class", "rounded text-uppercase float-right btn btn-outline-info");
      document.getElementById("away").setAttribute("class", "rounded text-uppercase btn btn-info");
    }

  } // invertButtons


  function togglePossession(v) {

    if(v !== possession) {

      if(possession === "HOME") {

        setPossession("AWAY");
        selectPossession("AWAY");

        command("POSSESSION_AWAY", null, {"stop": !clockState});

      } else {

        setPossession("HOME");
        selectPossession("HOME");

        command("POSSESSION_HOME", null, {"stop": !clockState});

      }

    }

  } // togglePossession


  function callTimeout(t, s) {

    if(t === "HOME") {

      if(s === 1) {
        command("HOME_TIMEOUT");
      } else {
        command("HOME_TIMEOUT_CANCEL");
      }

    } else {

      if(s === 1) {
        command("AWAY_TIMEOUT");
      } else {
        command("AWAY_TIMEOUT_CANCEL");
      }

    }

  } // callTimeout


  return (
    <Container fluid className="mt-3">
      <Row className="mt-3">
        <Col xl={12}>
          <div className="d-flex justify-content-center">
            <h5 className="d-inline text-info align-self-center" id="period">1st</h5>
            <h1 className="d-inline ml-3 text-success" id="clock">12:00</h1>
            <h5 className="d-inline ml-3 text-warning align-self-center" id="shot">24</h5>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h5>Game clock</h5>
          <ButtonGroup className="">
            <Button variant="outline-info" className="rounded">
              <FontAwesomeIcon icon={faStepBackward}/>
            </Button>
            <Button variant="outline-info" className="ml-1 rounded">
              <FontAwesomeIcon icon={faStepForward}/>
            </Button>
            <Button variant="outline-info" className="ml-1 rounded">
              <FontAwesomeIcon icon={faRedo}/>
            </Button>
          </ButtonGroup>
        </Col>
        <Col>
          <h5 className="text-right">Shot clock</h5>
          <ButtonGroup className="float-right">
            <Button variant="outline-info" className="rounded">
              <FontAwesomeIcon icon={faStepBackward}/>
            </Button>
            <Button variant="outline-info" className="ml-1 rounded">
              <FontAwesomeIcon icon={faStepForward}/>
            </Button>
            <Button variant="outline-info" className="ml-1 rounded">
              <FontAwesomeIcon icon={faRedo}/>
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <div>
            <FontAwesomeIcon className="text-info" icon={faCircle}/>
            <FontAwesomeIcon className="ml-1 text-info" icon={faCircle}/>
          </div>
        </Col>
        <Col>
          <h5 className="text-center">Timeouts</h5>
        </Col>
        <Col>
          <div className="text-right">
            <FontAwesomeIcon className="text-info" icon={faCircle}/>
            <FontAwesomeIcon className="ml-1 text-info" icon={faCircle}/>
            <FontAwesomeIcon className="ml-1 text-info" icon={faCircle}/>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <ButtonGroup className="">
            <Button variant="outline-info" className="rounded-circle" size="sm" onClick={(e) => callTimeout("AWAY", 1)}>
              <FontAwesomeIcon icon={faPlus}/>
            </Button>
            <Button variant="outline-info" className="ml-2 rounded-circle" size="sm" onClick={(e) => callTimeout("AWAY", -1)}>
              <FontAwesomeIcon icon={faMinus}/>
            </Button>
          </ButtonGroup>
        </Col>
        <Col>
          <ButtonGroup className="float-right">
            <Button variant="outline-info" className="rounded-circle" size="sm" onClick={(e) => callTimeout("HOME", 1)}>
              <FontAwesomeIcon icon={faPlus}/>
            </Button>
            <Button variant="outline-info" className="ml-2 rounded-circle" size="sm" onClick={(e) => callTimeout("HOME", -1)}>
              <FontAwesomeIcon icon={faMinus}/>
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Button id="away" variant="info" className="rounded text-uppercase" onClick={() => togglePossession("AWAY")}>{away}</Button>
        </Col>
        <Col>
          <h5 className="text-center">Possession</h5>
        </Col>
        <Col>
          <Button id="home" variant="outline-info" className="rounded text-uppercase float-right" onClick={() => togglePossession("HOME")}>{home}</Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <center>
            <Button id="play" variant="outline-success" className="rounded-circle p-5" value={clockState} onClick={(e) => toggleClock(e.target.value)}>
              <FontAwesomeIcon icon={faPlay} size="2x"/>
            </Button>
            <Button id="stop" variant="outline-danger" className="d-none rounded-circle p-5" value={clockState} onClick={(e) => toggleClock(e.target.value)}>
              <FontAwesomeIcon icon={faStop} size="2x"/>
            </Button>
          </center>
        </Col>
      </Row>
    </Container>
  );

} // Clock
