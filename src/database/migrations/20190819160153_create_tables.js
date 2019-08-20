exports.up = kn =>
  kn.schema
    .createTable("projects", tb => {
      tb.increments();

      tb.string("name")
        .notNullable()
        .unique();

      tb.string("description");

      tb.boolean("completed").defaultTo(false);
    })
    .createTable("resources", tb => {
      tb.increments();

      tb.string("name")
        .notNullable()
        .unique();

      tb.string("description");
    })
    .createTable("project_resources", tb => {
      tb.integer("project_id")
        .unsigned()
        .notNullable()
        .references("projects.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tb.integer("resource_id")
        .unsigned()
        .notNullable()
        .references("resources.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tb.primary(["project_id", "resource_id"]);
    })
    .createTable("tasks", tb => {
      tb.increments();

      tb.string("description").notNullable();

      tb.string("notes");

      tb.boolean("completed").defaultTo(false);

      tb.integer("project_id")
        .unsigned()
        .notNullable()
        .references("projects.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });

exports.down = kn => {
  return kn.schema
    .dropTableIfExists("tasks")
    .dropTableIfExists("project_resources")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
