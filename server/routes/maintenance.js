const express = require("express");
const router = express.Router();
const { PrismaClient, RequestStatus } = require("@prisma/client");
const prisma = new PrismaClient();

// Create Request
router.post("/maintenance", async (req, res) => {
  const { tenantId, description, status } = req.body;
  try {
    const request = await prisma.maintenanceRequest.create({
      data: { tenantId, description, status },
    });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: "Error creating request", details: err });
  }
});

// Get All Requests
router.get("/maintenance", async (req, res) => {
  const requests = await prisma.maintenanceRequest.findMany({
    include: { tenant: true },
  });
  res.json(requests);
});

// Get Request by ID
router.get("/:id", async (req, res) => {
  const request = await prisma.maintenanceRequest.findUnique({
    where: { id: Number(req.params.id) },
    include: { tenant: true },
  });
  request
    ? res.json(request)
    : res.status(404).json({ error: "Request not found" });
});

// Update Request
router.put("/maintenance/:id", async (req, res) => {
  const { tenantId, description, status } = req.body;
  try {
    const updated = await prisma.maintenanceRequest.update({
      where: { id: req.params.id },
      data: { tenantId, description, status },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating request", details: err });
  }
});

// Delete Request
router.delete("/maintenance/:id", async (req, res) => {
  try {
    await prisma.maintenanceRequest.delete({ where: { id: req.params.id } });
    res.json({ message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting request", details: err });
  }
});

module.exports = router;
