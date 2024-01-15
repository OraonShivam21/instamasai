const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    device: {
      type: String,
      enum: ["Laptop", "Tablet", "Mobile"],
      default: "Mobile",
    },
    no_of_comments: {
      type: Number,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
