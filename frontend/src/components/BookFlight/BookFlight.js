import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import "./BookFlight.css"




const getUrl=()=>
{
console.log(window.location.href)
let id=window.location.href.substring(33)
console.log(id)
localStorage.setItem('flightID',id)
return parseInt(id)
}

console.log(getUrl())


function BookFlight(props) {

    const [currentFlight, setCurrentFlight] = React.useState([]);

    async function getFlightDetails()

{
    let data={
        flightNumber:getUrl()
    }
    console.log("Printing data",data)
    await axios.post('http://localhost:3001/Booking/getBookedFlight',data).then((response) => {
            console.log('Got details of the current flight', response.data);
            setCurrentFlight(response.data.getFlight);
        });
}



     useEffect(() => {
     getFlightDetails()
    
    }, []);

    // const flightCard=()=>
    // {
{/* <Card>
  <Card.Header as="h5">Flight Number: {currentFlight.flightNumber}</Card.Header>
  <Card.Body>
    <Card.Title>Special title treatment</Card.Title>
    <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>  */}
   //}


    return (
        <div>
            <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>
 {console.log(currentFlight)}
 <div className="reactCard">
 <Card style={{marginLeft:"2%",marginRight:"2%",marginTop:"5%", height:"100px"}}>
 


  <Card.Header as="h5">Flight Number: {currentFlight.flightNumber}</Card.Header>

  

  <Card.Body>
    
  <div className="thisdivcontainer">
    <Card.Title style={{marginTop:"auto"}}> <h3>{currentFlight.origin} - {currentFlight.destination}</h3></Card.Title>
    
    <Card.Title><h5>Departure Time:<br/>{currentFlight.startTime}</h5></Card.Title>
    
    <Card.Title><h5> Arrival Time:<br/>{currentFlight.endTime}</h5></Card.Title>

    
    <Button variant="primary" style={{height:"30px"}}>Choose Seats</Button>
  
    </div>
    {/* <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text> */}
    
  </Card.Body>

  

</Card> 

</div>
</div>
    ) 
}

export default BookFlight;