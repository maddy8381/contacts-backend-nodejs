const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');


const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
    const { name, email, mobileNumber } = req.body || {};
    if (!name || !email || !mobileNumber) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  console.log("The request body is :", req.body);
  const contact = await Contact.create({
    name,
    email,
    mobileNumber,
    user_id: req.user.id,
  });
  console.log("The request body is :", req.body);

  res.status(201).json(contact);
});




const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});




module.exports = { createContact, getContacts };