const db = require("../database");
const tb = "projects";

exports.list = id => {
  if (id) {
    return db(tb)
      .where({ id })
      .first()
      .then(project => ({
        ...project,
        completed: project.completed === true ? true : false
      }));
  }

  return db(tb).then(projects =>
    projects.map(project => ({
      ...project,
      completed: project.completed === true ? true : false
    }))
  );
};

exports.listTasks = id => {
  if (id) {
    return db("tasks")
      .where({ id })
      .first()
      .then(task => ({
        ...task,
        completed: task.completed === true ? true : false
      }));
  }

  return db("tasks").then(tasks =>
    tasks.map(task => ({
      ...task,
      completed: task.completed === true ? true : false
    }))
  );
};

exports.new = project => {
  return db(tb)
    .insert(project)
    .then(([id]) => this.list(id));
};

exports.newTask = task => {
  return db("tasks")
    .insert(task)
    .then(([id]) => this.listTasks(id));
};

exports.newResource = resource => {
  return db("project_resources")
    .insert(resource)
    .then(() => this.resources(resource.project_id));
};

exports.resources = id => {
  return db("project_resources as pr")
    .select(
      "p.name as project_name",
      "p.description as project_description",
      "r.name",
      "r.description"
    )
    .join("projects as p", "p.id", "project_id")
    .join("resources as r", "r.id", "resource_id")
    .where({ project_id: id });
};

exports.rm = id =>
  db(tb)
    .where({ id })
    .del();

exports.tasks = id => {
  return db("tasks as t")
    .select(
      "p.name as project_name",
      "p.description as project_description",
      "t.description",
      "notes",
      "t.completed"
    )
    .join("projects as p", "p.id", "project_id")
    .where({ project_id: id });
};

exports.update = (project, id) => {
  return db(tb)
    .where({ id })
    .update(project)
    .then(() => this.list(id));
};
