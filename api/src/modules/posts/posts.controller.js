const { postValidator } = require("./posts.validator");

let posts = [];

const listPost = (req, res, next) => {
  try {
    res.status(200).json({ message: "Post listed successfully", data: posts });
  } catch (error) {
    next(error);
  }
};

const getPostById = (req, res, next) => {
  try {
    const { id } = req.params;

    const post = posts.find((post) => post.id === parseInt(id));
    if (!post) throw new Error("Post not found");

    res
      .status(200)
      .json({ message: "Post retrieved successfully", data: post });
  } catch (error) {
    next(error);
  }
};

const createPost = (req, res, next) => {
  try {
    const { body } = req;

    posts.push(body);

    res.status(201).json({ message: "Post created successfully", data: body });
  } catch (error) {
    next(error);
  }
};

const updatePost = (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const index = posts.findIndex((post) => post.id === parseInt(id));
    if (index < 0) throw new Error("Post not found");

    posts[index] = body;
    res.status(200).json({ message: "Post updated successfully", data: body });
  } catch (error) {
    next(error);
  }
};

const deletePost = (req, res, next) => {
  try {
    const { id } = req.params;

    const post = posts.find((post) => post.id === parseInt(id));
    if (!post) throw new Error("Post not found");

    const newPostList = posts.filter((post) => post.id !== parseInt(id));
    posts = newPostList;

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
