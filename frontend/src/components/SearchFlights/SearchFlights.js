import UserNavbar from '../UserNavbar/UserNavbar';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './SearchFlights.css';
import { border, fontSize, margin } from '@mui/system';

import { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import bg_image from '../../images/254381.jpeg';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

// Material UI

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DatePicker from "react-datepicker";

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: '200pt',
    },
    table: {
        fontSize: '200pt',
    },
    tablecell: {
        fontSize: '40pt',
    },
    root: {
        '& .Autocomplete': {
            border: '2px solid grey',
            minHeight: 400,
            color: 'green',
            fontSize: 18,
            //hover discussed above
            '& li': {
                //list item specific styling
                border: '2px solid green',
                borderRadius: 4,
            },
        },
    },
}));



function SearchFlights(props) {
    const [airportList, setAirports] = React.useState([]);
    const [selectedAirport, setSelectedAirport] = React.useState('');
    const [updatedAirportList, setUpdatedAirportList] = React.useState([]);
    const [origin, setOrigin] = React.useState('');
    const [destination, setDestination] = React.useState('');
    const [date, setDate] = React.useState('');
    const [resultFlights, setResultFlights] = React.useState('');
    const [searchFlightFlag, setSearchFlightFlag] = React.useState(false);
    const now = new Date();
const min = now;
const max = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());


    const classes = useStyles();

    const navigate = useNavigate();

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

    const today = new Date()

    function disablePastDate()  {
        const today = new Date();
        
        const dd = String(today.getDate()).padStart(2, '0');
        
        const mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        // return yyyy + '-' + mm + '-' + dd;
        var result=yyyy + '-' + mm + '-' + dd;
        return result
    };

    function convertUTCDateToLocalDate(date) {
        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();

        newDate.setHours(hours - offset);

        return newDate;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        var data = {
            origin: origin,
            destination: destination,
            date: date,
        };
        console.log('Printing data', data);

        axios.post('http://localhost:3001/Booking/search', data).then((response) => {
            console.log('Got response data', response.data.flightSchema);
            console.log("RES",response.status)
            if(response.status==202)
            {
                alert("No Flights Exist!")
                window.location.reload()
            }
            else{
            setResultFlights(response.data.flightSchema);
            setSearchFlightFlag(true);
            }
        });
    };

    function past(){
        var dtToday = new Date();
        
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();
        
        var minDate= year + '-' + month + '-' + day;
        
        return minDate
    }

    function convertTime(inputTime)
    {
      var myDate1 = new Date(inputTime)
      inputTime = myDate1.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
        // console.log(inputTime)
        var now = new Date(inputTime);
        // console.log(now.toString())
        return now.toString()
    }
    

    const createFlightRow = (row, index) => {
        
         

        return (
            // <TableBody>
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    {row.flightNumber}
                </TableCell>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    {row.origin}
                </TableCell>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    {row.destination}
                </TableCell>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    {convertTime(row.startTime)}
                </TableCell>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    {convertTime(row.endTime)}
                </TableCell>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    $ {row.price}
                </TableCell>
                <TableCell align='center'>
                    <Button
                        onClick={() =>
                            navigate({
                                pathname: `/bookFlight/${row.flightNumber}`,
                                state: { ...row.flightNumber },
                            })
                        }
                    >
                        Book Now
                    </Button>
                </TableCell>
            </TableRow>
        
            // </TableBody>
        );
    };

    return (
        <div className='searchFlightsBody'>
            <UserNavbar />
            <div>
                <div className='loginContainer'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <center><h4 data-testid='LoginTest' style={{ color: 'black', fontSize: 25, marginBottom: 22 }}>
                                BOOK A FLIGHT
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
                                </div>
                                <label for='deptime'>Departure Date:</label>
                                <br></br>
                                <input type="date" id="txtDate" min={past()}/>
                                
                                <br></br>
                                <br></br>
                                <center>
                                    <button class='btn' onClick={handleSubmit} style={{ backgroundColor: 'green', color: 'white' }}>
                                        SEARCH FLIGHTS
                                    </button>
                                </center>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <br></br>
            {console.log(resultFlights)}
            {resultFlights ? (
                <TableContainer component={Paper} className='tableDetails'>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table' className={classes.table}>
                        <TableHead>
                            <TableRow class='tablecell'>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    Flight Number
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    Origin
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    Destination
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    Departure Time
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    Arrival Time
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    Price
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    Book Flight
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody align='center' style={{ fontWeight: 'bold', fontSize: 16 }}>
                            {resultFlights ? [resultFlights.map(createFlightRow)] : ''}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                ''
            )}
        </div>
    );
}

export default SearchFlights;
