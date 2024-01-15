const express = require("express");
const connection = require("./connection");
const userRoute = require("./routes/user.route");
const { logout } = require("./controllers/user.controller");
const postRoute = require("./routes/post.route");
const auth = require("./middlewares/auth.middleware");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", userRoute);

app.use("/posts", auth, postRoute);

app.get("/logout", auth, logout);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the user posts api" });
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("connected to db");
    console.log("listening on port", port);
  } catch (error) {
    console.error(error);
  }
});
