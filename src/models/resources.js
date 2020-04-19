const db = require('../database');
const Resources = db('resources');

exports.list = (id) => (id ? Resources.where({ id }) : Resources);

exports.new = async (resource) => {
  const [id] = await Resources.insert(resource);
  return await this.list(id);
};
