const { log } = require("../modules/logger");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  log.info(
    `Incoming request for login with email: ${email}, password: ${password}`
      .cyan
  );

  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.status(400);
    throw new Error("User not registered!");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid Credentials" });
  }

  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      }),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  log.info(
    `Incoming request for register user with name:${name}, email:${email}, password:${password}`
      .cyan
  );

  const userExist = await User.findOne({ where: { email: email } });
  if (userExist) {
    res.status(400);
    throw new Error("User already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = {
  login,
  register,
};
