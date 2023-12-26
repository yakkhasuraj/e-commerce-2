const mongoose = require("mongoose");
const { hash } = require("../../utils/hash");

const { Schema, model } = mongoose;

const categoriesSchema = new Schema(
  {
    name: { type: String, required: "Name is required" },
    image: { type: String, required: "Image is required" },
    description: { type: String, required: "Description is required" },
    status: {
      type: String,
      enum: ["Enabled", "Disabled"],
      default: "Enabled",
    },
    createdBy: {
      type: Schema.ObjectId,
      ref: "User",
      required: "Created by is required",
    },
    updatedBy: { type: Schema.ObjectId, ref: "User" },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

exports.Category = model("Category", categoriesSchema);
