'user strict';
//const { result } = require('lodash');
var sql = require('../config/db');

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};


Task.check_if_exist = async  function(table ,result) {
    var query = "SELECT count(*) as exist FROM information_schema.TABLES  WHERE (TABLE_SCHEMA = 'webopacwihs') AND (TABLE_NAME = '" + table + "')";
    var query1 = "DESCRIBE "+table;
    try{
        sql.connection.query(query, function(err,res){
            if(err){
                console.log(err);
                result('error',null);
            }
        
            result(null, res);
        });
    }catch(err){
        result(err,null);
    }
        
}

Task.create_table= async  function(table ,result) {
    var query = "CREATE TABLE "+ table +" (`id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,`date_year` VARCHAR(45) NULL, `copy` VARCHAR(45)  NULL,`kode` VARCHAR(45) NULL,`Date_recieved` VARCHAR(45)  NULL,`title` VARCHAR(255) NULL,`issn` VARCHAR(45)  NULL, `frequ` VARCHAR(45)  NULL, `agent` VARCHAR(45)  NULL, `focus` VARCHAR(45)  NULL,  `subject` VARCHAR(45)  NULL,  `remark` VARCHAR(45)  NULL,     `volume` VARCHAR(45)  NULL,    `accession` VARCHAR(45) NULL,     `reg_date` TIMESTAMP NOT NULL,PRIMARY KEY(`id`))ENGINE = InnoDB;";
    
    try{
        sql.connection.query(query, function(err,res){
        
            result(null, res);
        });
    }catch(err){
        result(err,null);
    }
        
}


Task.drop_table= async  function(table ,result) {
    var query = "DROP TABLE " + table;
    try{
        sql.connection.query(query, function(err,res){
        
            result(null, res);
        });
    }catch(err){
        result(err,null);
    }
        
}


Task.del_content_by_ID= async  function(id,table ,result) {
    var query = "DELETE FROM " + table +" WHERE accession='"+ id +"'";
    try{
        sql.connection.query(query, function(err,res){
                   
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


//get serials title
Task.getserialsinfo = async  function(code ,result) {
    
    var query = "SELECT Date_Year,Volume,serials.Code,serials.accession,Serial_Title,ISSN,Agent,Subject FROM serials left join  serial_title on serials.code = serial_title.code where serials.accession = ? limit 1;";
    try{
        
        sql.pmaster.query(query, code, function(err,res){
            if(err){
                console.log(err);
                result('error',null);
            }else{
                result(null, res);
            }
           
           
        });
    }catch(err){
        result(err,null);
    }
        
}


/*
    Date_Year: '2020/10/03',
    Volume: '35',
    Code: 'PDI',
    accession: 'NWP00301',
    Serial_Title: 'Philippine Daily Inquirer',
    ISSN: '',
    Agent: 'PDI',
    Subject: 'News update'
*/





Task.insertToTemp =async function(data, table ,result){
    //console.log(data);
    var query11  = "INSERT INTO " + table + " ( date_year,Volume,kode,accession,title,issn,agent,subject) VALUES ( '"+data[0].Date_Year+"','"+ data[0].Volume+"','"+data[0].Code+"','"+ data[0].accession+"','"+ data[0].Serial_Title+"','"+data[0].ISSN+"','"+data[0].Agent+"','"+data[0].Subject+"')";
    var query  = "INSERT INTO " + table + " ( date_year,Volume,kode,accession,title,issn,agent,subject) VALUES ( ?,?,?,?,?,?,?,?)";
    //[ data[0].Date_Year,data[0].Volume, data[0].Code, data[0].accession, data[0].Serial_Title, data[0].ISSN, data[0].Agent, data[0].Subject ],
    
    try{
        
        sql.connection.query(query,[ data[0].Date_Year,data[0].Volume, data[0].Code, data[0].accession, data[0].Serial_Title, data[0].ISSN, data[0].Agent, data[0].Subject ],  function(err,res){
            if(err){
                result('error',null);
            }
            result(null, 'success');
        });
    }catch(err){
        result(err,null);
    }
    
}


//select all in serials

Task.select_all_from = async function(table, result){
    var query = "Select * FROM "+ table;

    try{
        
        await sql.connection.query(query, function(err,res){
            if(err){
                result('error',null);
            }else{
                console.log(res.lenght)
                result(null, res);
            }
        });
    }catch(err){
        result(err,null);
    }

}

//save to main table

Task.save_to_main_table = async function( table,date, result){
    console.log('__________________________________________________' + date + '__________________________________________________________________')
    var query = ''
    if (date !== null){
        var query = "INSERT INTO SSIHS (date_year, copy,kode,Date_recieved,title,issn,frequ,agent,focus,subject,remark,volume,accession, reg_date) SELECT date_year, copy,kode,Date_recieved,title,issn,frequ,agent,focus,subject,remark,volume,accession ,'" + date + " 10:00:00' FROM serials;"

    }else {
        var query = "INSERT INTO SSIHS (date_year, copy,kode,Date_recieved,title,issn,frequ,agent,focus,subject,remark,volume,accession) SELECT date_year, copy,kode,Date_recieved,title,issn,frequ,agent,focus,subject,remark,volume,accession FROM serials;"

    }


    try{
        sql.connection.query(query, function(err,res){
            console.log(err)
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

Task.CountonInTable =  function(table, result){
 
    var d = new Date();
    var a,b,c;
    a= d.getFullYear();
    b= d.getMonth();
    c = d.getDay();
    var query = "SELECT count(*) as total FROM "+ table +" where reg_date between '" + a + "-" + b + "-1"  + "' and '" + a + "-" + b + "-31"  + "' ;"

    try{
        
       sql.connection.query(query, function(err,res){
            
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

Task.CountonInTable_m =  function(table, result){
 
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();
    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    // prints date in YYYY-MM-DD format
    console.log(year + "-" + month + "-" + date);


    var query1 = "SELECT count(*) as total FROM "+ table +" where reg_date like '"+ year +"-"+ month +"-%'";
    var query = "SELECT count(*) as total FROM "+ table +" where reg_date between '"+ year +"-"+ month +"-"+ date +"%' and '"+ year +"-"+ month +"-"+ date +"%';"
//console.log(query)
    try{
        
       sql.connection.query(query1, function(err,res){
            
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










/**
Task.createTask = function (newTask, result) {    
        sql.connection.query("INSERT INTO tasks set ?", newTask, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};
Task.getTaskById = function (taskId, result) {
    sql.conn.query("Select * from ihutd where id = ? ", taskId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
Task.getAllTask = function (result) {
    sql.connection.query("Select * from tasks", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res);  

                 result(null, res);
                }
            });   
};

Task.getAllTask_1 = function (result) {
    sql.conn.query("Select * from ihutd", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  //console.log('tasks : ', res);  

                 result(null, res);
                }
            });   
};
Task.updateById = function(id, task, result){
    sql.connection.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Task.remove = function(id, result){
    sql.connection.query("DELETE FROM tasks WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};
*/
module.exports= Task;
