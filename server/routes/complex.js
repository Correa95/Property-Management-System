const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { name, street, city, state, zipcode } = req.body;
  try {
    const complex = await prisma.apartmentComplex.create({
      data: { name, street, city, state, zipcode },
    });
    res.status(201).json(complex);
  } catch (err) {
    console.error("Prisma error:", err);
    res
      .status(500)
      .json({ error: "Error creating complex", details: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const complex = await prisma.apartmentComplex.findMany({
      include: { buildings: true },
    });
    res.json(complex);
  } catch (error) {
    console.error("Failed to fetch apartment complex:", error);
    res.status(500).json({ error: "Failed to fetch apartment complex" });
  }
});

// Read One
router.get("/:id", async (req, res) => {
  const complex = await prisma.apartmentComplex.findUnique({
    where: { id: req.params.id },
    include: { buildings: true },
  });
  complex
    ? res.json(complex)
    : res.status(404).json({ error: "Complex not found" });
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  try {
    await prisma.apartmentComplex.delete({ where: { id: req.params.id } });
    res.json({ message: "Complex deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting complex", details: err });
  }
});

module.exports = router;
