const router = require("express").Router();

// router.use("/auth", require("../routes/auth")); // 👈 Add this line

// router.use("/user", require("routes/user"));
// router.use("/apartmentComplex", require("routes/apartmentComplex"));
// router.use("/building", require("routes/building"));
// router.use("/apartment", require("routes/apartment"));
// router.use("/tenants", require("routes/tenants"));
// router.use("/lease", require("routes/lease"));
// router.use("/payment", require("routes/payment"));
// router.use("/maintenance", require("routes/maintenance"));
// router.use("/document", require("routes/document"));
// router.use("/employee", require("routes/employee"));
// router.use("/payroll", require("routes/payroll"));
router.use("/auth", require("../routes/auth"));
router.use("/user", require("../routes/user"));
router.use("/apartmentComplex", require("../routes/apartmentComplex"));
router.use("/building", require("../routes/building"));
router.use("/apartment", require("../routes/apartment"));
router.use("/tenant", require("../routes/tenant"));
router.use("/lease", require("../routes/lease"));
router.use("/payment", require("../routes/payment"));
router.use("/maintenance", require("../routes/maintenance"));
router.use("/document", require("../routes/document"));
router.use("/employee", require("../routes/employee"));
router.use("/payroll", require("../routes/payroll"));

module.exports = router;
