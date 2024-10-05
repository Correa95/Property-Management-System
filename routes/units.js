const router = require("express").Router();
module.exports = router;

// get all units Route
router.get("/api/v1/units", async (req, res, next) => {
  try {
    const units = await prisma.units.findMany();
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving units", error });
    // next(error);
  }
});
// Get single Tenant Route
router.get("/api/v1/units/:id", async (req, res) => {
  const unitId = req.params.id;

  try {
    const unit = await prisma.unit.findById(unitId); // Fetch unit by ID
    if (!unit) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.status(200).json(unit); // Send the unit details as JSON
  } catch (error) {
    res.status(500).json({ message: "Error retrieving unit", error });
  }
});
