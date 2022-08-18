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

    var dt = new Date();
    var datemonth = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  //+"- "+ (("0"+dt.getDate()).slice(-2))
    var query = "SELECT count(*) as patron FROM `clientlog`  where Petsa like '" +  datemonth  + "-%' ;"

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
