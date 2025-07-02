require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173", // for local dev
    "https://property-management-system-frontend-x6n0.onrender.com", // for production
  ],
  credentials: true,
};

app.use(express.json()); // ✅ needed to parse JSON bodies
const controller = require("./routes");

// CORS setup
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests globally

// Middleware setup
app.use(morgan("dev"));

// Routes
app.use("/api/v1", controller);

// Error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
