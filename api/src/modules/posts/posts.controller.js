let posts = [];

const listPost = (req, res) => {
  res.status(200).json({ message: "Post listed successfully", data: posts });
};

const getPostById = (req, res) => {
  const { id } = req.params;

  const post = posts.find((post) => post.id === parseInt(id));
  if (!post) {
    res.status(404).json({ message: "Post not found", data: null });
    return;
  }

  res.status(200).json({ message: "Post retrieved successfully", data: post });
};

const createPost = (req, res) => {
  const { body } = req;

  posts.push(body);

  res.status(201).json({ message: "Post created successfully", data: body });
};

const updatePost = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const index = posts.findIndex((post) => post.id === parseInt(id));
  if (index < 0) {
    res.status(404).json({ message: "Post not found", data: null });
    return;
  }

  posts[index] = body;
  res.status(200).json({ message: "Post updated successfully", data: body });
};

const deletePost = (req, res) => {
  const { id } = req.params;

  const post = posts.find((post) => post.id === parseInt(id));
  if (!post) {
    res.status(404).json({ message: "Post not found", data: null });
    return;
  }

  const newPostList = posts.filter((post) => post.id !== parseInt(id));
  posts = newPostList;

  res.status(200).json({ message: "Post deleted successfully", data: null });
};

module.exports = {
  listPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
