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


export default function BasketballClient() {

  const [home, setHome]               = useState("HOME");
  const [away, setAway]               = useState("AWAY");
  const [homeScore, setHomeScore]     = useState("0");
  const [awayScore, setAwayScore]     = useState("0");
  const [homeFouls, setHomeFouls]     = useState("0");
  const [awayFouls, setAwayFouls]     = useState("0");

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
      command("GAME_STATE");
    };

  }, []);

  useEffect(() => () => sub.current.close(), [sub]);
  useEffect(() => () => ctl.current.close(), [ctl]);


  function calcScore(data) {

    var keys = Object.keys(data);

    var total = 0;

    for(var i = 0; i < keys.length; i++) {
      total = total + data[keys[i]];
    }

    return total;

  } // calcScore


  function updateState(o) {

    setHome(o.state.home.name);
    setAway(o.state.away.name);

    document.getElementById("home").innerText = o.state.home.name;
    document.getElementById("away").innerText = o.state.away.name;

    var hs = calcScore(o.state.home.points);
    var as = calcScore(o.state.away.points);

    setHomeScore(hs);
    setAwayScore(as);

    document.getElementById("homeScore").innerText = hs;
    document.getElementById("awayScore").innerText = as;

    setAwayFouls(o.state.away.fouls);
    setHomeFouls(o.state.home.fouls);

    document.getElementById("homeFouls").innerText = o.state.home.fouls;
    document.getElementById("awayFouls").innerText = o.state.away.fouls;

  } // updateState


  function updateScore(t, v) {

    if(t === "HOME") {
      document.getElementById("homeScore").innerText = v;
    } else {
      document.getElementById("awayScore").innerText = v;
    }

  } // updateScore


  function updateFouls(t, v) {

    if(t === "HOME") {
      document.getElementById("homeFouls").innerText = v;
    } else {
      document.getElementById("awayFouls").innerText = v;
    }

  } // updateFouls


  function listener(obj) {

    console.log(obj);
    switch(obj.key) {
      case "HOME_SCORE":
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
        updateState(obj);
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
      <Row>
        <Col>
          <h3 className="text-uppercase text-info text-right" id="away">Cavaliers</h3>
          <h1 className="text-success text-right" id="awayScore">0</h1>
        </Col>
        <Col>
          <h3 className="text-uppercase text-info text-left" id="home">Lakers</h3>
          <h1 className="text-success text-left" id="homeScore">0</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5 className="text-info text-right">Fouls</h5>
          <h4 className="text-right" id="awayFouls">3</h4>
        </Col>

        <Col>
          <h5 className="text-info text-left">Fouls</h5>
          <h4 className="text-left" id="homeFouls">6</h4>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <ButtonGroup className="float-right">
            <Button variant="outline-info" className="rounded-circle mr-2" onClick={() => command("SCORE_AWAY", 1)}>
              <FontAwesomeIcon icon={faPlus}/>
            </Button>
            <Button variant="outline-info" className="rounded-circle mr-2" onClick={() => command("SCORE_AWAY", -1)}>
              <FontAwesomeIcon icon={faMinus}/>
            </Button>
          </ButtonGroup>
        </Col>
        <Col>
          <h2 className="text-center">1PT</h2>
        </Col>
        <Col>
          <ButtonGroup>
            <Button variant="outline-info" className="rounded-circle mr-2" onClick={() => command("SCORE_HOME", 1)}>
              <FontAwesomeIcon icon={faPlus}/>
            </Button>
            <Button variant="outline-info" className="rounded-circle mr-2" onClick={() => command("SCORE_HOME", -1)}>
              <FontAwesomeIcon icon={faMinus}/>
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col>
          <ButtonGroup className="float-right">
            <Button variant="outline-info" className="rounded-circle mr-2" onClick={() => command("SCORE_AWAY", 2)}>
              <FontAwesomeIcon icon={faPlus}/>
            </Button>
            <Button variant="outline-info" className="rounded-circle mr-2" onClick={() => command("SCORE_AWAY", -2)}>
              <FontAwesomeIcon icon={faMinus}/>
            </Button>
          </ButtonGroup>
        </Col>
        <Col>
          <h2 className="text-center">2PT</h2>
        </Col>
        <Col>
          <ButtonGroup>
            <Button variant="outline-info" className="rounded-circle mr-2" onClick={() => command("SCORE_HOME", 2)}>
              <FontAwesomeIcon icon={faPlus}/>
            </Button>
            <Button variant="outline-info" className="rounded-circle mr-2" onClick={() => command("SCORE_HOME", -2)}>
              <FontAwesomeIcon icon={faMinus}/>
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col>
          <ButtonGroup className="float-right">
            <Button variant="outline-info" className="rounded-circle mr-2" onClick={() => command("SCORE_AWAY", 3)}>
              <FontAwesomeIcon icon={faPlus}/>
            </Button>
            <Button variant="outline-info" className="rounded-circle mr-2" onClick={() => command("SCORE_AWAY", -3)}>
              <FontAwesomeIcon icon={faMinus}/>
            </Button>
          </ButtonGroup>
        </Col>
        <Col>
          <h2 className="text-center">3PT</h2>
        </Col>
        <Col>
          <ButtonGroup>
            <Button variant="outline-info" className="rounded-circle mr-2" onClick={() => command("SCORE_HOME", 3)}>
              <FontAwesomeIcon icon={faPlus}/>
            </Button>
            <Button variant="outline-info" className="rounded-circle mr-2" onClick={() => command("SCORE_HOME", -3)}>
              <FontAwesomeIcon icon={faMinus}/>
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col>
          <ButtonGroup className="float-right">
            <Button variant="outline-info" className="rounded-circle mr-2" onClick={() => command("FOUL_AWAY_UP")}>
              <FontAwesomeIcon icon={faPlus}/>
            </Button>
            <Button variant="outline-info" className="rounded-circle mr-2" onClick={() => command("FOUL_AWAY_DOWN")}>
              <FontAwesomeIcon icon={faMinus}/>
            </Button>
          </ButtonGroup>
        </Col>
        <Col>
          <h2 className="text-center">Foul</h2>
        </Col>
        <Col>
          <ButtonGroup>
            <Button variant="outline-info" className="rounded-circle mr-2" onClick={() => command("FOUL_HOME_UP")}>
              <FontAwesomeIcon icon={faPlus}/>
            </Button>
            <Button variant="outline-info" className="rounded-circle mr-2" onClick={() => command("FOUL_HOME_DOWN")}>
              <FontAwesomeIcon icon={faMinus}/>
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );

} // BasketballClient
