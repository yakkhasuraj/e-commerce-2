const express = require("express");
const {
  listPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../../modules/posts/posts.controller");

const router = express.Router();

// router.get("/posts", listPost);
// router.get("/posts/:id", getPostById);
// router.post("/posts", createPost);
// router.put("/posts/:id", updatePost);
// router.delete("/posts/:id", deletePost);

router.use((req, res, next) => {
  console.log("Time: ", new Date().toLocaleString());
  next();
});

router.route("/posts").get(listPost).post(createPost);
router.route("/posts/:id").get(getPostById).put(updatePost).delete(deletePost);

module.exports = router;
