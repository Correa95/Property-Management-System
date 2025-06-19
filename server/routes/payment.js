const express = require("express");
const router = express.Router();
const { PrismaClient, PaymentMethod } = require("@prisma/client");
const prisma = new PrismaClient();

// Create Payment
router.post("/", async (req, res) => {
  const {
    leaseId,
    paymentAmount,
    paymentMethod,
    isLatePayment,
    paymentDate,
    paymentStatus,
  } = req.body;

  // Validate paymentStatus if provided
  const validStatuses = ["PENDING", "COMPLETED", "FAILED"];
  if (paymentStatus && !validStatuses.includes(paymentStatus)) {
    return res.status(400).json({ error: "Invalid payment status" });
  }

  // Trim and validate paymentMethod
  if (!paymentMethod || typeof paymentMethod !== "string") {
    return res
      .status(400)
      .json({ error: "Payment method is required and must be a string" });
  }
  const cleanedMethod = paymentMethod.trim();
  if (!Object.values(PaymentMethod).includes(cleanedMethod)) {
    return res.status(400).json({ error: "Invalid payment method" });
  }

  // Validate leaseId presence
  if (!leaseId) {
    return res.status(400).json({ error: "Lease ID is required" });
  }

  // Validate paymentAmount is a positive number
  if (typeof paymentAmount !== "number" || paymentAmount <= 0) {
    return res
      .status(400)
      .json({ error: "Payment amount must be a positive number" });
  }

  // Parse and validate paymentDate if provided
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

// Get All Payments
router.get("/", async (req, res) => {
  const payments = await prisma.payment.findMany({ include: { lease: true } });
  res.json(payments);
});

// Get Payment by ID
router.get("/:id", async (req, res) => {
  const payment = await prisma.payment.findUnique({
    where: { id: req.params.id },
    include: { lease: true },
  });
  payment
    ? res.json(payment)
    : res.status(404).json({ error: "Payment not found" });
});

// Update Payment
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

// Delete Payment
router.delete("/:id", async (req, res) => {
  try {
    await prisma.payment.delete({ where: { id: req.params.id } });
    res.json({ message: "Payment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting payment", details: err });
  }
});

module.exports = router;
