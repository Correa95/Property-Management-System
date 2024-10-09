const router = require("express").Router();
module.exports = router;

router.use("/property", require("Controllers/property"));
router.use("/users", require("Controllers/users"));
router.use("/tenants", require("Controllers/tenants"));
router.use("/units", require("Controllers/units"));
router.use("/payments", require("Controllers/payments"));
