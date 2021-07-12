
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '10.2.42.48',
    user     : 'root',//'ken',
    password : 'DEVINE',//'vladimerken2!',
    database : 'db_a274eb_cbsua'
});

connection.connect(function(err) {
    if (err) throw err;
});


//var query = "SELECT count(*) FROM information_schema.TABLES  WHERE (TABLE_SCHEMA = 'webopacwihs') AND (TABLE_NAME = 'serial')";
//var query = "SELECT * FROM db_a274eb_cbsua.serials where accession = 'SER00280'";
var query1 = "SELECT * FROM serial_title where code = ?;";
var q = "DESCRIBE serials"; 

var qq = "SELECT Date_Year,Volume,serials.Code,serials.accession,Serial_Title,ISSN,Agent,Subject FROM db_a274eb_cbsua.serials left join  db_a274eb_cbsua.serial_title on db_a274eb_cbsua.serials.code = db_a274eb_cbsua.serial_title.code where serials.accession = 'SER00280' limit 1;";
try{
    connection.query(query1,'SER00280a', function(err,res){
        console.log(err);
       
        console.log(res);
        
    });
}catch(err){
    console.log(err)
}