const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blacklist.model");
require("dotenv").config();

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const blacklistedToken = await Blacklist.findOne({ token });
    if (blacklistedToken) throw "You've been logged out, please login again!";
    const decoded = jwt.verify(token, process.env.accessSecret);
    if (!decoded) throw "Please log in again";
    req.body.userID = decoded.userID;
    req.body.username = decoded.username;
    next();
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = auth;
