var express = require("express");
var app = express();
const mongoose = require('mongoose');
const cors = require('cors');


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
 
console.log("Hello World");