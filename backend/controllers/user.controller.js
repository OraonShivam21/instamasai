const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Blacklist = require("../models/blacklist.model");
require("dotenv").config();

const register = async (req, res) => {
  const { name, email, gender, password, age, city } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) throw "You're already registered. Please login!";
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) throw err;
      const user = new User({ name, email, gender, password: hash, age, city });
      await user.save();
      res.status(201).json({ message: "New user has been registered" });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    bcrypt.compare(password, userFound.password, (err, result) => {
      if (err) throw err;
      if (!result) throw "Wrong credentials!";
      const accessToken = jwt.sign(
        { userID: userFound._id, username: userFound.name },
        process.env.accessSecret,
        { expiresIn: "7day" }
      );
      res
        .status(200)
        .json({ message: "User logged in succesfully", accessToken });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const logout = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const blacklistedToken = new User({ token });
    await blacklistedToken.save();
    res.status(200).json({ message: "Sucessfully logged out" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  register,
  login,
  logout,
};
