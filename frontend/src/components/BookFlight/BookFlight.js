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
    const [confirmStatus,setConfirmStatus]=React.useState(false)

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

    const handleConfirmFlight=()=>
    {
        
        console.log("Button Clicked")
        setConfirmStatus(true)
        console.log(confirmStatus)
    }


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
    
    
    <select id="selectNumber">
    <option value="default">Select Number of Seats</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
    <option value="Manually">Manually Enter Seats</option>
</select>
    
    <Button variant="primary" style={{height:"30px",marginLeft:"50px"}} 
    onClick={handleConfirmFlight}>Confirm Flight</Button>
  
    </div>    
  </Card.Body>

  

</Card> 

</div>
{confirmStatus?(<Card style={{marginLeft:"2%",marginRight:"2%",marginTop:"5%", height:"200px"}}>
 


 <Card.Header as="h5"><center>Payment Details</center></Card.Header>

 

 <Card.Body>
   
 <div className="thisdivcontainer">
   <Card.Title style={{marginTop:"auto"}}> <h3>{currentFlight.origin} - {currentFlight.destination}</h3></Card.Title>
   
   <Card.Title><h5>Departure Time:<br/>{currentFlight.startTime}</h5></Card.Title>
   
   <Card.Title><h5> Arrival Time:<br/>{currentFlight.endTime}</h5></Card.Title>
   
   
   <select id="selectNumber">
   <option value="default">Select Number of Seats</option>
   <option value="1">1</option>
   <option value="2">2</option>
   <option value="3">3</option>
   <option value="4">4</option>
   <option value="5">5</option>
   <option value="6">6</option>
   <option value="7">7</option>
   <option value="8">8</option>
   <option value="9">9</option>
   <option value="10">10</option>
   <option value="Manually">Manually Enter Seats</option>
</select>
   
   <Button variant="primary" style={{height:"30px",marginLeft:"50px"}} 
   onClick={handleConfirmFlight}>Confirm Flight</Button>
 
   </div>    
 </Card.Body>

 

</Card>):''}
</div>
    ) 
}

export default BookFlight;