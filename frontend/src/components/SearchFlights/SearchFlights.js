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
import { Link,useNavigate } from 'react-router-dom';


// Material UI

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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

const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
};

function SearchFlights(props) {
    const [airportList, setAirports] = React.useState([]);
    const [selectedAirport, setSelectedAirport] = React.useState('');
    const [updatedAirportList, setUpdatedAirportList] = React.useState([]);
    const [origin, setOrigin] = React.useState('');
    const [destination, setDestination] = React.useState('');
    const [date, setDate] = React.useState('');
    const [resultFlights, setResultFlights] = React.useState('');
    const [searchFlightFlag, setSearchFlightFlag] = React.useState(false);

    

    const classes = useStyles();

    const navigate=useNavigate();

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
            date: date,
        };
        console.log('Printing data', data);

        axios.post('http://localhost:3001/Booking/search', data).then((response) => {
            console.log('Got response data', response.data.flightSchema);
            setResultFlights(response.data.flightSchema);
            setSearchFlightFlag(true);
        });
    };

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
                    {row.startTime}
                </TableCell>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    {row.endTime}
                </TableCell>
                <TableCell align='center' style={{ fontSize: 15 }}>
                    $ {row.price}
                </TableCell>
                <TableCell align='center'>
                    <Button onClick={() => navigate({
                                            pathname: `/bookFlight/${row.flightNumber}`,
                                            state: {...row.flightNumber}
                                        })}>Book Now</Button>
                </TableCell>
            </TableRow>
            // </TableBody>
        );
    };

    //    const createTableHead =()=>
    // {
    //         console.log("Creating table head")
    //         return
    //         <TableContainer component={Paper}>
    //             <Table sx={{ minWidth: 650}} aria-label="simple table" className={classes.table}>
    //             <TableHead>
    //             <TableRow>
    //             <TableCell align="center">Flight Number</TableCell>
    //                 <TableCell align="center">Origin</TableCell>
    //                 <TableCell align="center">Destination</TableCell>
    //                 <TableCell align="center">Departure Time</TableCell>
    //                 <TableCell align="center">Arrival Time</TableCell>
    //                 <TableCell align="center">Price</TableCell>
    //                 <TableCell align="center">Book Flight</TableCell>
    //             </TableRow>
    //             </TableHead>
    //             </Table>
    //     </TableContainer>
    //     }

    return (
        <div className='searchFlightsBody'>
            <UserNavbar />
            <div>
            <div className='loginContainer'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h4 data-testid='LoginTest' style={{ color: 'black', fontSize: 25, marginBottom: 22 }}>
                            BOOK A FLIGHT
                        </h4>
                        <form onSubmit={handleSubmit}>
                            <div class='form-group inputLogin' style={{ color: 'black' }}>
                            <label for='exampleInputPassword1'>Origin</label>
                            <Autocomplete className="searchContainer"
                                id="combo-box-demo"
                                options={airportList}
                                getOptionLabel={(option) => option}
                                // style={{ width: "relative" }}
                                renderInput={(params) => <TextField {...params} label="Origin" variant="outlined" InputLabelProps={{padding:'0px 0px',color: '#555555', style: {fontSize: 11.5}}}/>}
                                onChange={(event, newValue) => {
                                    setOrigin(newValue);
                                    handleSelectedValue(newValue);
                                    console.log(origin)
                                }}
                                />
                                <br></br>
                                <label for='exampleInputPassword1'>Destination</label>
                                <Autocomplete className="searchContainer"
                                id="combo-box-demo"
                                options={updatedAirportList}
                                getOptionLabel={(option) => option}
                                // style={{ width: "relative" }}
                                renderInput={(params) => <TextField {...params} label="Destination" variant="outlined" InputLabelProps={{style: {padding:'0px 0px',color: '#555555',fontSize: 11.5}}}/>}
                                onChange={(event, newValue) => {
                                    setDestination(newValue);
                                    console.log(destination)
                                }}
                                />
                                <br></br>
                            
                            </div>
                                <label for="deptime">Departure Date:</label><br></br>
                                <input
                                    type='date'
                                    min={disablePastDate()}
                                    onChange={(event, newValue) => {
                                        setDate(event.target.value);
                                        console.log(event.target.value);
                                    }}
                                ></input><br></br><br></br>
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
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 20 }}>
                                    Flight Number
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 20 }}>
                                    Origin
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 20 }}>
                                    Destination
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 20 }}>
                                    Departure Time
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 20 }}>
                                    Arrival Time
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 20 }}>
                                    Price
                                </TableCell>
                                <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 20 }}>
                                    Book Flight
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody align='center' style={{ fontWeight: 'bold', fontSize: 20 }}>
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
