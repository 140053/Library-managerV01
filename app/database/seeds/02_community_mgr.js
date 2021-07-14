
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('community_mgr').del()
    .then(function () {
      // Inserts seed entries
      return knex('community_mgr').insert([
       {id:1, name:'College of Agriculture and Natural Resources',description: 'Agriculture', code:'CANR', reg_date:'2020-07-28 01:25:55'},
       {id:2, name:'College of Arts And Science',description: 'Arts and Science', code:'CAS', reg_date:'2020-07-28 01:25:55'},
       {id:3, name:'College of Development Education', description:' Education', code: 'CDE', reg_date:'2020-07-28 01:25:55'},
       {id:4, name:'College of Veterinary Medicine', description:'Vetmed', code:'CVM',  reg_date:'2020-07-28 01:25:55'},
       {id:5, name:'College of Agricultural Engineering and Food Technology', description:'Engineering and Food tech', code:'CEFT',  reg_date:'2020-07-28 01:25:55'},
       {id:6, name:'College of Economics and Managemnt', description:'', code:'CEM', reg_date:'2020-07-28 01:25:55'},
       {id:7, name:'Graduate School', description:'', code:'GS',  reg_date:'2020-07-28 01:25:55'}
      ]);
    });
};
