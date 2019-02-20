
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries, reset ids
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Ann', cohort_id: 1},
        {name: 'Beth', cohort_id: 1},
        {name: 'Chris', cohort_id: 1},
        {name: 'Don', cohort_id: 1},
        {name: 'Ebert', cohort_id: 2},
        {name: 'Frank', cohort_id: 2},
        {name: 'Gale', cohort_id: 2},
        {name: 'Hallie', cohort_id: 2},
        {name: 'Ian', cohort_id: 3},
        {name: 'Jim', cohort_id: 3},
        {name: 'Kim', cohort_id: 3},
        {name: 'Lea', cohort_id: 3},
        {name: 'Mark', cohort_id: 4},
        {name: 'Nelly', cohort_id: 4},
        {name: 'Ork', cohort_id: 4},
        {name: 'Pat', cohort_id: 4},
      ]);
    });
};
