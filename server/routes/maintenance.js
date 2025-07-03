const express = require("express");
const router = express.Router();
const { PrismaClient, RequestStatus } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { tenantId, description, status } = req.body;

  if (!Object.values(RequestStatus).includes(status)) {
    return res.status(400).json({ error: "Invalid request status" });
  }
  try {
    const request = await prisma.maintenanceRequest.create({
      data: { tenantId, description, status },
    });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: "Error creating request", details: err });
  }
});

router.get("/", async (req, res) => {
  const requests = await prisma.maintenanceRequest.findMany({
    include: { tenant: true },
  });
  res.json(requests);
});

router.get("/:id", async (req, res) => {
  const request = await prisma.maintenanceRequest.findUnique({
    where: { id: req.params.id },
    include: { tenant: true },
  });
  request
    ? res.json(request)
    : res.status(404).json({ error: "Request not found" });
});

router.put("/:id", async (req, res) => {
  const { tenantId, description, status } = req.body;

  if (!Object.values(RequestStatus).includes(status)) {
    return res.status(400).json({ error: "Invalid request status" });
  }
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

router.delete("/:id", async (req, res) => {
  try {
    await prisma.maintenanceRequest.delete({ where: { id: req.params.id } });
    res.json({ message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting request", details: err });
  }
});

module.exports = router;
