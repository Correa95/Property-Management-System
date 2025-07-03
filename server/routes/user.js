const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { firstName, lastName, email, username, password, role } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (!firstName || !lastName) {
    return res.status(400).json({ error: "First and last name are required" });
  }
  if (!username || username.length < 3) {
    return res
      .status(400)
      .json({ error: "Username must be at least 3 characters" });
  }
  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }
  try {
    const user = await prisma.user.create({
      data: { firstName, lastName, email, username, password, role },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Error creating user", details: err });
  }
});

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });
  user ? res.json(user) : res.status(404).json({ error: "User not found" });
});

router.put("/:id", async (req, res) => {
  const { firstName, lastName, email, username, password, role } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (!firstName || !lastName) {
    return res.status(400).json({ error: "First and last name are required" });
  }
  if (!username || username.length < 3) {
    return res
      .status(400)
      .json({ error: "Username must be at least 3 characters" });
  }
  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }
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

router.delete("/:id", async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user", details: err });
  }
});

module.exports = router;
