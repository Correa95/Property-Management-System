const router = require("express").Router();
module.exports = router;
const prisma = require("../prisma");
// Route to get tenants payments
router.get("/payments/:unitId/tenants/:tenantId/payments", async (req, res) => {
  const { payments, tenantId } = req.params;

  try {
    // Check if the tenant exists and belongs to the specified apartment
    const tenant = await prisma.tenant.findFirst({
      where: {
        id: parseInt(tenantId),
        property: parseInt(unitId),
      },
      include: {
        payments: true, // Include payments for the tenant
      },
    });

    // If no tenant is found, return a 404 error
    if (!tenant) {
      return res
        .status(404)
        .json({ message: "Tenant or unitNumber not found" });
    }

    // Return the tenant's payments
    return res.status(200).json({
      tenant: {
        id: tenant.id,
        firstName: tenant.firstName,
        unitId: tenant.unitId,
        payments: tenant.payments,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching payments" });
  }
});
