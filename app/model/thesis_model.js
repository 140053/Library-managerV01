//'user strict';
const { isString } = require('lodash');
//const { result } = require('lodash');
var sql = require('../config/db');

var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};


Task.check_if_exist_td = async  function(table ,result) {
    var query = "SELECT count(*) as exist FROM information_schema.TABLES  WHERE (TABLE_SCHEMA = 'webopacwihs') AND (TABLE_NAME = '" + table + "')";
    var query1 = "DESCRIBE "+table;
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


Task.create_table= async  function(table ,result) {
    var query = "CREATE TABLE "+ table +" (  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT, `title` VARCHAR(225) NOT NULL, `author` VARCHAR(225)  NULL, `lokayon` VARCHAR(255)  NULL, `info` VARCHAR(255)  NULL, `call_number` VARCHAR(255)  NULL, `katers` VARCHAR(255)  NULL, `taon` VARCHAR(255)  NULL, `barcode` VARCHAR(255)  NULL, `abstract` TEXT , `kurso` VARCHAR(255)  NULL, `institution` VARCHAR(255)  NULL, `accession_number` VARCHAR(255)  NULL,`subjek` VARCHAR(255)  NULL, `reg_date` TIMESTAMP  NULL, PRIMARY KEY(`id`) )ENGINE = InnoDB;";
      
        //console.log(query);
    try{
        sql.connection.query(query, function(err,res){
        
            if(err){
                result('error','error ');
            }else{
                result(null, 'success ');
            }
        });
    }catch(err){
        result(err,null);
    }
        
}



Task.drop_table= async  function(table ,result) {
    var query = "DROP TABLE " + table;
    console.log(query);

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

//select from pmaster


Task.get_td_metadata = async function(table,barcode , result) {
    var query = "Select * From " + table + " Where Maintext like ? and Maintext like '%TDS%'";
    var code = "%" + barcode +"%";

    //console.log(query);
    try{
        sql.pmaster.query(query,code, function(err,res){
        
            if(err){
                result(true,null);
            }else{
                //console.log(res );

                if(res == ''){
                    console.log('empty')
                    result(null, '');
                }else{
                    result(null, res[0].Maintext);
                }

            }
        });
    }catch(err){
        result(err,null);
    }
}

/*
<001>Cattle management practices of backyard raisers in Ocampo, Camarines Sur▲<002>Roman, Kenneth B.▲<003>Central Bicol State University of Agriculture▲<004>Bachelor of Science in Agriculture major in Animal Science▲<005>2018▲<006>46 p.▲<007>TDS AgSc 636.2 R6611 2018▲<008>T0005785▲<009>English▲<0010>TDS▲<0011>13142▲<0012>Cattle management - backyard raiser - Ocampo, Camarines Sur▲<0013>The study was conducted at the different barangay of the Municipality of Ocampo, Camarines Sur from December 2017 to January 2018. The study aimed to (a) to determine the demographic profile of the backyard cattle raiser in Ocampo, Camarines Sur (b); Evaluate the existing management practices of backyard cattle raiser in the locality; (c) determine the best management practices employed by Ocampo cattle raiser (d); identify the problems encountered by backyard cattle raising and suggest possible recommendation,
(e) Identify the solution practiced by the raiser in their problems.
One hundred fifteen (115) respondents were involved in the study. Most of the backyard cattle raisers aging 41-50 years old, commonly males. More than ninety-eight percent (98.26%) of the respondents raising 1-3 heads of cattle. Most of the respondents rely on 
their experience (90.43%). One
xii
hundred percent (100%) of the respondents raised cattle intended for additional source of income.
Majority (85.22%) of the respondents raised Philippine native cattle, (97.39%) used natural breeding method. And majority (100%) of the cattle raiser use tethering method on managing their cattle.
▲<0014>1▲<0015>1▲<0016>0▲<0017>Thesis▲
*/


var decondata = function(metadata,from,to){
    var aa = metadata.split(from);
    var bb = aa[1].split(to);
    return bb[0].replace('\u001e','');
}

Task.process_metada = function(metadata ,result){

    var data = metadata;
    //var aa = data.split('<002>');
    //var bb = aa.split('<002>');
    var title = decondata(data,'<001>','<002>');
    var author = decondata(data,'<002>','<003>');
    var institution = decondata(data,'<003>','<004>');
    var course = decondata(data,'<004>','<005>');
    var publication = decondata(data,'<005>','<006>');
    var info = decondata(data,'<007>','<008>');
    var barcode = decondata(data,'<008>','<009>');
    var subject = decondata(data,'<0012>','<0013>');
    var abstract = decondata(data,'<0013>','<0014>');
    var alldata = {
        Title: title,
        Author: author,
        Institution: institution,
        Course: course,
        Publication: publication,
        Info: info,
        Barcode: barcode,
        Subject: subject,
        Abstract: abstract
    }

    result(null, alldata );

   

}

Task.Insert_into = function(data ,result){
    
    var datas = [data.Title, data.Author, data.Info, data.Barcode,data.Abstract,data.Course];
    var query = "Insert Into thesis ( title, author,  call_number, barcode, abstract, kurso) VALUES ('"+ data.Title +"','"+ data.Author +"','"+ data.Info +"','"+ data.Barcode +"','"+ data.Abstract +"','"+ data.Course +"')";
    try{
        sql.connection.query(query, function(err,status,){
          
            if(err){
                console.log(err)
                result(true,null);
            }else{
                
                result(null, true);
            }
        });
    }catch(err){
        result(err,null);
    }
}











/*
[
  RowDataPacket {
    Title: 'Cattle management practices of backyard raisers in Ocampo, Camarines Sur',
    Maintext: '<001>Cattle management practices of backyard raisers in Ocampo, Camarines Sur\u001e<002>Roman, Kenneth B.\u001e<003>Central Bicol State University of Agriculture\u001e<004>Bachelor of Science in Agriculture major in Animal Science\u001e<005>2018\u001e<006>46 p.\u001e<007>TDS AgSc 636.2 R6611 2018\u001e<008>T0005785\u001e<009>English\u001e<0010>TDS\u001e<0011>13142\u001e<0012>Cattle management - backyard raiser - Ocampo, Camarines Sur\u001e<0013>The study was conducted at the different barangay of the Municipality of Ocampo, Camarines Sur from December 2017 to January 2018. The study aimed to (a) to determine the demographic profile of the backyard cattle raiser in Ocampo, Camarines Sur (b); Evaluate the existing management practices of backyard cattle raiser in the locality; (c) determine the best management practices employed by Ocampo cattle raiser (d); identify the problems encountered by backyard cattle raising and suggest possible recommendation,\r\n' +
      '(e) Identify the solution practiced by the raiser in their problems.\r\n' +
      'One hundred fifteen (115) respondents were involved in the study. Most of the backyard cattle raisers aging 41-50 years old, commonly males. More than ninety-eight percent (98.26%) of the respondents raising 1-3 heads of cattle. Most of the respondents rely on their experience (90.43%). One\r\n' +
      'xii\r\n' +
      'hundred percent (100%) of the respondents raised cattle intended for additional source of income.\r\n' +
      'Majority (85.22%) of the respondents raised Philippine native cattle, (97.39%) used natural breeding method. And majority (100%) of the cattle raiser use tethering method on managing their cattle.\r\n' +
      '\u001e<0014>1\u001e<0015>1\u001e<0016>0\u001e<0017>Thesis\u001e',
    Fil: 0,
    Ref: 0,
    Bio: 0,
    Fic: 0,
    Res: 0,
    Copy: 1,
    Inn: 1,
    t_Out: 0,
    t_TimesOut: 0,
    images: null,
    tm: 'td',
    gc: 0,
    tr: 0,
    easy: 0,
    circ: 0,
    fr: 0,
    sm: 0,
    entered_by: 'anne',
    date_entered: 2018-09-18T08:40:29.000Z,
    updated_by: 'ken',
    date_updated: 2018-11-09T00:51:06.000Z,
    schl: 0,
    bkID: 25077
  }
]


*/




Task.del_content_by_ID= async  function(id,table ,result) {
    var query = "DELETE FROM " + table +" WHERE id ='"+ id +"'";
    console.log(query);
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



Task.CountonInTable =  function(table, result){
 
    var d = new Date();
    var a,b,c;
    a= d.getFullYear;
    b= d.getMonth;
    c = d.getDay
    var query = "SELECT count(*) as total FROM "+ table +" where reg_date between '2021-01-01' and '2021-01-31';"

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



Task.save_to_main_table = async function( table,date, result){
    //date = { table: 'thesis', daterange: '2022-01-19' }


    console.log('__________________________________________________' + date + '__________________________________________________________________')
    var query = ''
    if (date !== null){
        console.log('__________________________________________________ date is not null__________________________________________________________________')
       //query = "INSERT INTO ihutd ( title, author, call_number, barcode, abstract, kurso, reg_date ) SELECT  title, author, call_number, barcode, abstract, kurso, '2022-01-17 10:00:00' FROM thesis;"
        query = "INSERT INTO ihutd ( title, author, call_number, barcode, abstract, kurso, reg_date ) SELECT  title, author, call_number, barcode, abstract, kurso, '" + date + " 10:00:00' FROM thesis;"
    }else {
        console.log('__________________________________________________ date is null__________________________________________________________________')
        query = "INSERT INTO ihutd ( title, author, call_number, barcode, abstract, kurso, reg_date ) SELECT  title, author, call_number, barcode, abstract, kurso, reg_date FROM thesis;"
    }
// --------------------------- Working in this hahahaha
    try{
        sql.connection.query(query, function(err,res){
            console.log(err);
            
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

Task.updateDaterange = async function(daterange, table){
    var query = "UPDATE webopacwihs."+ table + " set reg_date = "+ "'" + daterange+ "'";

    try{
       await sql.connection.query(query, function(err,res){
            console.log(err);

            if(err){
                console.log('false');
                //res('error',null);
            }else{
               // res(null, true);
                console.log('true');
            }

        });
    }catch(err){
        //res(err,null);
    }
}




Task.check_record_in =  function(table, result){
 
    var d = new Date();
    var a,b,c;
    a= d.getFullYear;
    b= d.getMonth;
    c = d.getDay
    var query = "SELECT count(*) as total FROM "+ table +" ;"

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
    //console.log(year + "-" + month + "-" + date);


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




module.exports= Task;


