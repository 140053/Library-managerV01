var environment = 'development' //process.env.P_STATUS;

var config = require('../../knexfile')['development'];

module.exports = require('knex')(config);