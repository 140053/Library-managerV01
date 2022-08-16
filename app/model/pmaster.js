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
    
    var d = new Date();
    var a,b,c;
    a= d.getFullYear();
    b= d.getMonth();
    c = d.getDay();
   //var query = "SELECT count(*) as total FROM "+ table +" where reg_date between '" + a + "-" + b + "-1"  + "' and '" + a + "-" + b + "-31"  + "' ;"


   // var taon = d.getFullYear;
   //var bulan = d.getMonth;
    //var aldaw = d.getDay
    var query = "SELECT count(*) as patron FROM `clientlog`  where Petsa between '" + a + "-" + b + "-1"  + "' and  '" + a + "-" + b + "-31"  + "' ;"

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
