const router = require("express").Router();
module.exports = router;

// get all tenants Route
router.get("/api/v1/tenants", async (req, res, next) => {
  try {
    const tenants = await prisma.tenants.findMany();
    res.status(200).json(tenants);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tenants", error });
    // next(error);
  }
});
// Get single Tenant Route
router.get("/api/v1/tenants/:id", async (req, res) => {
  const tenantId = req.params.id;

  try {
    const tenant = await prisma.tenant.findById(tenantId); // Fetch tenant by ID
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }
    res.status(200).json(tenant); // Send the tenant details as JSON
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tenant", error });
  }
});
// POST route to add a new tenant
router.post("/api/v1/tenants", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      unitNumber,
      leaseStartDate,
      leaseEndDate,
      monthlyRent,
    } = req.body;

    // Input validation (basic example)
    if (
      !firstNameName ||
      !lastName ||
      !email ||
      !phone ||
      !unitNumber ||
      !leaseStartDate ||
      leaseEndDate ||
      !monthlyRent
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Create a new tenant
    const newTenant = new Tenant({
      firstName,
      lastName,
      email,
      phone,
      unitNumber,
      leaseStartDate,
      leaseEndDate,
      monthlyRent,
    });

    // Save tenant to the database
    const savedTenant = await newTenant.save();
    res.status(201).json({
      message: "New tenant added successfully",
      tenant: savedTenant,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
