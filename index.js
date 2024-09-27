require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/config/db");
const { connectCloudinary } = require("./src/config/cloudinary");
const mainRouter = require("./src/api/routes/mainRouter");

const PORT = 3000;
const app = express();

connectDB();
connectCloudinary();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.use("/*", (req, res, next) => {
  return res.status(404).json("Route not found");
});

app.listen(PORT, () => {
  console.log(`"http://localhost:${PORT}"`);
});
