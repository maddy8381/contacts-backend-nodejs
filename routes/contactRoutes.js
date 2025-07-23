const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
  createContact,
  getContacts,
  deleteContact,
  editContact,
} = require("../controllers/contactController");

const router = express.Router();

// First validate token for private routes
router.use(validateToken);

router.route("/").get(getContacts).post(createContact);
router.route("/:id").delete(deleteContact).put(editContact);

module.exports = router;
