import bg_image from "../../images/254381.jpeg";
import React from 'react';
import Cards from "../Cards/Cards"
import AdminCard from "../Cards/AdminCard"
import { Row, Col, Alert, Container } from "react-bootstrap";

function Landing() {
    return (
        <div>
        {/* <div styles={{ backgroundImage: `url(${bg_image})` }}></div> */}
    <div class="Row">
    <div class="Column"><Cards/></div>
    <div class="Column"><AdminCard/></div>
    </div>
        </div>
    );
}

export default Landing;