import React from 'react';
import { Grid, makeStyles, Card, CardContent, MenuItem, InputLabel, Select, CardActions, Button, CardHeader, FormControl } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';
import './Register.css';
import bg_image from "../../images/254381.jpeg"
import axios from 'axios';

const useStyle = makeStyles((theme) => ({
    padding: {
        padding: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
    },
}));




const UserForm = () => {
    const classes = useStyle();
    const [firstName,setFirstName]=React.useState("");
    const [lastName,setLastName]=React.useState("");
    const [password,setPassword]=React.useState("");
    const [email,setEmail]=React.useState("");

    const handleFirstName = (value) => {
        console.log("Got First Name",value);
        setFirstName(value)
      };
    
    const handleLastName = (value) => {
        console.log("Got Last Name",value);
        setLastName(value)
      };
      
    const handlePassword = (value) => {
        console.log("Got Password",value);
        setPassword(value)
      };
    
    const handleEmail = (value) => {
        console.log("Got Email",value);
        setEmail(value)
      };
    

    const onSubmit = (values) => {
        console.log(values);
    };



    return (
        <div className="registerBody" style={ {backgroundImage: `url(${bg_image})`,backgroundSize:'cover'}}>
        <div className="thiscontainer">
        <div className="row">
          <div className="col-md-4">
            <h4 data-testid="LoginTest" style={{ color: "black", fontSize: 25, marginBottom: 22 }}>
              WELCOME TO JET AIRWAYS!
            </h4>
            <form>
            <div class="form-group inputLogin" style={{ color: "black"}}>
                <label for="firstName">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="fName"
                  placeholder="Enter First Name"
                  
                />
              </div>

            
              <div class="form-group inputLogin" style={{ color: "black"}}>
                <label for="lastName">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="fName"
                  placeholder="Enter Last Name"
                  
                />
              </div>

              <div class="form-group inputLogin" style={{ color: "black"}}>
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                
                />
              </div>
              <div class="form-group inputLogin" style={{ color: "black"}}>
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <center><button class="btn">
                SIGN UP
              </button></center>
            </form>
          </div>
        </div>
        </div>
        </div>
    );
};

export default UserForm;
