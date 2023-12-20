const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const postsSchema = new Schema({
  title: { type: String, required: "Title is required" },
  description: { type: String, required: "Description is required" },
});

exports.Post = model("Post", postsSchema);
