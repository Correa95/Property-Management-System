const router = require("express").Router();
module.exports = router;
const prisma = require("../prisma");

// get all property Route
router.get("/api/v1/property", async (req, res, next) => {
  try {
    const property = await prisma.property.findMany();
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving property", error });
    // next(error);
  }
});
// Get single Tenant Route
router.get("/api/v1/property/:id", async (req, res) => {
  const propertyId = req.params.id;

  try {
    const property = await prisma.property.findById(propertyId); // Fetch property by ID
    if (!property) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.status(200).json(property); // Send the property details as JSON
  } catch (error) {
    res.status(500).json({ message: "Error retrieving property", error });
  }
});
