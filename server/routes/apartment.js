const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create
router.post("/apartment", async (req, res) => {
  const {
    buildingId,
    complexId,
    unitNumber,
    rentAmount,
    numBedrooms,
    squareFootage,
    isAvailable,
  } = req.body;
  try {
    const apartment = await prisma.apartment.create({
      data: {
        buildingId,
        complexId,
        unitNumber,
        rentAmount,
        numBedrooms,
        squareFootage,
        isAvailable,
      },
    });
    res.status(201).json(apartment);
  } catch (err) {
    res.status(500).json({ error: "Error creating apartment", details: err });
  }
});

// Read All
router.get("/apartment", async (req, res) => {
  const apartments = await prisma.apartment.findMany();
  res.json(apartments);
});

// Read One
router.get("/apartment/:id", async (req, res) => {
  const apartment = await prisma.apartment.findUnique({
    where: { id: req.params.id },
  });
  apartment
    ? res.json(apartment)
    : res.status(404).json({ error: "Apartment not found" });
});

// Update
router.put("/apartment/:id", async (req, res) => {
  const {
    buildingId,
    complexId,
    unitNumber,
    rentAmount,
    numBedrooms,
    squareFootage,
    isAvailable,
  } = req.body;
  try {
    const updated = await prisma.apartment.update({
      where: { id: req.params.id },
      data: {
        buildingId,
        complexId,
        unitNumber,
        rentAmount,
        numBedrooms,
        squareFootage,
        isAvailable,
      },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating apartment", details: err });
  }
});

// Delete
router.delete("/apartments/:id", async (req, res) => {
  try {
    await prisma.apartment.delete({ where: { id: req.params.id } });
    res.json({ message: "Apartment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting apartment", details: err });
  }
});

module.exports = router;
