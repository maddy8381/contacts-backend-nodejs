const express = require('express');
const router = express.Router();
const {registerUser, logInUser} = require('../controllers/userController');

router.route('/signup').post(registerUser);

router.route('/signin').post(logInUser)

module.exports = router;