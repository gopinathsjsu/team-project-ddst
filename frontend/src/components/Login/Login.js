import React from 'react';
import { Grid, makeStyles, Card, CardContent, MenuItem, InputLabel, Select, CardActions, Button, CardHeader, FormControl } from '@material-ui/core';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';
import '../Register/Register.css';
import './Login.css'

const useStyle = makeStyles((theme) => ({
    padding: {
        padding: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

//Data
const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};




const Login = () => {
    const classes = useStyle();

    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <div>
            <Grid container justify='center' spacing={1} className="loginGrid">
                <Grid item md={6}>
                    <Card className={classes.padding}>
                        <CardHeader title='ADMIN LOGIN'></CardHeader>
                        <Formik initialValues={initialValues}  onSubmit={onSubmit}>
                            {({ dirty, isValid, values, handleChange, handleBlur }) => {
                                return (
                                    <Form>
                                        <CardContent>
                                            <Grid item container spacing={5} justify='center'>
                                                <Grid item xs={12}>
                                                    <Field
                                                        label='Email'
                                                        variant='outlined'
                                                        fullWidth
                                                        name='email'
                                                        value={values.email}
                                                        component={TextField}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        label='Password'
                                                        variant='outlined'
                                                        fullWidth
                                                        name='password'
                                                        value={values.password}
                                                        type='password'
                                                        component={TextField}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                disabled={!dirty || !isValid}
                                                variant='contained'
                                                color='primary'
                                                type='Submit'
                                                className={classes.button}
                                            >
                                             LOGIN
                                            </Button>
                                        </CardActions>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;

