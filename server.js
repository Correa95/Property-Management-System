require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
// const apiRoutes = require("./routes/index");
const propertyRoute = require("./Controllers/property");
const unitsRoute = require("./Controllers/units");
const tenantsRoute = require("./Controllers/tenants");
const paymentsRoute = require("./Controllers/payments");

//API routes
app.use("/api/v1/property", propertyRoute);
app.use("/api/v1/units", unitsRoute);
app.use("/api/v1/tenants", tenantsRoute);
app.use("/api/v1/payments", paymentsRoute);

// app.use("/api/v1/property", apiRoutes);
// app.use("/api/v1/units", apiRoutes);
// app.use("/api/v1/tenants", apiRoutes);
// app.use("/api/v1/payments", apiRoutes)

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
