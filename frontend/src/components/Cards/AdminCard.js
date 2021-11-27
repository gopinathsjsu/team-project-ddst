import React from 'react';
import { render } from 'react-dom';
import { Card, ListGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../Cards/Cards.css';
import { Grid } from '@mui/material'

function Card2() {
    return (
        <div id='small2'>
           <Card style={{ width: '400px', height: '300px', margin: '30px 0px 0px 40px', border: '1px solid rgba(0, 0, 0, 1)', fontSize: '20px'}}>
                <Card.Body>
                    <Card.Title style={{fontSize: '25px'}}><center><h1>Admin Login</h1></center></Card.Title>
                    <br/>
                    <Card.Text style={{color:'black', fontWeight:'bold'}}>Are you an admin trying to add flights? Login here to schedule or cancel flights.</Card.Text>
                    <br/>
                    <br/>
                    
                    <Grid container  columns={16}>
                    
                    <Grid item xs={4}>
                    </Grid>
                    
                    <Grid item xs={3}>
                    <Button variant='primary'>Login</Button>
                    </Grid>
                    
                    <Grid item xs={2}>
                    </Grid>


                    <Grid item xs={3}>
                    <Button variant='primary'>Sign Up</Button>
                    </Grid>

                    <Grid item xs={4}>
                    </Grid>
                    
                    </Grid>
                    
                </Card.Body>
            </Card>
        </div>
    );
}

export default Card2;
