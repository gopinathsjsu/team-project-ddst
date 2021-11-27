import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import UserNavbar from '../UserNavbar/UserNavbar';
import bg_image from "../../images/254381.jpeg"
import "./CustomerDashboard.css"
import {Container, Row, Col} from 'react-bootstrap'
import Box from '@mui/material/Box';
import Paper from '@material-ui/core/Paper';

function CustomerDashboard() {

    return (
        <div className="userDashboardBody">
        <UserNavbar/>
        <div className="rectangle">
        <p>You have 0$ Mileage rewards, book flights to earn more rewards!</p>
        </div>
        </div>
        
    );
}

export default CustomerDashboard;