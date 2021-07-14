
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('subcommunity_mgr').del()
    .then(function () {
      // Inserts seed entries
      return knex('subcommunity_mgr').insert([
       {id:1, parent:'CANR', sibling:'', name:'Bachelor of Science in Agriculture Major', code:'BSA',description:'',reg_date:'2020-08-05 01:10:34'}
      ]);
    });
};
