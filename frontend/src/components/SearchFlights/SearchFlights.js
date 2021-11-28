import UserNavbar from '../UserNavbar/UserNavbar';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./SearchFlights.css"
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

    useEffect(() => {

        axios.get("http://localhost:3001/admin/getAirportNames").then((response)=>
        {
        console.log("Got list of all airports",response.data)
        setAirports(response.data)
        }
        );
    },[])

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
    return (
        <div className='searchFlightsBody'>
        <UserNavbar />
        <div>
            <div className='searchContainer'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h4 data-testid='LoginTest' style={{ color: 'black', fontSize: 25, marginBottom: 22 }}>
                            BOOK A FLIGHT
                        </h4>
                        <form>



                        <Autocomplete
      id="combo-box-demo"
      options={airportList}
      getOptionLabel={(option) => option}
      style={{ width: 400 }}
      renderInput={(params) => <TextField {...params} label="Origin" variant="outlined" />}
      onChange={(event, newValue) => {
        handleSelectedValue(newValue);
      }}
    />
    <br></br>

<Autocomplete
      id="combo-box-demo"
      options={updatedAirportList}
      getOptionLabel={(option) => option}
      style={{ width: 400 }}
      renderInput={(params) => <TextField {...params} label="Destination" variant="outlined" />}
    //   onChange={(event, newValue) => {
    //     handleChangeActor2(newValue);
    //   }}
    />
    <br></br>
    <label for="deptdate">Departure Date:</label>
    <input type="date">

    </input>
    <br/><br/>
    <label for="arrdate">Arrival Date:</label>
    <input type="date">
    </input>
    <br/><br/>


    
                           

                                <button class='btn'>SEARCH FLIGHTS</button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}


export default SearchFlights;