const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create Tenant
router.post("/api/v1/tenant", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, dateOfBirth } = req.body;
  try {
    const tenant = await prisma.tenant.create({
      data: { firstName, lastName, email, phoneNumber, dateOfBirth },
    });
    res.status(201).json(tenant);
  } catch (err) {
    res.status(500).json({ error: "Error creating tenant", details: err });
  }
});

// Get All Tenants
router.get("/api/v1/tenant", async (req, res) => {
  const tenants = await prisma.tenant.findMany();
  res.json(tenants);
});

// Get Tenant by ID
router.get("/api/v1/tenant/:id", async (req, res) => {
  const tenant = await prisma.tenant.findUnique({
    where: { id: req.params.id },
  });
  tenant
    ? res.json(tenant)
    : res.status(404).json({ error: "Tenant not found" });
});

// Update Tenant
router.put("/api/v1/tenant/:id", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, dateOfBirth } = req.body;
  try {
    const updated = await prisma.tenant.update({
      where: { id: req.params.id },
      data: { firstName, lastName, email, phoneNumber, dateOfBirth },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating tenant", details: err });
  }
});

// Delete Tenant
router.delete("/api/v1/tenant/:id", async (req, res) => {
  try {
    await prisma.tenant.delete({ where: { id: req.params.id } });
    res.json({ message: "Tenant deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting tenant", details: err });
  }
});

module.exports = router;
