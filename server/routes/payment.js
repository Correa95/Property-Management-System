const express = require("express");
const router = express.Router();
const { PrismaClient, PaymentMethod } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const {
    leaseId,
    paymentAmount,
    paymentMethod,
    isLatePayment,
    paymentDate,
    paymentStatus,
  } = req.body;

  const validStatuses = ["PENDING", "COMPLETED", "FAILED"];
  if (paymentStatus && !validStatuses.includes(paymentStatus)) {
    return res.status(400).json({ error: "Invalid payment status" });
  }

  if (!paymentMethod || typeof paymentMethod !== "string") {
    return res
      .status(400)
      .json({ error: "Payment method is required and must be a string" });
  }
  const cleanedMethod = paymentMethod.trim();
  if (!Object.values(PaymentMethod).includes(cleanedMethod)) {
    return res.status(400).json({ error: "Invalid payment method" });
  }

  if (!leaseId) {
    return res.status(400).json({ error: "Lease ID is required" });
  }

  if (typeof paymentAmount !== "number" || paymentAmount <= 0) {
    return res
      .status(400)
      .json({ error: "Payment amount must be a positive number" });
  }

  let parsedDate;
  if (paymentDate) {
    parsedDate = new Date(paymentDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid payment date" });
    }
  }

  try {
    const payment = await prisma.payment.create({
      data: {
        leaseId,
        paymentAmount,
        paymentMethod: cleanedMethod,
        isLatePayment: Boolean(isLatePayment),
        paymentDate: parsedDate,
        paymentStatus: paymentStatus || "PENDING",
      },
    });

    res.status(201).json(payment);
  } catch (err) {
    console.error("Error creating payment:", err);
    res
      .status(500)
      .json({ error: "Error creating payment", details: err.message });
  }
});

router.get("/", async (req, res) => {
  const payments = await prisma.payment.findMany({ include: { lease: true } });
  res.json(payments);
});

router.get("/:id", async (req, res) => {
  const payment = await prisma.payment.findUnique({
    where: { id: req.params.id },
    include: { lease: true },
  });
  payment
    ? res.json(payment)
    : res.status(404).json({ error: "Payment not found" });
});

router.put("/:id", async (req, res) => {
  const { leaseId, paymentAmount, paymentMethod, isLatePayment } = req.body;
  if (!Object.values(PaymentMethod).includes(paymentMethod)) {
    return res.status(400).json({ error: "Invalid payment method" });
  }
  try {
    const updated = await prisma.payment.update({
      where: { id: req.params.id },
      data: { leaseId, paymentAmount, paymentMethod, isLatePayment },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating payment", details: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.payment.delete({ where: { id: req.params.id } });
    res.json({ message: "Payment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting payment", details: err });
  }
});

router.get("/active-lease/:tenantId", async (req, res) => {
  const { tenantId } = req.params;
  const today = new Date();

  try {
    const activeLease = await prisma.lease.findFirst({
      where: {
        tenantId: tenantId,
        startDate: {
          lte: today,
        },
        endDate: {
          gte: today,
        },
      },
      include: {
        apartment: true,
      },
    });

    if (!activeLease) {
      return res.status(404).json({ error: "No active lease found" });
    }

    res.json(activeLease);
  } catch (err) {
    console.error("Error fetching active lease:", err);
    res.status(500).json({ error: "Error fetching active lease" });
  }
});

router.get("/active/:tenantId", async (req, res) => {
  const { tenantId } = req.params;
  const today = new Date();

  try {
    const lease = await prisma.lease.findFirst({
      where: {
        tenantId,
        startDate: { lte: today },
        endDate: { gte: today },
      },
      include: {
        tenant: true,
        apartment: true,
      },
    });

    if (!lease) return res.status(404).json({ error: "No active lease found" });

    res.json(lease);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch active lease" });
  }
});

router.get("/tenant/:tenantId", async (req, res) => {
  const { tenantId } = req.params;

  try {
    const lease = await prisma.lease.findFirst({
      where: { tenantId },
      include: {
        payments: {
          orderBy: { paymentDate: "desc" },
        },
      },
    });

    if (!lease) return res.status(404).json({ error: "No lease found" });

    res.json(lease.payments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

module.exports = router;
