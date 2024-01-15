const Post = require("../models/post.model");

const getPosts = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const skip = page * 3 - 3;
    const posts = await Post.find({ userID: req.body.userID })
      .skip(skip)
      .limit(page);
    if (posts.length > 0) res.status(200).json({ posts });
    else
      res.status(200).json({
        message: "There are no posts to show. Please create a new one!",
      });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const addPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json({ message: "New post have been added" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const topPost = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const skip = page * 3 - 3;
    const posts = await Post.find({ userID: req.body.userID })
      .sort({ no_of_comments: 1 })
      .skip(skip)
      .limit(page);
    res.status(200).json({ posts });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updatePost = async (req, res) => {
  const postID = req.params.postID;
  try {
    const postFound = await Post.findOne({ _id: postID });
    if (postFound.userID !== req.body.userID)
      throw "Unauthorized: You're not authorized to update this post";
    await Post.findByIdAndUpdate({ _id: postID }, req.body);
    res.status(201).json({ message: "The post has been updated" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deletePost = async (req, res) => {
  const postID = req.params.postID;
  try {
    const postFound = await Post.findOne({ _id: postID });
    if (postFound.userID !== req.body.userID)
      throw "Unauthorized: You're not authorized to delete this post";
    await Post.findByIdAndDelete({ _id: postID });
    res.status(201).json({ message: "The post has been deleted" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getPosts,
  addPost,
  topPost,
  updatePost,
  deletePost,
};
