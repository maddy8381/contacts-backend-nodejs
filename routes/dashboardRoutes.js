const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const getUserDetails = require("../controllers/dashboardController");
const {
  createContact,
  getContacts,
  deleteContact,
  editContact,
} = require("../controllers/contactController");
const router = express.Router();

// First validate token for private routes
router.use(validateToken);

router.route("/").get(getUserDetails);
router.route("/contacts").get(getContacts).post(createContact);
router.route("/contacts/:id").delete(deleteContact).put(editContact);

module.exports = router;
