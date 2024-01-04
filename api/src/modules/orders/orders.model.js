const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const ordersSchema = new Schema(
  {
    cart: {
      type: Schema.ObjectId,
      ref: "Cart",
      required: "Cart is required",
    },
    total: { type: Number, required: "Total is required" },
    deal: {
      type: String,
      enum: ["InProgress", "Completed"],
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

exports.Order = model("Order", ordersSchema);
