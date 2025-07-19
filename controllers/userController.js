const asyncHanlder = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const setTokenCookie = (res, accessToken) => {
  res.cookie("SessionToken", accessToken, {
    httpOnly: true,
    secure: true, // ✅ must be true on HTTPS (like Render)
    sameSite: "none", // ✅ allow cross-origin cookies
    maxAge: 15 * 60 * 1000,
  });
};

const registerUser = asyncHanlder(async (req, res, next) => {
  const { fullName, email, password, mobileNumber } = req.body;

  if (!fullName || !email || !password || !mobileNumber) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const isUserAlreadyAvailable = await User.findOne({ email });
  if (isUserAlreadyAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    mobileNumber,
  });

  console.log(`User created ${user}`);
  if (user) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );
    setTokenCookie(res, accessToken);
    res.status(201).json({ email: user.email, accessToken });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

const logInUser = asyncHanlder(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );

    setTokenCookie(res, accessToken);
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is incorrect");
  }
});

module.exports = { registerUser, logInUser };
