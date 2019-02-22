
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function (tbl) {
    // 'id', primary key
    tbl.increments();
    // 'name', text, required
    tbl
      .string('name', 128)
      .notNullable()
      .unique()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExist('cohorts');
};
