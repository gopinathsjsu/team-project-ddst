import UserNavbar from '../UserNavbar/UserNavbar';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { border, fontSize, margin } from '@mui/system';

import { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import bg_image from '../../images/254381.jpeg';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import backendServer from "../../../src/webConfig" 

// Material UI

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AdminNavbar from '../AdminNavbar/AdminNavbar';

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
    const [flightList, setFlightList] = React.useState([]);
    const [selectedFlightNumber, setSelectedFlightNumber] = React.useState([]);
    const [currentState, setCurrentState] = React.useState('');
    

    let navigate = useNavigate();

    const classes = useStyles();

    const handleDelete = (value) => {
        console.log(value);
        const data = {
            id: value,
        };
        console.log(data);
        axios.post(`${backendServer}/admin/deleteFlight`, data).then((response) => {
            console.log('Got response data', response.data);
            setCurrentState('Deleted');
            
        });
    };

    useEffect(() => {
        axios.get(`${backendServer}/admin/getAllFlights`).then((response) => {
            console.log('Got response data', response.data);
            setFlightList(response.data);
            
        });
    }, []);

    function convertTime(inputTime)
    {
      var myDate1 = new Date(inputTime)
      inputTime = myDate1.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
        console.log(inputTime)
        var now = new Date(inputTime);
        console.log(now.toString())
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
                <TableCell align='center'>
                    <Button
                        style={{fontWeight:"bold"}}
                        variant='danger'
                        onClick={(e) => {
                            {
                                handleDelete(row._id);
                            }
                            window.location.reload();
                        }}
                    >
                        Delete Flight
                    </Button>
                </TableCell>
            </TableRow>
            // </TableBody>
        );
    };

    return (
        <div className='searchFlightsBody'>
            <AdminNavbar />
            <div>
                <div className='searchContainer'>
                    <div className='row'>
                        <div className='col-md-4'>
                            {flightList.length>0?(
                            <h4 data-testid='LoginTest' style={{ color: 'black', fontSize: 25, marginBottom: 22, fontWeight:"bold" }}>
                                ALL FLIGHTS
                            </h4>):(<h4 style={{ color: 'black', fontSize: 25, marginBottom: 22, fontWeight:"bold" }}>NO FLIGHTS AVAILABLE!</h4>)}
                        </div>
                    </div>
                </div>
            </div>
            <br></br>

            {flightList.length>0 ? (
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
                                    Book Flight
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody align='center' style={{ fontWeight: 'bold', fontSize: 20 }}>
                            {flightList ? [flightList.map(createFlightRow)] : ''}
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
