import bg_image from "../../images/254381.jpeg";
import React from 'react';
import Cards from "../Cards/Cards"
import AdminCard from "../Cards/AdminCard"
import { Row, Col, Alert, Container } from "react-bootstrap";
import { ClassNames } from "@emotion/react";
import Grid from "@mui/material/Grid";
import "./Landing.css"


function Landing() {
    return (
            <div className="center">
           <Grid container spacing={4}>
           <Grid item xs={6}>
               <Cards/>
            </Grid>
            <Grid item xs={6}>
               <AdminCard/>
            </Grid>
            </Grid>
            </div>
       
    );
}

export default Landing;