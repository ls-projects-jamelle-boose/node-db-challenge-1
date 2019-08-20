const db = require("../database");
const tb = "resources";

exports.list = id => (id ? db(tb).where({ id }) : db(tb));

exports.new = resource => {
  return db(tb)
    .insert(resource)
    .then(([id]) => this.list(id));
};
