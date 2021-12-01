import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";




const getUrl=()=>
{
console.log(window.location.href)
let id=window.location.href.substring(33)
console.log(id)
localStorage.setItem('flightID',id)
return parseInt(id)
}

console.log(getUrl())


function BookFlight(props) {

    const [currentFlight, setCurrentFlight] = React.useState([]);

    const getFlightDetails=()=>

{
    let data={
        flightNumber:getUrl()
    }
    console.log("Printing data",data)
    axios.post('http://localhost:3001/Booking/getBookedFlight',data).then((response) => {
            console.log('Got details of the current flight', response.data);
            setCurrentFlight(response.data);
        });
}



    useEffect(() => {
        getFlightDetails()
    }, []);


    return (
        <div>
        <Row className="m-4">
				<Card>
					<Card.Header>Hello World</Card.Header>
					<Card.Body>
						<Row>
							<Col xs={10}>
								<Card.Title>
									Hello&emsp;-&emsp;
									Hello
								</Card.Title>
								<Card.Text>
                                Hello
									&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
									Hello
								</Card.Text>
							</Col>
							<Col xs={2} className="px-5">
								<Row className="my-2">
									<Col xs={4}></Col>
									<Col xs={8}>
										<Card.Title>$Hello</Card.Title>
									</Col>
								</Row>
								<Row>
									
								</Row>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Row>   
        </div>
    );
}

export default BookFlight;