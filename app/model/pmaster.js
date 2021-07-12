//'user strict';
const { isString } = require('lodash');
//const { result } = require('lodash');
var sql = require('../config/db');

var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};


Task.get_Loggedin =  function(table, result){
 
    //var d = new Date();
    
   // var taon = d.getFullYear;
   //var bulan = d.getMonth;
    //var aldaw = d.getDay
    var query = "SELECT count(*) as patron FROM `clientlog`  where Petsa between '2021-01-01' and '2021-01-31';"

    //console.log(taon);
    try{
        
       sql.pmaster.query(query, function(err,res){
            
            if(err){
                result('error',null);
            }else{
                result(null, res);
            }
            
        });
    }catch(err){
        result(err,null);
    }



}







module.exports= Task;
