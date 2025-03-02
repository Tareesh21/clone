// The ride is only created by the user....i.e., the user has to be authenticated....i.e., we are creating a middleware.
// Two types of commun b/w micro-services...i.e., asynchronous and synchronous....here we use rabbitmq for asynchronous commun
// We have used concept of long polling in captain service....i.e., main concpet....send the response (data)
//  when there is a new-ride from captain service...Now when a ride is created in the ride service, then the async commun b/w ride and captain gets happened
//...here long polling is also used in user service ...so after accepting the ride in the captain service....the userservice long polling gets completed.

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const connect = require('./db/db');
connect();
const cookieParser = require('cookie-parser');
const rideRoutes = require('./routes/ride.routes');
const rabbitMq = require('./service/rabbit')

//If we are communicating between any micor-services we need to first connect to the rabbitMQ, hence also connected in captain and user service.
rabbitMq.connect();

console.log("Captain RABBIT_URL:", process.env.RABBIT_URL);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/', rideRoutes);


module.exports = app;