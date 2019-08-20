const router = require("express").Router();
const rm = require("../models/resources");

router.get("/", async (req, res) => {
  try {
    const resources = await rm.list();

    if (!resources.length) {
      return res.status(404).json({
        message: "No resources.",
        success: false
      });
    }

    return res.json({
      resources,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Resources could not be retrieved.",
      success: false
    });
  }
});

router.post("/", async (req, res) => {
  const newResource = req.body;
  const { name } = newResource;
  const length = Object.keys(newResource).length;

  if (!length) {
    return res.status(400).json({
      message: "Missing resource data.",
      success: false
    });
  }

  if (length > 0 && !name) {
    return res.status(400).json({
      message: "Missing required name field.",
      success: false
    });
  }

  try {
    const resource = await rm.new(newResource);

    if (resource) {
      return res.json({
        resource,
        success: true
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Resources could not be retrieved.",
      success: false
    });
  }
});

module.exports = router;
