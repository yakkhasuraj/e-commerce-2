const mongoose = require("mongoose");
const { mongodbUri } = require("../configs/env.variables");

const connectToDatabase = () => {
  mongoose
    .connect(mongodbUri)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Unable to connect to database", err.message);
    });
};

module.exports = connectToDatabase;
