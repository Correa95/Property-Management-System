const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
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

  if (
    stateTaxRate < 0 ||
    stateTaxRate > 1 ||
    federalTaxRate < 0 ||
    federalTaxRate > 1
  ) {
    return res.status(400).json({ error: "Tax rates must be between 0 and 1" });
  }

  if (grossPay < 0 || netPay < 0 || deductions < 0) {
    return res.status(400).json({ error: "Pay values cannot be negative" });
  }

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

router.get("/", async (req, res) => {
  const payrolls = await prisma.payroll.findMany({
    include: { employee: true },
  });
  res.json(payrolls);
});

router.get("/:id", async (req, res) => {
  const payroll = await prisma.payroll.findUnique({
    where: { id: req.params.id },
    include: { employee: true },
  });
  payroll
    ? res.json(payroll)
    : res.status(404).json({ error: "Payroll not found" });
});

router.put("/:id", async (req, res) => {
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

  if (
    stateTaxRate < 0 ||
    stateTaxRate > 1 ||
    federalTaxRate < 0 ||
    federalTaxRate > 1
  ) {
    return res.status(400).json({ error: "Tax rates must be between 0 and 1" });
  }

  if (grossPay < 0 || netPay < 0 || deductions < 0) {
    return res.status(400).json({ error: "Pay values cannot be negative" });
  }

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

router.delete("/:id", async (req, res) => {
  try {
    await prisma.payroll.delete({ where: { id: req.params.id } });
    res.json({ message: "Payroll deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting payroll", details: err });
  }
});

module.exports = router;
