const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create
router.post("/api/v1/building/", async (req, res) => {
  const { complexId, buildingNumber } = req.body;
  try {
    const building = await prisma.building.create({
      data: { complexId, buildingNumber },
    });
    res.status(201).json(building);
  } catch (err) {
    res.status(500).json({ error: "Error creating building", details: err });
  }
});

// Read All
router.get("/api/v1/building/", async (req, res) => {
  const buildings = await prisma.building.findMany({
    include: { apartments: true },
  });
  res.json(buildings);
});

// Read One
router.get("/api/v1/building/:id", async (req, res) => {
  const building = await prisma.building.findUnique({
    where: { id: req.params.id },
    include: { apartments: true },
  });
  building
    ? res.json(building)
    : res.status(404).json({ error: "Building not found" });
});

// Update
router.put("/api/v1/building/:id", async (req, res) => {
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
router.delete("/api/v1/building/:id", async (req, res) => {
  try {
    await prisma.building.delete({ where: { id: req.params.id } });
    res.json({ message: "Building deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting building", details: err });
  }
});

module.exports = router;
