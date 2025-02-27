const express = require('express')
const router = express.Router();
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

//For the below profile route to be accessed the user first must be logged in so we will use middleware
router.get('/profile', authMiddleware.userAuth, userController.profile)


module.exports = router;