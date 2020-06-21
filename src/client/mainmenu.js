import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import ToggleButton from "react-bootstrap/ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd, faBasketballBall, faChartBar, faChartPie, faCog, faFileAlt, faFutbol, faHome, faPhotoVideo, faPlay, faPlus, faVideo, faTableTennis, faSlidersH } from "@fortawesome/free-solid-svg-icons";

/*
  <Tabs defaultActiveKey="active" className="mt-5">
    <Tab eventKey="active" title="Active"></Tab>
    <Tab eventKey="completed" title="Completed"></Tab>
    <Tab eventKey="favorites" title="Favorites"></Tab>
  </Tabs>

  <Table variant="dark" striped bordered hover className="mt-5">
    <thead>
      <th>Date</th>
      <th>Game</th>
      <th>Actions</th>
    </thead>
    <tbody>
      <tr>
        <td>Apr 3, 2020 8:00am</td>
        <td variant="info">
          <a href="/game/3252">
            <FontAwesomeIcon icon={faBasketballBall} size="lg"/>
            &nbsp;&nbsp;Bulls 24 - 35 Lakers (P1 11:53)
          </a>
        </td>
        <td>
        <Button variant="outline-info" size="sm">
          <FontAwesomeIcon icon={faPlay} size="xs"/>
        </Button>
        </td>
      </tr>
      <tr>
        <td>Mar 26, 2020 3:30pm</td>
        <td><a href="/game/23652">Bulls 24 - 35 Lakers (P1 11:53)</a></td>
        <td>
        <Button variant="outline-info" size="sm">
          <FontAwesomeIcon icon={faPlay} size="xs"/>
        </Button>
        </td>
      </tr>
    </tbody>
  </Table>
*/

class Home extends React.Component {

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


  render() {
    return (
      <Container fluid className="mt-3">
        <Row className="mt-2">
          <Col xl={12}>
            <Button active variant="outline-info" type="radio" href="/home">
              <FontAwesomeIcon icon={faHome}/>
            </Button>
            <Button variant="outline-info" type="radio" className="ml-1" href="/media">
              <FontAwesomeIcon icon={faPhotoVideo}/>
            </Button>
            <Button variant="outline-info" type="radio" className="ml-1" href="/ads">
              <FontAwesomeIcon icon={faAd}/>
            </Button>
            <Button variant="outline-info" type="radio" className="ml-1" href="/monitor">
              <FontAwesomeIcon icon={faChartPie}/>
            </Button>
            <Button variant="outline-info" type="radio" className="ml-1" href="/settings">
              <FontAwesomeIcon icon={faCog}/>
            </Button>
            <DropdownButton variant="outline-success" as={ButtonGroup} title="New" id="xxx" className="ml-1 float-right">
              <Dropdown.Item eventKey="1" href="/client">
                <FontAwesomeIcon icon={faBasketballBall}/>
                &nbsp;&nbsp;Basketball
              </Dropdown.Item>
              <Dropdown.Item eventKey="2">
                <FontAwesomeIcon icon={faFutbol}/>
                &nbsp;&nbsp;Football
              </Dropdown.Item>
              <Dropdown.Item eventKey="3">
                <FontAwesomeIcon icon={faTableTennis}/>
                &nbsp;&nbsp;Table Tennis
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xl={12}>

          </Col>
        </Row>
        <Row className="mt-5">
          <Col xl={12}>
            <CardGroup>
              <Card bg="dark">
                <Card.Header>
                  <FontAwesomeIcon icon={faBasketballBall}/>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Bulls 36 - Lakers 39</Card.Title>
                  <Card.Subtitle>2nd Quarter, 8:33</Card.Subtitle>
                  <Card.Text></Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">3s</small>
                </Card.Footer>
              </Card>
              <Card bg="dark" className="ml-1">
                <Card.Header>
                  <FontAwesomeIcon icon={faBasketballBall}/>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Celtics 104 - Pistons 109</Card.Title>
                  <Card.Subtitle>Final</Card.Subtitle>
                  <Card.Text></Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">5h</small>
                </Card.Footer>
              </Card>
              <Card bg="dark" className="ml-1">
                <Card.Header>
                  <FontAwesomeIcon icon={faBasketballBall}/>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Warriors 114 - Cavaliers 88</Card.Title>
                  <Card.Subtitle>4th Quarter, 2:38</Card.Subtitle>
                </Card.Body>
                <Card.Body>
                  <Card.Link href="/game/352">
                    <FontAwesomeIcon icon={faSlidersH}/>
                  </Card.Link>
                  <Card.Link href="/game/352">
                    <FontAwesomeIcon icon={faPhotoVideo}/>
                  </Card.Link>
                  <Card.Link href="/game/352">
                    <FontAwesomeIcon icon={faFileAlt}/>
                  </Card.Link>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">17h</small>
                </Card.Footer>
              </Card>
              <Card bg="dark" className="ml-1">
                <Card.Header>
                  <FontAwesomeIcon icon={faBasketballBall}/>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Nuggets 75 - Heat 59</Card.Title>
                  <Card.Subtitle>3rd Quarter, 5:31</Card.Subtitle>
                  <Card.Text></Card.Text>
                </Card.Body>
                <Card.Footer bg="info">
                  <small className="text-muted">3d</small>
                </Card.Footer>
              </Card>
              <Card bg="dark" className="ml-1">
                <Card.Header>
                  <FontAwesomeIcon icon={faBasketballBall}/>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Nets 82 - Hawks 113</Card.Title>
                  <Card.Subtitle>Final</Card.Subtitle>
                  <Card.Text></Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">10d</small>
                </Card.Footer>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
          </Col>
        </Row>
      </Container>
    );
  }

} // Home

export default Home;
