import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import "./BookFlight.css"
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import UserNavbar from '../UserNavbar/UserNavbar';
import { Link, useNavigate } from 'react-router-dom';





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
    const [selectedSeat,setSelectedSeat]=React.useState('')
    const [firstName,setFirstName]=React.useState('')
    const [lastName,setLastName]=React.useState('')
    const [passengerEmail,setEmail]=React.useState('')
    const [mileageRewards,setMileageRewards]=React.useState('')
    const [flightID,setFlightID]=React.useState('')
    const [userID,setUserID]=React.useState('')
    const [passengerDetailsStatus,setPassengerDetailsStatus]=React.useState(false)
    const [checkbox,setCheckbox]=React.useState(false)
    const [updatedMileageRewards,setUpdatedMileageRewards]=React.useState(0)
    const [flightBook,setFlightBook]=React.useState(false)

    let navigate = useNavigate();
    

    async function getFlightDetails()

{
    let data={
        flightNumber:getUrl()
    }
    console.log("Printing data",data)
    await axios.post('http://localhost:3001/Booking/getBookedFlight',data).then((response) => {
            console.log('Got details of the current flight', response.data);
            setCurrentFlight(response.data.getFlight)
        });
}


    const getMiles= async (userEmail)=>{
        let data = {
            emailID: userEmail,
        };
        const response = await axios.post('http://localhost:3001/passenger/userDashboardDetails', data);
        console.log("Got miles response",response.data)
        setMileageRewards(response.data.mileageRewards)
        setUserID(userEmail)

    }

     useEffect(() => {
    let userEmail = localStorage.getItem('email');
    console.log("Got useremail",userEmail)
     getFlightDetails()
     getMiles(userEmail)
    
    }, []);

    const handleConfirmFlight=()=>
    {
        
        console.log("Button Clicked")
        setConfirmStatus(true)
        console.log(confirmStatus)
        // setFlightID(currentFlight._id)
        // console.log("Got flight ID here",flightID)
    }

    const sendPassengerDetails = async ()=>
    {
        console.log(selectedSeat)
        console.log("Inside send passenger details")
        console.log("Got first name",firstName)
        console.log("Got last name",lastName)
        console.log("Got passenger email ID",passengerEmail)
        console.log("Got selected seat",selectedSeat)
        console.log("Mileage rewards",mileageRewards)
        console.log("Got flight id",currentFlight._id)
        let data=
        {
            passengerFirstName:firstName,
            passengerLastName:lastName,
            passengerEmailID:passengerEmail,
            seatNumber:selectedSeat,
            mileageRewardsUsed:updatedMileageRewards,
            id:currentFlight._id,
            emailID:userID
        }
        const response = await axios.post('http://localhost:3001/Booking/passengerDetails', data);
        console.log("Got final API response",response.data)
        console.log("Type of seat number",typeof(selectedSeat))
        setPassengerDetailsStatus(true)
    }

    const handleClickCheckbox=()=>
    {
        setCheckbox(true)
        setUpdatedMileageRewards(mileageRewards)
        console.log("Updated Mileage rewards",updatedMileageRewards)
    }

    const handleFinalClick=()=>
    {
        alert("Your flight has been booked!")
        setFlightBook(true)
        navigate('/customerDashboard');
    }


    return (
        <div>
            <UserNavbar/>
            <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>
 {console.log(currentFlight)}
 <div className="reactCard">
 <Card style={{marginLeft:"2%",marginRight:"2%",marginTop:"1%", height:"100px"}}>
 


  <Card.Header as="h5">Flight Number: {currentFlight.flightNumber}</Card.Header>

  

  <Card.Body>
    
  <div className="thisdivcontainer">
    <Card.Title style={{marginTop:"auto"}}> <h3>{currentFlight.origin} - {currentFlight.destination}</h3></Card.Title>
    
    <Card.Title><h5>Departure Time:<br/>{currentFlight.startTime}</h5></Card.Title>
    
    <Card.Title><h5> Arrival Time:<br/>{currentFlight.endTime}</h5></Card.Title>
    
    
    <Button variant="primary" style={{height:"30px",marginLeft:"50px", fontSize:"1.35rem"}} 
    onClick={handleConfirmFlight}>Confirm Flight</Button>
  
    </div>    
  </Card.Body>

  

</Card> 

</div>
{confirmStatus?(<Card style={{marginLeft:"35%",marginRight:"35%",marginTop:"5%", height:"480px",width:"430px"}}>
 


 <Card.Header as="h5"><center>Booking Details</center></Card.Header>

 

 <Card.Body>
   
 <div>
   <Card.Title style={{marginTop:"auto"}}> <h5>Passenger First Name:</h5>
   <input style={{height:"5rem", width:"400px"}} onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}></input>
   </Card.Title>
   
   <Card.Title style={{marginTop:"auto"}}> <h5>Passenger Last Name:</h5>
   <input style={{height:"5rem", width:"400px"}} onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}></input>
   </Card.Title>
   
   
   
   <Card.Title style={{marginTop:"auto"}}> <h5>Passenger Email: </h5>
   <input style={{height:"5rem", width:"400px"}} onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}></input>
   </Card.Title>
   <Card.Title><h5> Select Seat:<br/></h5></Card.Title>
   <Autocomplete
                                        className='searchContainer'
                                        id='combo-box-demo'
                                        options={currentFlight.seatsAvailable}
                                        getOptionLabel={(option) => option}
                                        // style={{ width: "relative" }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                
                                                variant='outlined'
                                                height="2rem"
                                                
                                                InputLabelProps={{ style: { padding: '0px 0px', color: '#555555', fontSize: 11.5 } }}
                                            />
                                        )}
                                        onChange={(event, newValue) => {
                                            setSelectedSeat(newValue);
                                        }}
                                    />
                                    <br/>
                                    
    <input type="checkbox"
    class="largerCheckbox"
    // name={name}
    onChange={handleClickCheckbox}
    // checked={checked}    
  />
  {/* {console.log("Got miles info",mileageRewards)} */}
  <label variant="primary" style={{marginLeft:"15px", marginTop:"1px", fontSize:"1.6rem"}}>Select checkbox to avail ${mileageRewards} Mileage Rewards!</label>

   
   <Button variant="primary" style={{height:"30px",marginRight:"20px",marginLeft:"145px", marginTop:"30px", fontSize:"1.35rem"}} 
   onClick={sendPassengerDetails}>Confirm Details</Button>
 
   </div> 
 </Card.Body>

 

</Card>):''}
{console.log(passengerDetailsStatus)}
{passengerDetailsStatus?(<Card style={{marginLeft:"35%",marginRight:"35%",marginTop:"5%", height:"230px",width:"430px"}}>
 


 <Card.Header as="h5"><center>Confirm Payment</center></Card.Header>

 

 <Card.Body>
   
 <div>
   
   
 <center><Card.Title style={{marginTop:"auto"}}> <h3>Price of the Flight: ${currentFlight.price}</h3></Card.Title></center>
 <br/>
 
 <center><Card.Title style={{marginTop:"auto"}}> <h3>Mileage Rewards Used: ${updatedMileageRewards}</h3></Card.Title></center>
<br/>

 <center><Card.Title style={{marginTop:"auto"}}> <h3>Final Amount to Pay: ${currentFlight.price-updatedMileageRewards}</h3></Card.Title></center>
   
   <Button variant="primary" style={{height:"30px",marginRight:"20px",marginLeft:"155px", marginTop:"20px", fontSize:"1.35rem"}} 
   onClick={handleFinalClick}>Pay Now</Button>
 
   </div> 
 </Card.Body>

 

</Card>):''}
</div>
    ) 
}

export default BookFlight;