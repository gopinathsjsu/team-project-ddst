import UserNavbar from '../UserNavbar/UserNavbar';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import "./SearchFlights.css"
import { border, margin } from '@mui/system';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import bg_image from '../../images/254381.jpeg';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import { Link, useNavigate } from 'react-router-dom';

function SearchFlights(props) {
    const [airportList, setAirports] = React.useState([]);
    const [updatedAirportList, setUpdatedAirportList] = React.useState([]);
    const [origin, setOrigin] = React.useState('');
    const [destination, setDestination] = React.useState('');
    const [ticketCost, setTicketCost] = React.useState('');
    const [departureDate, setDepartureDateTime] = React.useState('');
    const [arrivalDate, setArrivalDateTime] = React.useState('');
    const [flightNumber, setFlightNumber] = React.useState('');
    const [miles, setMiles] = React.useState('');

    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/admin/getAirportNames').then((response) => {
            console.log('Got list of all airports', response.data);
            setAirports(response.data);
        });
    }, []);

   

    const handleSelectedValue = (value) => {
        console.log('Got Selected Value', value);

        console.log('Selected origin airport', value);
        for (let i = 0; i < airportList.length; i++) {
            if (airportList[i] == value) {
                continue;
            }
            updatedAirportList[i] = airportList[i];
        }
        let filteredList = updatedAirportList.filter((n) => n);
        console.log('Printing updated list', filteredList);
        setUpdatedAirportList(filteredList);
    };




    const handleSubmit = (e) => {
        e.preventDefault();

        var data = {
            origin: origin,
            destination: destination,
            flightNumber: parseInt(flightNumber),
            numberOfMiles: parseInt(miles),
            startTime: departureDate,
            endTime: arrivalDate,
            price: ticketCost,
        };
        console.log('Printing data', data);

        axios.post('http://localhost:3001/admin/addFlights', data).then((response) => {
            console.log('STATUS', response.status);
            if (response.status == 202) {
                console.log('Flight already there');
                alert('Flight Already exists!');
            }
            console.log('Got response data', response.data);
            alert('Flight created successfully!');
            window.location.reload();
        });
    };

    return (
        <div className='searchFlightsBody'>
            <AdminNavbar />
            <div className='loginContainer'>
                <div className='row'>
                    <div className='col-md-4'>
                        <center><h4 data-testid='LoginTest' style={{ color: 'black', fontSize: 25, marginBottom: 22, fontWeight:"bold" }}>
                            ADD A FLIGHT
                        </h4></center>
                        <form onSubmit={handleSubmit}>
                            <div class='form-group inputLogin' style={{ color: 'black' }}>
                                <label for='exampleInputPassword1'>Origin</label>
                                <Autocomplete
                                    className='searchContainer'
                                    id='combo-box-demo'
                                    options={airportList}
                                    getOptionLabel={(option) => option}
                                    // style={{ width: "relative" }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label='Origin'
                                            variant='outlined'
                                            InputLabelProps={{ padding: '0px 0px', color: '#555555', style: { fontSize: 11.5 } }}
                                        />
                                    )}
                                    onChange={(event, newValue) => {
                                        setOrigin(newValue);
                                        handleSelectedValue(newValue);
                                        console.log(origin);
                                    }}
                                />
                                <br></br>
                                <label for='exampleInputPassword1'>Destination</label>
                                <Autocomplete
                                    className='searchContainer'
                                    id='combo-box-demo'
                                    options={updatedAirportList}
                                    getOptionLabel={(option) => option}
                                    // style={{ width: "relative" }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label='Destination'
                                            variant='outlined'
                                            InputLabelProps={{ style: { padding: '0px 0px', color: '#555555', fontSize: 11.5 } }}
                                        />
                                    )}
                                    onChange={(event, newValue) => {
                                        setDestination(newValue);
                                        console.log(destination);
                                    }}
                                />
                                <br></br>
                                <label for='exampleInputEmail1'>Flight Number</label>
                                <input
                                    type='number'
                                    class='form-control'
                                    id='number'
                                    placeholder='Enter Flight Number'
                                    onChange={(e) => {
                                        setFlightNumber(e.target.value);
                                    }}
                                />
                            </div>
                            <div class='form-group inputLogin' style={{ color: 'black' }}>
                                <label for='exampleInputPassword1'>Miles</label>
                                <input
                                    type='number'
                                    class='form-control'
                                    id='number'
                                    placeholder='Enter Miles'
                                    onChange={(e) => {
                                        setMiles(e.target.value);
                                    }}
                                />
                            </div>
                            <div class='form-group inputLogin' style={{ color: 'black' }}>
                                <label for='exampleInputPassword1'>Ticket Cost</label>
                                <input
                                    type='number'
                                    class='form-control'
                                    id='number'
                                    placeholder='Enter Ticket Cost'
                                    onChange={(e) => {
                                        setTicketCost(e.target.value);
                                    }}
                                />
                            </div>
                            <label for='deptime'>Departure Date:</label>
                            <br></br>
                            <input
                                type='datetime-local'
                                id='deptime'
                                name='deptime'
                                onChange={(e) => {
                                    setDepartureDateTime(e.target.value);
                                }}
                            ></input>
                            <br></br>
                            <br></br>

                            <label for='arrtime'>Arrival Date:</label>
                            <br></br>
                            <input
                                type='datetime-local'
                                id='arrtime'
                                name='arrtime'
                                
                                onChange={(e) => {
                                    setArrivalDateTime(e.target.value);
                                }}
                            ></input>
                            <br></br>
                            <br></br>
                            <center>
                                <button class='btn' style={{ backgroundColor: 'green', color: 'white' }}>
                                    Add Flight
                                </button>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchFlights;
