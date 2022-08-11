var environment = 'metadataholderV2' //process.env.P_STATUS;

var config = require('../../knexfile')[environment];
module.exports = require('knex')(config);