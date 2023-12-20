const express = require("express");
const postRouter = require("../../modules/posts/posts.routes");

const router = express.Router();

router.use((req, res, next) => {
  console.log("Time: ", new Date().toLocaleString());
  next();
});

router.use("/v1/posts", postRouter);

router.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = router;
