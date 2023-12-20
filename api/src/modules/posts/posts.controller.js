const { Post } = require("./posts.model");
const {
  findAllPost,
  findPostById,
  savePost,
  findPostAndUpdate,
  findPostAndDelete,
} = require("./posts.service");

const listPost = async (req, res, next) => {
  try {
    const posts = await findAllPost();
    res.status(200).json({ message: "Post listed successfully", data: posts });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await findPostById(id);

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

    const post = await savePost(body);

    res.status(201).json({ message: "Post created successfully", data: post });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const post = await findPostAndUpdate(id, body);

    res.status(200).json({ message: "Post updated successfully", data: post });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await findPostAndDelete(id);

    res.status(200).json({ message: "Post deleted successfully", data: post });
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
