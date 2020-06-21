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
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import ToggleButton from "react-bootstrap/ToggleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd, faBasketballBall, faChartBar, faChartPie, faCog, faFileAlt, faFutbol, faHome, faPhotoVideo, faPlay, faPlus, faPowerOff, faRedoAlt, faVideo, faSlidersH, faWifi, faNetworkWired, faTableTennis, faWrench } from "@fortawesome/free-solid-svg-icons";

class Settings extends React.Component {

  constructor() {

    super();

    this.state = {
      themes: "default",
      activeSportKey: 1,
    }

    this.themes = [
      {name: "Default", value: "default"},
      {name: "Dark", value: "dark"},
      {name: "Future", value: "future"},
      {name: "Light", value: "light"},
    ]

  }; // constructor


  updateField = (event) => {
    this.setState({[event.target.name]: event.target.value});
    //this.setActive(event);
  }; // updateField


  handleSelect(selectedKey) {
    this.setState({activeSportKey: selectedKey});
  }; // handleSelect


  render() {
    return (
      <Container fluid className="mt-3">
        <Row className="mt-2">
          <Col xl={12}>
            <Button variant="outline-info" type="radio" href="/home">
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
            <Button active variant="outline-info" type="radio" className="ml-1" href="/settings">
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
        <Row className="mt-5">
          <Col xl={12}>
          <CardGroup>
              <Card bg="dark">
                <Card.Header>Network</Card.Header>
                <Card.Body>
                  <Card.Title>
                    <FontAwesomeIcon className="mr-2" icon={faNetworkWired}/>
                    Wired</Card.Title>
                  <Card.Subtitle className="text-info">
                    10.10.0.1
                    <Card.Link className="ml-2" href="/game/352">
                      <FontAwesomeIcon icon={faWrench}/>
                    </Card.Link>
                  </Card.Subtitle>
                  <Card.Text></Card.Text>
                </Card.Body>
                <Card.Body>
                  <Card.Title>
                    <FontAwesomeIcon className="mr-2" icon={faWifi}/>
                    Wireless
                  </Card.Title>
                  <Card.Subtitle className="text-info">
                    10.45.0.1
                    <Card.Link className="ml-2" href="/game/352">
                      <FontAwesomeIcon icon={faWrench}/>
                    </Card.Link>
                  </Card.Subtitle>
                  <Card.Text></Card.Text>
                </Card.Body>
                <Card.Body>
                  <Card.Title>SSID</Card.Title>
                  <Card.Subtitle className="text-info">
                    mboard
                    <Card.Link className="ml-2" href="/game/352">
                      <FontAwesomeIcon icon={faWrench}/>
                    </Card.Link>
                  </Card.Subtitle>
                  <Card.Text></Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">3s</small>
                </Card.Footer>
              </Card>
              <Card bg="dark" className="ml-1">
                <Card.Header>User interface</Card.Header>
                <Card.Body>
                  <Card.Title>Theme</Card.Title>
                  <Card.Subtitle className="text-info">
                    <ButtonGroup toggle className="mt-1">
                      <ToggleButton checked={(this.state.themes === "default")} type="radio" variant="outline-info" className="rounded mr-1">Default</ToggleButton>
                      <ToggleButton type="radio" variant="outline-info" className="rounded mr-1">Dark</ToggleButton>
                      <ToggleButton type="radio" variant="outline-info" className="rounded mr-1">Future</ToggleButton>
                      <ToggleButton type="radio" variant="outline-info" className="rounded mr-1">Light</ToggleButton>
                    </ButtonGroup>
                  </Card.Subtitle>
                  <Card.Text></Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">5h</small>
                </Card.Footer>
              </Card>
              <Card bg="dark" className="ml-1">
                <Card.Header>Device</Card.Header>
                <Card.Body>
                  <Card.Title>Operations</Card.Title>
                  <Button variant="outline-danger" className="mr-2">
                    <FontAwesomeIcon icon={faRedoAlt}/>
                  </Button>
                  <Button variant="outline-warning" className="mr-2">
                    <FontAwesomeIcon icon={faPowerOff}/>
                  </Button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">17h</small>
                </Card.Footer>
              </Card>
              <Card bg="dark" className="ml-1">
                <Card.Header>Upgrade</Card.Header>
                <Card.Body>
                  <Card.Title>Version</Card.Title>
                  <Card.Subtitle>1.0.6</Card.Subtitle>
                  <Button variant="outline-success" className="mt-3">Check for update</Button>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">17h</small>
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

} // Settings

export default Settings;
