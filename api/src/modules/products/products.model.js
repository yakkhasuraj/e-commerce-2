const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productsSchema = new Schema(
  {
    name: { type: String, required: "Name is required" },
    image: { type: String, required: "Image is required" },
    description: { type: String, required: "Description is required" },
    tags: [{ type: String, required: "Tag is required" }],
    price: { type: Number, required: "Price is required" },
    category: {
      type: Schema.ObjectId,
      ref: "Category",
      required: "Category is required",
    },
    quantity: { type: Number, required: "Quantity is required" },
    rating: {
      type: Number,
      required: "Rating is required",
      min: [1, "Rating must be greater than or equals to 1"],
      max: [5, "Rating must be less than or equals to 5"],
    },
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

exports.Product = model("Product", productsSchema);
