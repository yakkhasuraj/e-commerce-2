const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productsSchema = new Schema({
  product: {
    type: Schema.ObjectId,
    ref: "Product",
    required: "Product is required",
  },
  quantity: { type: Number, required: "Quantity is required" },
});

const cartsSchema = new Schema(
  {
    products: [productsSchema],
    deal: {
      type: String,
      enum: ["InProgress", "Ordered"],
      default: "InProgress",
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

exports.Cart = model("Cart", cartsSchema);
