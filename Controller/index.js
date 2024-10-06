const router = require("express").Router();
module.exports = router;

router.use("/property", require("./property"));
router.use("/users", require("./users"));
router.use("/tenants", require("./tenants"));
router.use("/units", require("./units"));
router.use("/payments", require("./payments"));
