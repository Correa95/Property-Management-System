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

// const router = require("express").Router();

// const tryRequire = (path, routeName) => {
//   try {
//     console.log(`Loading ${routeName}...`);
//     router.use(routeName, require(path));
//     console.log(`✅ Loaded ${routeName}`);
//   } catch (err) {
//     console.error(`❌ Failed to load ${routeName}:`, err.message);
//   }
// };

// // Try loading each route individually
// tryRequire("../routes/auth", "/auth");
// tryRequire("../routes/user", "/user");
// tryRequire("../routes/apartmentComplex", "/apartmentComplex");
// tryRequire("../routes/building", "/building");
// tryRequire("../routes/apartment", "/apartment");
// tryRequire("../routes/tenant", "/tenant");
// tryRequire("../routes/lease", "/lease");
// tryRequire("../routes/payment", "/payment");
// tryRequire("../routes/maintenance", "/maintenance");
// tryRequire("../routes/document", "/document");
// tryRequire("../routes/employee", "/employee");
// tryRequire("../routes/payroll", "/payroll");

// module.exports = router;
