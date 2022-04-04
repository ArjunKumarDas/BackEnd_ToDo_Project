// Primary Libray Import
const express = require('express'); 
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');


// Security Middleware Library Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanatize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');


// Database Library Import
const mongoose = require('mongoose');


// Security Middleware Implemant
app.use(cors());
app.use(helmet());
app.use(mongoSanatize());
app.use(xss());
app.use(hpp());


// BodyParser  Implemant
app.use(bodyParser.json());


// Request Rate Limit
const limiter =rateLimit({window:15*60*1000, max:3000});
app.use(limiter);


// Mongo DB Database Connection
let URI = "mongodb://127.0.0.1:27017/ToDo";
let OPTION = {user: "", pass: ''}
mongoose.connect(URI, OPTION, (error)=>{
    console.log('Connection Success');
    console.log(error);
});


// Routing Implement
app.use("/api/v1", router);


// Undefine Router Implement  
app.use("*", (req, res) =>{
    res.status(404).json({status:"fail", data: "Not Found"})
})


module.exports=app;