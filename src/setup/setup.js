import React from 'react';
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import QRCode from "qrcode.react";


class Setup extends React.Component {
    render() {
      return (
        <Container fluid>
          <Jumbotron>
            <h1 className="extra-big">mboard
            <QRCode value="http://10.0.1.24" size="1024" className="float-right"/></h1>
            <h1 className="medium">a digital scoreboard</h1>
            <h2>madsportslab</h2>

          </Jumbotron>
        </Container>

      );
    }
} // Setup

export default Setup;