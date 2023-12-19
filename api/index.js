const express = require("express");
const router = require("./src/routes/v1");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
