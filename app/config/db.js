// 'user strict';
require('dotenv').config();
var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});


var pmaster = mysql.createConnection({
    host     : process.env.DB_HOST_2,
    user     : process.env.DB_USER_2,
    password : process.env.DB_PASSWORD_2,
    database : process.env.DB_DATABASE_2,
});

var pmasterv2 = mysql.createConnection({
    host     : process.env.DB_HOST_2,
    user     : process.env.DB_USER_2,
    password : process.env.DB_PASSWORD_2,
    database : process.env.DB_DATABASE_3,
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
