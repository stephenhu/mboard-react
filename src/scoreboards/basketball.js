import React from "react";
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Basketball extends React.Component {
    render() {
      return (
        <Container fluid>
          <Row>
            <Col xl={8}>
              <h1 className="too-big shade green text-center">12:00</h1>
            </Col>
            <Col xl={2} className="d-flex align-items-center">
              <h1 className="middle-big shade light-blue">3rd</h1>
            </Col>
            <Col xl={2} className="d-flex align-items-center">
              <h1 className="middle-big text-center shade green">21</h1>
            </Col>
          </Row>
          <Row>
            <Col xl={6}>
              <h1 className="medium text-center shade light-blue">Bulls</h1>
              <h1 className="too-big text-center shade">89</h1>
            </Col>
            <Col xl={6}>
              <h1 className="medium text-center shade light-blue">Jazz</h1>
              <h1 className="too-big text-center shade">84</h1>
            </Col>
          </Row>
          <Row>
            <Col xl={1}>
              <p className="regular light-blue">Fouls</p>
            </Col>
            <Col xl={1}>
              <p className="regular green">9</p>
            </Col>
            <Col xl={2}>
              <p className="regular light-blue float-right">Timeouts</p>
            </Col>
            <Col xl={2} className="d-flex align-items-center">
              <FontAwesomeIcon className="regular green text-right" icon={faCircle}></FontAwesomeIcon>
              <FontAwesomeIcon className="regular green text-right" icon={faCircle}></FontAwesomeIcon>
              <FontAwesomeIcon className="regular green text-right" icon={faCircle}></FontAwesomeIcon>
            </Col>
            <Col xl={1}>
              <p className="regular light-blue">Fouls</p>
            </Col>
            <Col xl={1}>
              <p className="regular green">2</p>
            </Col>
            <Col xl={2}>
              <p className="regular light-blue float-right">Timeouts</p>
            </Col>
            <Col xl={2} className="d-flex align-items-center">
              <FontAwesomeIcon className="regular green text-right" icon={faCircle}></FontAwesomeIcon>
              <FontAwesomeIcon className="regular green text-right" icon={faCircle}></FontAwesomeIcon>
              <FontAwesomeIcon className="regular green text-right" icon={faCircle}></FontAwesomeIcon>
            </Col>
          </Row>
        </Container>

      );
    }
} // Basketball

export default Basketball;
