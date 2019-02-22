
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function (tbl) {
    // 'id', primary key
    tbl.increments();
    // 'name', text, required, unique
    tbl
      .string('name', 128)
      .notNullable()
      .unique();
    tbl
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExist('students');
};
