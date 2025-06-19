const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const {
    apartmentId,
    tenantId,
    startDate,
    endDate,
    monthlyRent,
    securityDeposit,
    isActive, // optional
  } = req.body;

  // Validate required fields
  if (
    !apartmentId ||
    !tenantId ||
    !startDate ||
    !endDate ||
    !monthlyRent ||
    !securityDeposit
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const lease = await prisma.lease.create({
      data: {
        apartmentId,
        tenantId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        monthlyRent: parseFloat(monthlyRent),
        securityDeposit: parseFloat(securityDeposit),
        isActive: isActive ?? true,
      },
    });
    res.status(201).json(lease);
  } catch (err) {
    console.error("Lease creation failed:", err);
    res
      .status(500)
      .json({ error: "Error creating lease", details: err.message });
  }
});

// Get All Leases
router.get("/", async (req, res) => {
  const leases = await prisma.lease.findMany({
    include: { tenant: true, apartment: true },
  });
  res.json(leases);
});

// Get Lease by ID
router.get("/:id", async (req, res) => {
  const lease = await prisma.lease.findUnique({
    where: { id: req.params.id },
    include: { tenant: true, apartment: true },
  });
  lease ? res.json(lease) : res.status(404).json({ error: "Lease not found" });
});

// Update Lease
router.put("/:id", async (req, res) => {
  const {
    apartmentId,
    tenantId,
    startDate,
    endDate,
    monthlyRent,
    securityDeposit,
    isActive,
  } = req.body;
  try {
    const updated = await prisma.lease.update({
      where: { id: req.params.id },
      data: {
        apartmentId,
        tenantId,
        startDate,
        endDate,
        monthlyRent,
        securityDeposit,
        isActive,
      },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating lease", details: err });
  }
});

// Delete Lease
router.delete("/:id", async (req, res) => {
  try {
    await prisma.lease.delete({ where: { id: req.params.id } });
    res.json({ message: "Lease deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting lease", details: err });
  }
});

module.exports = router;
