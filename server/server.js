require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://property-management-system-frontend-x6n0.onrender.com",
  ],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
const controller = require("./routes");

app.use(morgan("dev"));

app.use("/api/v1", controller);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
