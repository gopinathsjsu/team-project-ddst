import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import UserNavbar from '../UserNavbar/UserNavbar';
import bg_image from '../../images/254381.jpeg';
import './CustomerDashboard.css';
import { Container, Row, Col } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Paper from '@material-ui/core/Paper';
import { useEffect, useState } from "react";

let userEmail=localStorage.getItem('email')



function CustomerDashboard() {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [mileagePoints, setMileagePoints] = React.useState('');
    
    useEffect(() => {
        let data={
            emailID:userEmail
        }
        axios.post("http://localhost:3001/passenger/userDashboardDetails",data).then((response)=>
    {
    console.log("Got passenger details",response.data)
    setFirstName(response.data.firstName)
    setLastName(response.data.lastName)
    setMileagePoints(response.data.mileageRewards)
    }
    );

    })



    return (
        <div className='userDashboardBody'>
            <UserNavbar />
            {/* <div className="displayDetails"> 
            <p>Welcome {firstName} {lastName}!</p>
            </div> */}
            <div className='rectangle'>
                <p>Hello {firstName} {lastName}! You have ${mileagePoints} Mileage rewards, book flights to earn more rewards!</p>
            </div>
        </div>
    );
}

export default CustomerDashboard;
