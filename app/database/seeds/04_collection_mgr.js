
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('collection_mgr').del()
    .then(function () {
      // Inserts seed entries
      return knex('collection_mgr').insert([
        {id:1, parent:'BSA', name:'Animal Science', code:'ANSCI', description:'', reg_date: '2020-08-05 01:40:29'}
      ]);
    });
};
