import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import UserNavbar from '../UserNavbar/UserNavbar';
import bg_image from '../../images/254381.jpeg';
import './CustomerDashboard.css';
import Box from '@mui/material/Box';
import Paper from '@material-ui/core/Paper';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";


function CustomerDashboard() {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [mileagePoints, setMileagePoints] = React.useState('');
    const [userReservations, setUserReservation] = React.useState([]);
    
    

    const getDashboard = async (userEmail) => {
        let data = {
            emailID: userEmail,
        };
        const response = await axios.post('http://localhost:3001/passenger/userDashboardDetails', data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setMileagePoints(response.data.mileageRewards);
    };

    const getUserBookedFlights=async (userEmail)=>
    {
        let data = {
            emailID: userEmail,
        };
        const response = await axios.post('http://localhost:3001/Passenger/userBookings', data);
        console.log("Got flights reserved",response.data.userBookings)
        setUserReservation(response.data.userBookings)
        
    }

    const handleCancelReservation=(passengerEmailID,seatNumber,bookingID,flightNumber,parentEmailID)=>
    {
        console.log("Inside cancel reservation")
        console.log(passengerEmailID)
        console.log(seatNumber)
        console.log(bookingID)
        console.log(parentEmailID)
        console.log(flightNumber)
        let data = {
            emailID: parentEmailID,
            seatNumber:seatNumber,
            passengerEmailID:passengerEmailID,
            bookingID:bookingID,
            flightNumber:flightNumber

        };
        axios.post('http://localhost:3001/Booking/cancelReservation', data).then((response) => {
            console.log('Got response data', response.data);
        });
    };
    


    const createUserReservationCards=(row,index)=>
    {
        return(
            
 <Card style={{marginLeft:"2%",marginRight:"2%",marginTop:"1%", height:"100px"}}>
  <Card.Header as="h5">Flight Number: {row.flightNumber}</Card.Header>
  <Card.Body>  
  <div className="customerreservation">
    <Card.Title style={{marginTop:"auto"}}> <h3>{row.origin} - {row.destination}</h3></Card.Title>
    
    <Card.Title><h5>Departure Time:<br/>{row.startTime}</h5></Card.Title>
    
    <Card.Title><h5> Arrival Time:<br/>{row.endTime}</h5></Card.Title>
    
    <Card.Title><h5> Passenger Name:<br/>{row.passengerFirstName+" "+row.passengerLastName}</h5></Card.Title>

    <Card.Title><h5> Seat Number:<br/>{row.seatNumber}</h5></Card.Title>
    
    <Button variant='danger' style={{height:"30px",marginLeft:"50px", fontSize:"1.35rem"}} 
    
    onClick={(e)=>{{
        handleCancelReservation(row.passengerEmailID,row.seatNumber,
            row._id,row.flightNumber
            ,row.parentEmailID)
    }
        window.location.reload()
    }}
    >Cancel Reservation</Button>
  
    </div>    
  </Card.Body>
</Card>
        )
    }

    useEffect(() => {
        let userEmail = localStorage.getItem('email');
        console.log('inside use effect');
        getDashboard(userEmail);
        getUserBookedFlights(userEmail);
        
    }, []);

    console.log(firstName, lastName);

    return (
        <div className='userDashboardBody'>
        <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>
            <UserNavbar />
            {/* <div className="displayDetails"> 
            <p>Welcome {firstName} {lastName}!</p>
            </div> */}
            <div className='rectangle'>
                <p>
                    Hello {firstName} {lastName}! You have ${mileagePoints} Mileage rewards, book flights to earn more rewards!
                </p>
            </div>
            {userReservations.length>0?(<div><br/><br/><h1><center>Your Reservations</center></h1></div>):''}
            {userReservations?([userReservations.map(createUserReservationCards)]):''}
        </div>
    );
}

export default CustomerDashboard;
