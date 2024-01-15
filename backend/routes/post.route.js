const express = require("express");
const {
  getPosts,
  addPost,
  topPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

const router = express.Router();

router.get("/", getPosts);

router.post("/add", addPost);

router.get("/top", topPost);

router.patch("/update/:postID", updatePost);

router.delete("/delete/:postID", deletePost);

module.exports = router;
