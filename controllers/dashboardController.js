const asyncHanlder = require('express-async-handler');
const User = require('../models/userModel');

const getUserDetails = asyncHanlder(async (req, res) => {
    const email = req.user.email;
    const user = await User.findOne({ email })
    if (!user) {
        res.status(400);
        throw new Error("User details not found");
    }

    res.status(200).json({
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber
    });
});


module.exports = getUserDetails;