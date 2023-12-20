require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const router = require("./src/routes/v1");
const { ZodError } = require("zod");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Unable to connect to database", err.message);
  });

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.use(router);

app.use((err, req, res, next) => {
  if (err instanceof ZodError) {
    const messages = err.errors.map(({ message }) => message);
    res.status(400).json({ messages });
    return;
  }
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
