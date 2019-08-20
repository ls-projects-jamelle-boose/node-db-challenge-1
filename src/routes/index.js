const router = require("express").Router();

router.get("/", (req, res) => res.send("Router Working."));

router.use("/projects", require("./projects"));
router.use("/resources", require("./resources"));

module.exports = router;
