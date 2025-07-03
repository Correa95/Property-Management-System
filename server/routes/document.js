const express = require("express");
const router = express.Router();
const { PrismaClient, DocumentType } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { name, documentType, uploadedFile } = req.body;

  if (!Object.values(DocumentType).includes(documentType)) {
    return res.status(400).json({ error: "Invalid document type" });
  }
  try {
    const document = await prisma.document.create({
      data: { name, documentType, uploadedFile },
    });
    res.status(201).json(document);
  } catch (err) {
    res.status(500).json({ error: "Error creating document", details: err });
  }
});

router.get("/", async (req, res) => {
  const documents = await prisma.document.findMany();
  res.json(documents);
});

router.get("/:id", async (req, res) => {
  const document = await prisma.document.findUnique({
    where: { id: req.params.id },
  });
  document
    ? res.json(document)
    : res.status(404).json({ error: "Document not found" });
});

router.put("/:id", async (req, res) => {
  const { name, documentType, uploadedFile } = req.body;
  if (!Object.values(DocumentType).includes(documentType)) {
    return res.status(400).json({ error: "Invalid document type" });
  }

  try {
    const updated = await prisma.document.update({
      where: { id: req.params.id },
      data: { name, documentType, uploadedFile },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating document", details: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.document.delete({ where: { id: req.params.id } });
    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting document", details: err });
  }
});

module.exports = router;
