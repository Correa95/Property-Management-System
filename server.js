require("dotenv").config();
const express = require("express");

const app = express();
const PORT = 3000;
const apiRoutes = require("./Controller/index");

//API routes
app.use("/api", apiRoutes);

// middleware
app.use(express.json());
app.use(require("morgan")("dev"));

//error handling
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message: "Internal server status" });
});
app.listen(PORT, () => {
  console.log(`Listening to port on ${PORT}`);
});
