import bg_image from '../../images/254381.jpeg';
import React from 'react';
import Cards from '../Cards/Cards';
import AdminCard from '../Cards/AdminCard';
import { Row, Col, Alert, Container } from 'react-bootstrap';
import { ClassNames } from '@emotion/react';
import Grid from '@mui/material/Grid';
import './Landing.css';
import CommonNavbar from '../CommonNavbar/CommonNavbar';

function Landing() {
    return (
        <div className='landingBody' style={{ backgroundImage: `url(${bg_image})`, backgroundSize: 'cover' }}>
            <CommonNavbar></CommonNavbar>
            <Grid container spacing={4}>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}></Grid>
            </Grid>
            
                <div class="cardlanding2 ">
                    <div>
                    <h1 style={{color:"white",fontSize:"30px", textAlign:"center", fontWeight:"bold" }}>WELCOME TO JET AIRWAYS</h1>
                    <h3 style={{color:"white",fontSize:"25px", textAlign:"center", fontWeight:"bold"}}>
                    "When Everything seems to be going against you, remember that aircraft take off against the wind, not with it."
                    </h3>
                    </div>
                
            </div>
        </div>
    );
}

export default Landing;
