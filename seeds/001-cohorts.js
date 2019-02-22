
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries, reset ids
  return knex('cohorts')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'web14'},
        {name: 'web15'},
        {name: 'web16'},
        {name: 'web17'},
      ]);
    });
};
