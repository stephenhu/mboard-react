import React from "react";
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

class GameClock extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col xl={12}>
            <h1 className="hella-big shade green text-center">11:59</h1>
          </Col>
        </Row>
      </Container>
    );
  }
} // GameClock

export default GameClock;
