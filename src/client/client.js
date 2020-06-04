import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

//import { newGame } from "../mboard.js";


class Client extends React.Component {

  constructor() {

    super();

    this.state = {
      periods: "2",
      minutes: "12",
      shot: "24",
      timeouts: "3",
      fouls: "7",
      home: "Red",
      away: "Blue",
    }

    this.newGame = this.newGame.bind(this);

  } // constructor


  updateField = (event) => {
    console.log(event.target.value);
    this.setState({[event.target.name]: event.target.value});
  };


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

  } // newGame


  render() {
    return (
      <Container fluid className="mt-3">
        <Row>
          <Col xl={4}>
            <Form>
              <Form.Group>
                <ButtonGroup>
                  <Form.Label className="mr-5">Periods</Form.Label>
                  <Button>None</Button>
                  <Button>2</Button>
                  <Button>4</Button>
                </ButtonGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mr-5">Minutes</Form.Label>
                <Form.Label value={this.state.minutes}>{this.state.minutes}</Form.Label>
                <Form.Control type="range" min="1" max="30" step="1" defaultValue="12" name="minutes" onChange={this.updateField}/>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mr-5">Shot clock</Form.Label>
                <Form.Label value={this.state.shot}>{this.state.shot}</Form.Label>
                <Form.Control type="range" min="0" max="40" step="1" defaultValue="24" name="shot" onChange={this.updateField}/>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mr-5">Timeouts</Form.Label>
                <Form.Label value={this.state.timeouts}>{this.state.timeouts}</Form.Label>
                <Form.Control type="range" min="1" max="6" step="1" defaultValue="3" name="timeouts" onChange={this.updateField}/>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mr-5">Fouls</Form.Label>
                <Form.Label value={this.state.fouls}>{this.state.fouls}</Form.Label>
                <Form.Control type="range" min="0" max="10" step="1" defaultValue="7" name="fouls" onChange={this.updateField}/>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mr-5">Home</Form.Label>
                <Form.Control type="text" defaultValue={this.state.home} name="home" onChange={this.updateField}/>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mr-5">Away</Form.Label>
                <Form.Control type="text" defaultValue={this.state.away} name="away" onChange={this.updateField}/>
              </Form.Group>
              <Button variant="success" onClick={this.newGame}>Start game</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
} // Clock

export default Client;
