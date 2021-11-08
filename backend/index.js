var express = require("express");
var app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const passenger = require("./routes/Passenger");
const admin = require("./routes/Admin");
const booking = require("./routes/Booking");


app.use(express.json());
// use cors to allow cross origin resource sharing
app.use(cors({origin: "http://localhost:3000", credentials: true}));

const DB='mongodb+srv://ddst:FPlaza@airplanesystem.jqb2s.mongodb.net/Airplane_System?retryWrites=true&w=majority'

mongoose.connect(DB,
	{ useNewUrlParser: true }
	).then(()=>{
	console.log("Connection established");
}).catch((error)=>  console.log(error));

app.use(express.json());

app.use("/passenger", passenger);
app.use("/admin", admin);
app.use("/booking", booking);
 
console.log("Hello World");

app.listen(3001);
console.log("Server Listening on port 3001");

module.exports=app;