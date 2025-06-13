require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const PORT = 3000;
// const controller = require("./controller");
const controller = require("./Controller");

// middleware first
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true,
  })
);
app.options(
  "*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// then your routes
app.use("/api/v1", controller);

// error handling last
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message: "Internal server error" });
});

// start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
