const db = require('../database');

const Projects = db('projects'),
  Tasks = db('tasks'),
  ProjectResources = db('project_resources');

// TODO refactor project models
exports.list = async (id) => {
  if (id) {
    const project = await Projects.where({ id }).first();
    return {
      ...project,
      completed: project.completed === true ? true : false,
    };
  }

  const projects = await Projects;
  return projects.map((project_1) => ({
    ...project_1,
    completed: project_1.completed === true ? true : false,
  }));
};

exports.listTasks = async (id) => {
  if (id) {
    const task = await Tasks.where({ id }).first();
    return {
      ...task,
      completed: task.completed === true ? true : false,
    };
  }

  const tasks = await Tasks;
  return tasks.map((task_1) => ({
    ...task_1,
    completed: task_1.completed === true ? true : false,
  }));
};

exports.new = async (project) => {
  const [id] = await Projects.insert(project);
  return await this.list(id);
};

exports.newTask = async (task) => {
  const [id] = await Tasks.insert(task);
  return await this.listTasks(id);
};

exports.newResource = async (resource) => {
  await ProjectResources.insert(resource);
  return await this.resources(resource.project_id);
};

exports.resources = (id) => {
  return db('project_resources as pr')
    .select(
      'p.name as project_name',
      'p.description as project_description',
      'r.name',
      'r.description'
    )
    .join('projects as p', 'p.id', 'project_id')
    .join('resources as r', 'r.id', 'resource_id')
    .where({ project_id: id });
};

exports.rm = (id) => Projects.where({ id }).del();

exports.tasks = (id) => {
  return db('tasks as t')
    .select(
      'p.name as project_name',
      'p.description as project_description',
      't.description',
      'notes',
      't.completed'
    )
    .join('projects as p', 'p.id', 'project_id')
    .where({ project_id: id });
};

exports.update = async (project, id) => {
  await Projects.where({ id }).update(project);
  return await this.list(id);
};
