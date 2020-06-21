// games.js

import React from "react";
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

import { getGames } from "./mboard.js";

export default function Games() {

  getGames();

  function updateField(event) {
  }; // updateField


  function handleSelect(selectedKey) {
  }; // handleSelect


  return (
    <Container fluid className="mt-3">
      <Row>
        <Col xl={12}>
          <h1>hello world games list here</h1>
        </Col>
      </Row>
    </Container>
  );

} // Games
