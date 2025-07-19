const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const getUserDetails = require('../controllers/dashboardController');
const { createContact, getContacts } = require('../controllers/contactController');
const router = express.Router();

// First validate token for private routes
router.use(validateToken);

router.route('/').get(getUserDetails)
router.route('/contacts').post(createContact).get(getContacts);

module.exports = router;