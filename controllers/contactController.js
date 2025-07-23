const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, email, mobileNumber } = req.body || {};
  if (!name || !email || !mobileNumber) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const contact = await Contact.create({
    name,
    email,
    mobileNumber,
    user_id: req.user.id,
  });
  console.log("Contact created :", contact);
  if (contact)
    res.status(201).json({
      success: true,
      email: contact.email,
    });
  else {
    res.status(400);
    throw new Error("Unable to create contact");
  }
});

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({
      message: "Contact not found",
    });
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403).json({
      message: "User don't have permission to update other user contacts",
    });
    throw new Error("User don't have permission to update other user contacts");
  }

  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json({
    message: "Contact deleted successfully",
  });
});

const editContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  const { name, email, mobileNumber } = req.body;
  if (!name || !email || !mobileNumber) {
    res.status(400).json({
      message: "All fields are mandatory",
    });
    throw new Error("All fields are mandatory !");
  }
  if (!contact) {
    res.status(404).json({
      message: "Contact not found",
    });
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403).json({
      message: "User don't have permission to update other user contacts",
    });
    throw new Error("User don't have permission to update other user contacts");
  }
  await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({
    success: true,
    message: "Contact updated successfully",
  });
});

module.exports = { createContact, getContacts, deleteContact, editContact };
