const router = require("express").Router();
const pm = require("../models/projects");

router.get("/", async (req, res) => {
  try {
    let projects = await pm.list();

    if (!projects.length) {
      return res.status(404).json({
        message: "No projects.",
        success: false
      });
    }

    return res.json({
      projects,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Projects could not be retrieved.",
      success: false
    });
  }
});

router.post("/", async (req, res) => {
  const newProject = req.body;
  const { name } = newProject;
  const length = Object.keys(newProject).length;

  if (!length) {
    return res.status(400).json({
      message: "Missing project data.",
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
    const project = await pm.new(newProject);

    if (project) {
      return res.json({
        project,
        success: true
      });
    }
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Project could not be saved.",
      success: false
    });
  }
});

router.get("/:id/resources", async (req, res) => {
  const { id } = req.params;

  try {
    const resources = await pm.resources(id);

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
      message: "Project resources could not be retrieved.",
      success: false
    });
  }
});

router.post("/:id/resources", async (req, res) => {
  const { id } = req.params;
  const newResource = req.body;
  const { resource_id } = newResource;
  const length = Object.keys(newResource).length;

  if (!length) {
    return res.status(400).json({
      message: "Missing resource data.",
      success: false
    });
  }

  if (length > 0 && !resource_id) {
    return res.status(400).json({
      message: "Missing require resource_id field.",
      success: false
    });
  }

  try {
    const project_resources = await pm.newResource({
      project_id: id,
      resource_id
    });

    if (project_resources) {
      return res.json({
        project_resources,
        success: true
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Project resource could not be saved.",
      success: false
    });
  }
});

router.get("/:id/tasks", async (req, res) => {
  const { id } = req.params;

  try {
    const tasks = await pm.tasks(id);

    if (!tasks.length) {
      return res.status(404).json({
        message: "No tasks.",
        success: false
      });
    }

    return res.json({
      tasks,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Project tasks could not be retrieved.",
      success: false
    });
  }
});

router.post("/:id/tasks", async (req, res) => {
  const { id } = req.params;
  const newTask = req.body;
  const { description } = newTask;
  const length = Object.keys(newTask).length;

  if (!length) {
    return res.status(400).json({
      message: "Missing task data.",
      success: false
    });
  }

  if (length > 0 && !description) {
    return res.status(400).json({
      message: "Missing required description field.",
      success: false
    });
  }

  try {
    const task = await pm.newTask({
      ...newTask,
      project_id: id
    });

    if (task) {
      return res.json({
        task,
        success: true
      });
    }
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Task could not be saved.",
      success: false
    });
  }
});

module.exports = router;
