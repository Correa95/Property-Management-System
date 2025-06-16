const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create
router.post("/", async (req, res) => {
  try {
    const {
      complexId,
      buildingId,
      unitNumber,
      rentAmount,
      numBedrooms,
      squareFootage,
      isAvailable,
    } = req.body;

    // Basic validation
    if (
      !complexId ||
      !buildingId ||
      !unitNumber ||
      rentAmount === undefined ||
      numBedrooms === undefined ||
      squareFootage === undefined
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const apartment = await prisma.apartment.create({
      data: {
        complexId,
        buildingId,
        unitNumber,
        rentAmount: Number(rentAmount),
        numBedrooms: Number(numBedrooms),
        squareFootage: Number(squareFootage),
        isAvailable: isAvailable ?? true,
      },
    });

    res.status(201).json(apartment);
  } catch (error) {
    console.error("Error creating apartment:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Read All
router.get("/", async (req, res) => {
  const apartments = await prisma.apartment.findMany();
  res.json(apartments);
});

// Read One
router.get("/:id", async (req, res) => {
  const apartment = await prisma.apartment.findUnique({
    where: { id: req.params.id },
  });
  apartment
    ? res.json(apartment)
    : res.status(404).json({ error: "Apartment not found" });
});

// Update
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  try {
    await prisma.apartment.delete({ where: { id: req.params.id } });
    res.json({ message: "Apartment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting apartment", details: err });
  }
});

module.exports = router;
