const mongoose = require("mongoose");
const { hash } = require("../../utils/hash");

const { Schema, model } = mongoose;

const usersSchema = new Schema(
  {
    firstName: { type: String, required: "First name is required" },
    lastName: { type: String, required: "Last name is required" },
    email: { type: String, required: "Email is required", index: true },
    image: { type: String },
    dateOfBirth: { type: Date, required: "Date of birth is required" },
    password: { type: String, required: "Password is required" },
    status: {
      type: String,
      enum: ["Enabled", "Disabled"],
      default: "Disabled",
    },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

usersSchema.pre("save", async function (next) {
  this.password = await hash(this.password);
  next();
});

exports.User = model("User", usersSchema);
