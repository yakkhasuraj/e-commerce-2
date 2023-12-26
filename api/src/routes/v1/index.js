const express = require("express");
const postsRouter = require("../../modules/posts/posts.routes");
const usersRouter = require("../../modules/users/users.routes");
const authRouter = require("../../modules/auth/auth.routes");
const categoriesRouter = require("../../modules/categories/categories.routes");

const router = express.Router();

router.use((req, res, next) => {
  console.log("Time: ", new Date().toLocaleString(), req.body);
  next();
});

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/categories", categoriesRouter);

router.use((req, res) => {
  console.log("Routes", req.originalUrl);
  res.status(404).json({ message: "Route not found" });
});

module.exports = router;
