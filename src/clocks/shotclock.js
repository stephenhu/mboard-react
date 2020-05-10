import React from "react";
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

class ShotClock extends React.Component {
    render() {
      return (
        <Container fluid>
          <Row>
            <Col xl={12}>
              <h1 className="hella-big shade green text-center">18</h1>
            </Col>
          </Row>
        </Container>
      );
    }
} // ShotClock

export default ShotClock;
