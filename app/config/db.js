// 'user strict';
require('dotenv').config();
var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : '10.2.42.50',
    user     : 'root',
    password : '140053',
    database : 'webopacwihs'
});


var pmaster = mysql.createConnection({
    host     : '10.2.42.48',
    user     : 'root',
    password : 'DEVINE',
    database : 'db_a274eb_cbsua'
});


connection.connect(function(err) {
    if (err) throw err;
});


var conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

module.exports = {
    connection,
    conn,
    pmaster
}
