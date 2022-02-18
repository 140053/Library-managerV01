//'user strict';
const { isString } = require('lodash');
//const { result } = require('lodash');
var sql = require('../config/db');

var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};



Task.getThesis = async  function(daterange ,result) {
    var query = "SELECT count(*) as Total FROM webopacwihs.ihutd where reg_date between '021-8-18' and  '2021-8-19';";
    //var code1 = "%" + barcode +"%";
    try{
        //sql.connection.query(query,code, function(err,res){
        sql.connection.query(query, function(err,res){
            if(err){
                result(true,null);
            }else{
               // console.log(res );

                if(res == ''){
                   // console.log('empty')
                    result(null, '');
                }else{
                    result(null, res);
                }

            }
        });
    }catch(err){
        result(err,null);
    }

}



module.exports= Task;