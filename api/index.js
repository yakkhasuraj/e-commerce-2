require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./src/routes/v1");
const { ZodError } = require("zod");
const connectToDatabase = require("./src/libs/database");
const { MongooseError } = require("mongoose");
const { port } = require("./src/configs/env.variables");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

connectToDatabase();

app.use("/v1", router);

app.use((err, req, res, next) => {
  console.log("Error", err);
  if (err instanceof ZodError) {
    const messages = err.errors.map(({ message }) => message);
    res.status(400).json({ messages });
    return;
  }
  if (err instanceof MongooseError) {
    res.status(400).json({ message: err.message });
    return;
  }
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
