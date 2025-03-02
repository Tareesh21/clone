const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const rideController = require('../controller/ride.controller')


//The ride can only be created by the user, so we need to authenticate the user, for authentication we are creating a middleware.
router.post('/create-ride', authMiddleware.userAuth, rideController.createRide)
router.put('/accept-ride',authMiddleware.captainAuth, rideController.acceptRide)


module.exports = router;