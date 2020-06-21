// client.js

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ToggleButton from "react-bootstrap/ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd, faBasketballBall, faChartBar, faChartPie, faCog, faFileAlt, faFutbol, faHome, faPhotoVideo, faPlay, faPlus, faVideo, faTableTennis, faSlidersH } from "@fortawesome/free-solid-svg-icons";

import { newGame } from "./mboard.js";


export default function Client() {

    const [sport, setSport]             = useState("basketball");
    const [periods, setPeriods]         = useState(2);
    const [minutes, setMinutes]         = useState(12);
    const [shot, setShot]               = useState(24);
    const [timeouts, setTimeouts]       = useState(3);
    const [fouls, setFouls]             = useState(7);
    const [home, setHome]               = useState("Red");
    const [away, setAway]               = useState("Blue");
    const [sportKey, setSportKey]       = useState(1);
    const [periodsKey, setPeriodsKey]   = useState(1);

    const sportVals = [
      {name: "Badminton", value: "badminton"},
      {name: "Basketball", value: "basketball"},
      {name: "Soccer", value: "soccer"},
      {name: "Table Tennis", value: "tabletennis"},
    ];

    const periodVals = [
      {name: "None", value: 0},
      {name: "2", value: 2},
      {name: "4", value: 4},

    ];

  /*
  function updateField(event) {

    if(event.target.name === "periods" || event.target.name === "minutes" ||
      event.target.name === "shot" || event.target.name === "timeouts" ||
      event.target.name === "fouls") {

      this.setState({[event.target.name]: parseInt(event.target.value)});

    } else {
      this.setState({[event.target.name]: event.target.value});
    }

  } // updateField


  function handleSelect(selectedKey) {
    this.setState({activeSportKey: selectedKey});
  } // handleSelect
  */

  function updatePeriodsKey(v) {

    setPeriods(v);

    setPeriodsKey(v);

  } // updatePeriodsKey


  function sendState() {

    newGame({
      "periods": periods,
      "minutes": minutes,
      "shot": shot,
      "fouls": fouls,
      "timeouts": timeouts,
      "home": home,
      "away": away
    });

  } // sendState


  return (
    <Container fluid className="mt-3">
      <Row>
        <Col xl={12}>
          <CardGroup>
            <Card bg="dark">
              <Card.Header>Game configuration</Card.Header>
              <Card.Body>
                <Card.Title>Periods</Card.Title>
                <ButtonGroup toggle>
                  {periodVals.map((radio, index) =>
                    <ToggleButton key={index} variant="outline-info" className="mr-2 rounded" type="radio" onChange={(e) => setPeriods(e.currentTarget.value)} name="periods" value={radio.value} checked={periods === radio.value}>{radio.name}</ToggleButton>
                  )}
                </ButtonGroup>
              </Card.Body>
              <Card.Body>
                <Form.Group>
                  <Form.Label className="mr-5 h5">Minutes per period</Form.Label>
                  <Form.Label className="h2 text-info" value={minutes}>{minutes}</Form.Label>
                  <Form.Control type="range" min="1" max="30" step="1" defaultValue="12" name="minutes" onChange={(e) => setMinutes(e.target.value)}/>
                </Form.Group>
              </Card.Body>
              <Card.Body>
                <Form.Group>
                  <Form.Label className="mr-5 h5">Shot clock</Form.Label>
                  <Form.Label className="h2 text-info" value={shot}>{shot}</Form.Label>
                  <Form.Control type="range" min="0" max="40" step="1" defaultValue="24" name="shot" onChange={(e) => setShot(e.target.value)}/>
                </Form.Group>
              </Card.Body>
              <Card.Body>
                <Form.Group>
                  <Form.Label className="mr-5 h5">Timeouts per half</Form.Label>
                  <Form.Label className="h2 text-info" value={timeouts}>{timeouts}</Form.Label>
                  <Form.Control type="range" min="1" max="6" step="1" defaultValue="3" name="timeouts" onChange={(e) => setTimeouts(e.target.value)}/>
                </Form.Group>
              </Card.Body>
              <Card.Body>
                <Form.Group>
                  <Form.Label className="mr-5 h5">Fouls per half</Form.Label>
                  <Form.Label className="h2 text-info" value={fouls}>{fouls}</Form.Label>
                  <Form.Control type="range" min="0" max="10" step="1" defaultValue="7" name="fouls" onChange={(e) => setFouls(e.target.value)}/>
                </Form.Group>
              </Card.Body>
              <Card.Body>
                <Form.Group>
                  <Form.Label className="mr-5 h5">Home team</Form.Label>
                  <Form.Control type="text" defaultValue={home} name="home" onChange={(e) => setHome(e.target.value)}/>
                </Form.Group>
              </Card.Body>
              <Card.Body>
                <Form.Group>
                  <Form.Label className="mr-5 h5">Away team</Form.Label>
                  <Form.Control type="text" defaultValue={away} name="away" onChange={(e) => setAway(e.target.value)}/>
                </Form.Group>
              </Card.Body>
              <Card.Body>
                <Button variant="primary" size="lg" onClick={() => sendState()}>Start game</Button>
                <Button variant="primary" className="ml-2" size="lg" href="/home">Cancel</Button>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">3s</small>
              </Card.Footer>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );

} // Client

