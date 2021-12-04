import React from 'react';
import bg_image from '../../images/254381.jpeg';
import './Login.css';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CommonNavbar from '../CommonNavbar/CommonNavbar';
import backendServer from "../../../src/webConfig" 


function Login() {
    let navigate = useNavigate();
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`
        Email: ${email}
        Password: ${password}
      `);

        var data = {
            emailID: email,
            password: password,
        };
        console.log('Printing data', data);

        axios.post(`${backendServer}/passenger/login`, data).then((response) => {
            console.log('Got response data', response.data);
            localStorage.setItem('email', email);
            navigate('/customerDashboard');
        });
    };

    return (
        <div className='loginBody' style={{ backgroundImage: `url(${bg_image})`, backgroundSize: 'cover' }}>
            <CommonNavbar />
            <div className='loginContainer'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h4 data-testid='LoginTest' style={{ color: 'black', fontSize: 25, marginBottom: 22, fontWeight:"bold" }}>
                            WELCOME TO JET AIRWAYS!
                        </h4>
                        <form onSubmit={handleSubmit}>
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
                            <center>
                                <button class='btn' style={{ backgroundColor: '#1976d2', color: 'white' }}>LOGIN</button>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
