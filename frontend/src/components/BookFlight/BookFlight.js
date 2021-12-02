import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Container, Button, Form, Row, Col, Card } from 'react-bootstrap';

const getUrl = () => {
    console.log(window.location.href);
    let id = window.location.href.substring(33);
    console.log(id);
    localStorage.setItem('flightID', id);
    return parseInt(id);
};

console.log(getUrl());

function BookFlight(props) {
    const [currentFlight, setCurrentFlight] = React.useState([]);

    const getFlightDetails = () => {
        let data = {
            flightNumber: getUrl(),
        };
        console.log('Printing data', data);
        axios.post('http://localhost:3001/Booking/getBookedFlight', data).then((response) => {
            console.log('Got details of the current flight', response.data);
            setCurrentFlight(response.data);
        });
    };

    useEffect(() => {
        getFlightDetails();
    }, []);

    return <div></div>;
}

export default BookFlight;
