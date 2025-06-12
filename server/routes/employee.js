const express = require("express");
const router = express.Router();
const { PrismaClient, EmployeeType } = require("@prisma/client");
const prisma = new PrismaClient();

// Create Employee
router.post("/api/v1/employee", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    employeeType,
    salary,
    hourlyRate,
    startDate,
    street,
    city,
    state,
    zipcode,
  } = req.body;

  try {
    const employee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        employeeType,
        salary,
        hourlyRate,
        startDate: new Date(startDate),
        street,
        city,
        state,
        zipcode,
      },
    });
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: "Error creating employee", details: err });
  }
});

// Get All Employees
router.get("/api/v1/employee", async (req, res) => {
  const employees = await prisma.employee.findMany();
  res.json(employees);
});

// Get Employee by ID
router.get("/api/v1/employee/:id", async (req, res) => {
  const employee = await prisma.employee.findUnique({
    where: { id: req.params.id },
  });
  employee
    ? res.json(employee)
    : res.status(404).json({ error: "Employee not found" });
});

// Update Employee
router.put("/api/v1/employee/:id", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    employeeType,
    salary,
    hourlyRate,
    startDate,
    street,
    city,
    state,
    zipcode,
  } = req.body;

  try {
    const updated = await prisma.employee.update({
      where: { id: req.params.id },
      data: {
        firstName,
        lastName,
        email,
        phone,
        employeeType,
        salary,
        hourlyRate,
        startDate: new Date(startDate),
        street,
        city,
        state,
        zipcode,
      },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating employee", details: err });
  }
});

// Delete Employee
router.delete("/api/v1/employee/:id", async (req, res) => {
  try {
    await prisma.employee.delete({ where: { id: req.params.id } });
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting employee", details: err });
  }
});

module.exports = router;
