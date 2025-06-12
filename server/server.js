require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3000;
const controller = require("./routes");

// middleware first
app.use(express.json());
app.use(morgan("dev"));

// then your routes
app.use("/api", controller);

// error handling last
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message: "Internal server error" });
});

// start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
