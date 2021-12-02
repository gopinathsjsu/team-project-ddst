import React from 'react';
import { Grid, makeStyles, Card, CardContent, MenuItem, InputLabel, Select, CardActions, Button, CardHeader, FormControl } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';
import './Register.css';
import bg_image from '../../images/254381.jpeg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonNavbar from '../CommonNavbar/CommonNavbar';

const UserForm = () => {
    // const classes = useStyle();
    let navigate = useNavigate();
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`
      FirstName: ${firstName}
      LastName: ${lastName}
      Email: ${email}
      Password: ${password}
    `);

        var data = {
            firstName: firstName,
            lastName: lastName,
            emailID: email,
            password: password,
        };
        console.log('Printing data', data);

        axios.post('http://localhost:3001/passenger/register', data).then((response) => {
            console.log('Got response data', response.data);
            localStorage.setItem('email', email);
            navigate('/customerDashboard');
        });
    };

    return (
        <div className='registerBody' style={{ backgroundImage: `url(${bg_image})`, backgroundSize: 'cover' }}>
            <CommonNavbar />
            <div className='thiscontainer'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h4 data-testid='LoginTest' style={{ color: 'black', fontSize: 25, marginBottom: 22 }}>
                            WELCOME TO JET AIRWAYS!
                        </h4>
                        <form onSubmit={handleSubmit}>
                            <div class='form-group inputLogin' style={{ color: 'black' }}>
                                <label for='firstName'>First Name</label>
                                <input
                                    type='text'
                                    class='form-control'
                                    id='fName'
                                    placeholder='Enter First Name'
                                    onChange={(e) => {
                                        console.log('Got first name', e.target.value);
                                        setFirstName(e.target.value);
                                    }}
                                />
                            </div>

                            <div class='form-group inputLogin' style={{ color: 'black' }}>
                                <label for='lastName'>Last Name</label>
                                <input
                                    type='text'
                                    class='form-control'
                                    id='fName'
                                    placeholder='Enter Last Name'
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                />
                            </div>

                            <div class='form-group inputLogin' style={{ color: 'black' }}>
                                <label for='exampleInputEmail1'>Email address</label>
                                <input
                                    type='email'
                                    class='form-control'
                                    id='exampleInputEmail1'
                                    aria-describedby='emailHelp'
                                    placeholder='Enter email'
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div class='form-group inputLogin' style={{ color: 'black' }}>
                                <label for='exampleInputPassword1'>Password</label>
                                <input
                                    type='password'
                                    class='form-control'
                                    id='exampleInputPassword1'
                                    placeholder='Password'
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <button class='btn'>SIGN UP</button>
                            <a href='/login' style={{ color: 'black', paddingLeft: '200px', fontSize: '17px', fontWeight: 'bold' }}>
                                Already a member? Click here to login.
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
