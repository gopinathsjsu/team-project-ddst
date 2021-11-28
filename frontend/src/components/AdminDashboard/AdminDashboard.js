import UserNavbar from '../UserNavbar/UserNavbar';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import "./SearchFlights.css"
import { border, margin } from '@mui/system';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import bg_image from '../../images/254381.jpeg';
import axios from 'axios';


function SearchFlights(props) {
    const [airportList, setAirports] = React.useState([]);
    const [selectedAirport, setSelectedAirport] = React.useState("");
    const [updatedAirportList,setUpdatedAirportList]=React.useState([])
    const [origin,setOrigin]=React.useState("")
    const [destination,setDestination]=React.useState("")
    const [date,setDate]=React.useState("")


    useEffect(() => {

        axios.get("http://localhost:3001/admin/getAirportNames").then((response)=>
        {
        console.log("Got list of all airports",response.data)
        setAirports(response.data)
        }
        );
    },[])

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth()).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const handleSelectedValue = (value) => {
        console.log("Got Selected Value",value);
        
        console.log("Selected origin airport",value)
        for(let i=0;i<airportList.length;i++)
        {
            if(airportList[i]==value)
            {
                continue;
            }
            updatedAirportList[i]=airportList[i];
        };
        let filteredList=updatedAirportList.filter(n=>n)
        console.log("Printing updated list",filteredList)
        setUpdatedAirportList(filteredList)
    }


    const handleSubmit=(e)=>
    {
        e.preventDefault();

        var data = {
            origin: origin,
            destination: destination,
            date:date
        };
        console.log('Printing data', data);

    //     axios.post('http://localhost:3001/admin/adminLogin', data).then((response) => {
    //         console.log('Got response data', response.data);
    //     });
    // };
    }
    return (
        <div className='searchFlightsBody'>
            <UserNavbar />
            <div className='loginContainer'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h4 data-testid='LoginTest' style={{ color: 'black', fontSize: 25, marginBottom: 22 }}>
                            ADD A FLIGHT
                        </h4>
                        <form onSubmit={handleSubmit}>
                            <div class='form-group inputLogin' style={{ color: 'black' }}>
                            <label for='exampleInputPassword1'>Origin</label>
                            <Autocomplete className="searchContainer"
                                id="combo-box-demo"
                                options={updatedAirportList}
                                getOptionLabel={(option) => option}
                                // style={{ width: "relative" }}
                                renderInput={(params) => <TextField {...params} label="Origin" variant="outlined" />}
                                onChange={(event, newValue) => {
                                    setDestination(newValue);
                                }}
                                />
                                <br></br>
                                <label for='exampleInputPassword1'>Destination</label>
                                <Autocomplete className="searchContainer"
                                id="combo-box-demo"
                                options={updatedAirportList}
                                getOptionLabel={(option) => option}
                                // style={{ width: "relative" }}
                                renderInput={(params) => <TextField {...params} label="Destination" variant="outlined" />}
                                onChange={(event, newValue) => {
                                    setDestination(newValue);
                                }}
                                />
                                <br></br>
                                <label for='exampleInputEmail1'>Flight Number</label>
                                <input
                                    type='number'
                                    class='form-control'
                                    id='number'
                                    placeholder='Enter Flight Number'
                                    // onChange={(e) => {
                                    //     setEmail(e.target.value);
                                    // }}
                                />
                            </div>
                            <div class='form-group inputLogin' style={{ color: 'black' }}>
                                <label for='exampleInputPassword1'>Miles</label>
                                <input
                                    type='number'
                                    class='form-control'
                                    id='number'
                                    placeholder='Enter Miles'
                                    // onChange={(e) => {
                                    //     setPassword(e.target.value);
                                    // }}
                                />
                            </div>
                                <div class='form-group inputLogin' style={{ color: 'black' }}>
                                <label for='exampleInputPassword1'>Ticket Cost</label>
                                <input
                                    type='number'
                                    class='form-control'
                                    id='number'
                                    placeholder='Enter Ticket Cost'
                                    // onChange={(e) => {
                                    //     setPassword(e.target.value);
                                    // }}
                                />
                            </div>
                                <label for="deptime">Departure Date:</label><br></br>
                                    <input type="datetime-local" id="deptime" name="deptime"></input><br></br><br></br>
                                <label for="arrtime">Arrival Date:</label><br></br>
                                    <input type="datetime-local" id="arrtime" name="arrtime"></input><br></br>
                                <br></br>
                            <center>
                                <button class='btn'>Add Flight</button>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SearchFlights;