const rideModel = require('../models/ride.model');
const { subscribeToQueue, publishToQueue } = require('../service/rabbit')


//Whenever we create a ride, initially there will be no driver/captain assigned to that ride. The request for that particular ride will go every captains
//If any of the captain will accept the request of the ride, then the status will be updated to "accepted".
module.exports.createRide = async (req, res, next) => {

    const { pickup, destination } = req.body;

    //creating a ride.
    const newRide = new rideModel({
        user: req.user._id,
        pickup,
        destination
    })

    await newRide.save();

    //Now till above the ride has been created but we have to inform the ride info to captain which is in capatain service, we will use 
    // async commun i.e rabbitmq (message broker).

    //JSON.stringify(newRide) is the data which is send to the queue named new-ride.
    publishToQueue("new-ride", JSON.stringify(newRide))
    res.send(newRide);
}

module.exports.acceptRide = async (req, res, next) => {
    const { rideId } = req.query;
    const ride = await rideModel.findById(rideId);
    if (!ride) {
        return res.status(404).json({ message: 'Ride not found' });
    }
    ride.status = 'accepted';
    await ride.save();
    publishToQueue("ride-accepted", JSON.stringify(ride))
    res.send(ride);
}