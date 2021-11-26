import React from "react";
import { render } from "react-dom";
import { Card, ListGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import '../Cards/Cards.css'

function Card2() {
  return (
    <div id="small2">
      <Card style={{ width: '400px', height: '350px', margin:'30px 0px 0px 40px', 
      border: '1px solid rgba(0, 0, 0, 0.15)'
       }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Login</Button>
          <Button variant="primary">Sign Up</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Card2;
