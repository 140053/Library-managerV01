
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('auser').del()
    .then(function () {
      // Inserts seed entries
      return knex('auser').insert([
        {id: 1, name: 'admin', lastname: 'test', StudentID: 'null', Gender: 'Male', Kurso: 'null', username: 'admin@local.a', password: 'ken', auth: '99', reg_date: '2021-02-02 00:38:34', last_login: '2021-02-02 00:38:34'},
        {id: 2, name: 'demo', lastname: 'client', StudentID: 'null', Gender: 'Male', Kurso: 'null', username: 'demo@local.a', password: 'ken', auth: null, reg_date: '2021-02-02 00:38:34', last_login: '2021-02-02 00:38:34'}             
      ]);
    });
};
