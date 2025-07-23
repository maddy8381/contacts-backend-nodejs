const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const getUserDetails = require("../controllers/dashboardController");

const router = express.Router();

// First validate token for private routes
router.use(validateToken);

router.route("/").get(getUserDetails);

module.exports = router;
