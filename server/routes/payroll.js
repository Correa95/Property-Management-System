const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create Payroll
router.post("/payroll", async (req, res) => {
  const {
    employeeId,
    payPeriodStart,
    payPeriodEnd,
    grossPay,
    stateTaxRate,
    federalTaxRate,
    deductions,
    netPay,
    isPaid,
    paidOn,
  } = req.body;

  try {
    const payroll = await prisma.payroll.create({
      data: {
        employeeId,
        payPeriodStart: new Date(payPeriodStart),
        payPeriodEnd: new Date(payPeriodEnd),
        grossPay,
        stateTaxRate,
        federalTaxRate,
        deductions,
        netPay,
        isPaid,
        paidOn: paidOn ? new Date(paidOn) : null,
      },
    });
    res.status(201).json(payroll);
  } catch (err) {
    res.status(500).json({ error: "Error creating payroll", details: err });
  }
});

// Get All Payrolls
router.get("/payroll", async (req, res) => {
  const payrolls = await prisma.payroll.findMany({
    include: { employee: true },
  });
  res.json(payrolls);
});

// Get Payroll by ID
router.get("/payroll/:id", async (req, res) => {
  const payroll = await prisma.payroll.findUnique({
    where: { id: req.params.id },
    include: { employee: true },
  });
  payroll
    ? res.json(payroll)
    : res.status(404).json({ error: "Payroll not found" });
});

// Update Payroll
router.put("/payroll/:id", async (req, res) => {
  const {
    employeeId,
    payPeriodStart,
    payPeriodEnd,
    grossPay,
    stateTaxRate,
    federalTaxRate,
    deductions,
    netPay,
    isPaid,
    paidOn,
  } = req.body;

  try {
    const updated = await prisma.payroll.update({
      where: { id: req.params.id },
      data: {
        employeeId,
        payPeriodStart: new Date(payPeriodStart),
        payPeriodEnd: new Date(payPeriodEnd),
        grossPay,
        stateTaxRate,
        federalTaxRate,
        deductions,
        netPay,
        isPaid,
        paidOn: paidOn ? new Date(paidOn) : null,
      },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating payroll", details: err });
  }
});

// Delete Payroll
router.delete("/payroll/:id", async (req, res) => {
  try {
    await prisma.payroll.delete({ where: { id: req.params.id } });
    res.json({ message: "Payroll deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting payroll", details: err });
  }
});

module.exports = router;
