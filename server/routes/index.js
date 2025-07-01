const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/user", require("./user"));
router.use("/apartmentComplex", require("./apartmentComplex"));
router.use("/building", require("./building"));
router.use("/apartment", require("./apartment"));
router.use("/tenant", require("./tenant"));
router.use("/lease", require("./lease"));
router.use("/payment", require("./payment"));
router.use("/maintenance", require("./maintenance"));
router.use("/document", require("./document"));
router.use("/employee", require("./employee"));
router.use("/payroll", require("./payroll"));

module.exports = router;
