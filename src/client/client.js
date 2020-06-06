import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ToggleButton from "react-bootstrap/ToggleButton";

//import { newGame } from "../mboard.js";


class Client extends React.Component {

  constructor() {

    super();

    this.state = {
      sport: "basketball",
      periods: "2",
      minutes: "12",
      shot: "24",
      timeouts: "3",
      fouls: "7",
      home: "Red",
      away: "Blue",
      activeSportKey: 1,
      activePeriodsKey: 1,
    }

    this.newGame = this.newGame.bind(this);

    this.sports = [
      {name: "Badminton", value: "badminton"},
      {name: "Basketball", value: "basketball"},
      {name: "Soccer", value: "soccer"},
      {name: "Table Tennis", value: "tabletennis"},
    ]

    this.periods = [
      {name: "None", value: "0"},
      {name: "2", value: "2"},
      {name: "4", value: "4"},

    ]

  }; // constructor


  setActive(event) {

    if(event.target.name === "sport") {

    }

  }; // updateSelect


  updateField = (event) => {
    this.setState({[event.target.name]: event.target.value});
    this.setActive(event);
  }; // updateField


  handleSelect(selectedKey) {
    this.setState({activeSportKey: selectedKey});
  }; // handleSelect


  newGame() {

    console.log("newGame");
    console.log(this.state);

    fetch('http://localhost/api/games', {
      method: "post",
      body: JSON.stringify(this.state)
    })
    .then((response) => {
      if(response.ok) return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })

  }; // newGame


  render() {
    return (
      <Container fluid className="mt-3">
        <Row>
          <Col xl={5}>
            <Form>
              <Form.Group>
                <ButtonGroup toggle>
                  {this.sports.map((radio, index) =>
                    <ToggleButton key={index} variant="outline-primary" className="mr-2 rounded" type="radio" onClick={this.updateField} name="sport" value={radio.value} checked={this.state.sport === radio.value}>{radio.name}</ToggleButton>
                  )}
                </ButtonGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mr-5 h5">Periods</Form.Label>
                <ButtonGroup toggle>
                  {this.periods.map((radio, index) =>
                    <ToggleButton key={index} variant="outline-primary" className="mr-2 rounded" type="radio" onClick={this.updateField} name="periods" value={radio.value} checked={this.state.periods === radio.value}>{radio.name}</ToggleButton>
                  )}
                </ButtonGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mr-5 h5">Minutes</Form.Label>
                <Form.Label className="h2 text-primary" value={this.state.minutes}>{this.state.minutes}</Form.Label>
                <Form.Control type="range" min="1" max="30" step="1" defaultValue="12" name="minutes" onChange={this.updateField}/>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mr-5 h5">Shot clock</Form.Label>
                <Form.Label className="h2 text-primary" value={this.state.shot}>{this.state.shot}</Form.Label>
                <Form.Control type="range" min="0" max="40" step="1" defaultValue="24" name="shot" onChange={this.updateField}/>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mr-5 h5">Timeouts</Form.Label>
                <Form.Label className="h2 text-primary" value={this.state.timeouts}>{this.state.timeouts}</Form.Label>
                <Form.Control type="range" min="1" max="6" step="1" defaultValue="3" name="timeouts" onChange={this.updateField}/>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mr-5 h5">Fouls</Form.Label>
                <Form.Label className="h2 text-primary" value={this.state.fouls}>{this.state.fouls}</Form.Label>
                <Form.Control type="range" min="0" max="10" step="1" defaultValue="7" name="fouls" onChange={this.updateField}/>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mr-5 h5">Home team</Form.Label>
                <Form.Control type="text" defaultValue={this.state.home} name="home" onChange={this.updateField}/>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mr-5 h5 text-primary" size="lg">Away team</Form.Label>
                <Form.Control type="text" defaultValue={this.state.away} name="away" onChange={this.updateField}/>
              </Form.Group>
              <Button variant="primary" size="lg" onClick={this.newGame}>Start game</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }

} // Clock

export default Client;
