const HttpException = require("../../utils/http.exception");
const { Post } = require("./posts.model");

const findAllPost = () => {
  return Post.find();
};

const findPostById = async (id) => {
  const post = await Post.findById(id);
  if (!post) throw new HttpException(404, "Post not found");
  return post;
};

const savePost = (data) => {
  return Post.create(data);
};

const findPostAndUpdate = async (id, data) => {
  const post = await Post.findByIdAndUpdate(id, data, { new: true });
  if (!post) throw new Error("Post not found");
  return post;
};

const findPostAndDelete = async (id) => {
  const post = await Post.findByIdAndDelete(id);
  if (!post) throw new Error("Post not found");
  return post;
};

module.exports = {
  findAllPost,
  findPostById,
  savePost,
  findPostAndUpdate,
  findPostAndDelete,
};
