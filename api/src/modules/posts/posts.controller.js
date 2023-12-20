const { Post } = require("./posts.model");

const listPost = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ message: "Post listed successfully", data: posts });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) throw new Error("Post not found");

    res
      .status(200)
      .json({ message: "Post retrieved successfully", data: post });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { body } = req;

    const post = await Post.create(body);

    res.status(201).json({ message: "Post created successfully", data: post });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const post = await Post.findByIdAndUpdate(id, body);
    if (!post) throw new Error("Post not found");

    res.status(200).json({ message: "Post updated successfully", data: post });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);
    if (!post) throw new Error("Post not found");

    res.status(200).json({ message: "Post deleted successfully", data: null });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
