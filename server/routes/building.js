const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create

// Create a new building linked to an apartment complex
router.post("/", async (req, res) => {
  try {
    const { complexId, buildingNumber } = req.body;

    // Basic validation
    if (!complexId || typeof complexId !== "string") {
      return res
        .status(400)
        .json({ error: "complexId is required and must be a string." });
    }
    if (!buildingNumber || typeof buildingNumber !== "number") {
      return res
        .status(400)
        .json({ error: "buildingNumber is required and must be a number." });
    }

    // Check if apartment complex exists
    const complexExists = await prisma.apartmentComplex.findUnique({
      where: { id: complexId },
    });

    if (!complexExists) {
      return res.status(404).json({ error: "Apartment complex not found." });
    }

    // Create the building
    const building = await prisma.building.create({
      data: {
        complexId,
        buildingNumber,
      },
    });

    res.status(201).json(building);
  } catch (error) {
    console.error("Error creating building:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Read All
router.get("/", async (req, res) => {
  const buildings = await prisma.building.findMany({
    include: { apartments: true },
  });
  res.json(buildings);
});

// Read One
router.get("/:id", async (req, res) => {
  const building = await prisma.building.findUnique({
    where: { id: req.params.id },
    include: { apartments: true },
  });
  building
    ? res.json(building)
    : res.status(404).json({ error: "Building not found" });
});

// Update
router.put("/:id", async (req, res) => {
  const { complexId, buildingNumber } = req.body;
  try {
    const updated = await prisma.building.update({
      where: { id: req.params.id },
      data: { complexId, buildingNumber },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating building", details: err });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await prisma.building.delete({ where: { id: req.params.id } });
    res.json({ message: "Building deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting building", details: err });
  }
});

module.exports = router;
