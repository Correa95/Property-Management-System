require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
const mainRouter = require("./routes");
// const apiRoutes = require("./routes/index");

//API routes // Mount all API routes under /api or root
app.use("/api", mainRouter);

// middleware
app.use(express.json());
app.use(require("morgan")("dev"));

//error handling
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message: "Internal server status" });
});
// Running POrt
app.listen(PORT, () => {
  console.log(`Listening to port on ${PORT}`);
});
