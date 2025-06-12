const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create
router.post("/api/v1/user", async (req, res) => {
  const { firstName, lastName, email, username, password, role } = req.body;
  try {
    const user = await prisma.user.create({
      data: { firstName, lastName, email, username, password, role },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Error creating user", details: err });
  }
});

// Read All
router.get("/api/v1/user", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Read One
router.get("/api/v1/user/:id", async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });
  user ? res.json(user) : res.status(404).json({ error: "User not found" });
});

// Update
router.put("/api/v1/user/:id", async (req, res) => {
  const { firstName, lastName, email, username, password, role } = req.body;
  try {
    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: { firstName, lastName, email, username, password, role },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating user", details: err });
  }
});

// Delete
router.delete("/api/v1/user/:id", async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user", details: err });
  }
});

module.exports = router;
