const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create
router.post("/apartmentComplex", async (req, res) => {
  const { name, street, city, state, zipcode } = req.body;
  try {
    const complex = await prisma.apartmentComplex.create({
      data: { name, street, city, state, zipcode },
    });
    res.status(201).json(complex);
  } catch (err) {
    res.status(500).json({ error: "Error creating complex", details: err });
  }
});

// Read All
router.get("/apartmentComplex", async (req, res) => {
  const complexes = await prisma.apartmentComplex.findMany({
    include: { buildings: true },
  });
  res.json(complexes);
});

// Read One
router.get("/apartmentComplex/:id", async (req, res) => {
  const complex = await prisma.apartmentComplex.findUnique({
    where: { id: req.params.id },
    include: { buildings: true },
  });
  complex
    ? res.json(complex)
    : res.status(404).json({ error: "Complex not found" });
});

// Update
router.put("/apartmentComplex/:id", async (req, res) => {
  const { name, street, city, state, zipcode } = req.body;
  try {
    const updated = await prisma.apartmentComplex.update({
      where: { id: req.params.id },
      data: { name, street, city, state, zipcode },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating complex", details: err });
  }
});

// Delete
router.delete("/apartmentComplex/:id", async (req, res) => {
  try {
    await prisma.apartmentComplex.delete({ where: { id: req.params.id } });
    res.json({ message: "Complex deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting complex", details: err });
  }
});

module.exports = router;
