const express = require("express");
const router = express.Router();
const { PrismaClient, PaymentMethod } = require("@prisma/client");
const prisma = new PrismaClient();

// Create Payment
router.post("/payment", async (req, res) => {
  const { leaseId, paymentAmount, paymentMethod, isLatePayment } = req.body;
  if (!Object.values(PaymentMethod).includes(paymentMethod)) {
    return res.status(400).json({ error: "Invalid payment method" });
  }
  try {
    const payment = await prisma.payment.create({
      data: { leaseId, paymentAmount, paymentMethod, isLatePayment },
    });
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: "Error creating payment", details: err });
  }
});

// Get All Payments
router.get("/payment", async (req, res) => {
  const payments = await prisma.payment.findMany({ include: { lease: true } });
  res.json(payments);
});

// Get Payment by ID
router.get("/payment/:id", async (req, res) => {
  const payment = await prisma.payment.findUnique({
    where: { id: req.params.id },
    include: { lease: true },
  });
  payment
    ? res.json(payment)
    : res.status(404).json({ error: "Payment not found" });
});

// Update Payment
router.put("/payment/:id", async (req, res) => {
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
router.delete("/payment/:id", async (req, res) => {
  try {
    await prisma.payment.delete({ where: { id: req.params.id } });
    res.json({ message: "Payment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting payment", details: err });
  }
});

module.exports = router;
