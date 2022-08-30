'user strict';
const knex = require('../database/knex-pmaster');
const knexmain = require('../database/knex');

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

/**
 knexmain.insert([
 {Name: data.Name},
 {Degree_Course: data.Degree_Course},
 {User_class: data.User_class},
 {Year_Level: data.Year_Level},
 {IDnum: data.IDnum},
 {branch: data.branch},
 {gender: data.gender}
 ])
 .into('patronlog')
 **/

Task.ingestpatronmodel = async function (data ,result){
    await knex
        /**
        .insert([
            {Name: data.name},
            {Address: data.address},
            {Degree_Course: data.Kurso},
            {IDnum: data.IDnum},
            {Year_Level: data.year},
            {User_class: data.group},
            {branch: data.branch},
            {gender: data.gender}
        ]).into("client")
        **/
        .raw("INSERT INTO client ( Name, Degree_Course, IDnum, Address, Year_Level, User_class, DateApplied, DateExpired, branch, gender) VALUES ( '" + data.name + "','" + data.Kurso + "','" + data.IDnum + "','" + data.address + "','" + data.year + "','" + data.group + "','" + data.dateapplied + "','" + data.dateexpired + "','" + data.branch + "','" + data.gender + "' )")
        .then(function(res1){
            result(null, res1);
        });
}

Task.regesterpatronmodel = async function (data ,result){
    await knex
        .raw("INSERT INTO client ( Name, Degree_Course, IDnum, Address, Year_Level, User_class, branch, gender,telephone) VALUES ( '" + data.name + "','" + data.Kurso + "','" + data.IDnum + "','" + data.address + "','" + data.year + "','" + data.group + "','PILI Library','" + data.gender + "','" + data.phone + "' )")
        .then(function(res1){
            result(null, res1);
        });
}

Task.getfrompatronlogbyDate = function (daterange, result){

    knexmain.select()
        .from('patronlog')
        .whereBetween('reg_date', [daterange.datefrom + "%" , daterange.dateto + "%"])
        .then(function(res1){
            result(null, res1);
        });
}

Task.updatePatronmodel = async  function(data, result){
    await knex.raw("UPDATE clients set Name = '" +data.name + "', Degree_Course = '" +data.Kurso + "', ")
        .then(function(res1){
            result(null, res1);
        });
}

Task.getPatron = function (keyword, result){
    var newkey = '%' + keyword.replace(/\s+/g, '%').toLowerCase() + '%'
    knex.raw("SELECT * FROM client where Name like ? or IDnum like ? ;", [newkey, newkey])
        .then(function (res){
            result(null, res);
        })
}

Task.getPatron_one = function (keyword, result){
    var newkey = '%' + keyword + '%'
    knex.select()
        .from('client')
        .where('IDnum','like', newkey)
        .limit(1)
        .then(function (res){
            result(null, res);
        })
}
Task.delPatronByIDModel = function (ID, result){
    knex('client')
        .where('IDnum', ID)
        .del()
        .then(function (res){
            result(null, res);
        })

}




Task.GetStudentInfo = function (IDnum, result) {
    /**
    sql.pmasterv2.query("SELECT * FROM db_a78e30_cbsuadb.client where IDnum like = ? ", IDnum, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
     **/
    knex.select()
        .from('client')
        .where('IDnum',IDnum)
        .then(function(res1){
            result(null, res1);
        });

};

Task.checkLogin = function (IDnum, location, result){
    if (process.env.LOGIN_SYSTEM_MODE == 'inout') {
        knexmain.select()
            .from('patronlog')
            .where('mode', 'in')
            .andWhere('IDnum',IDnum)
            .andWhere('branch', location)
            //.orderBy('reg_date', "desc")
            .limit(1)
            .then(function (res){
                result(null, res)
                //console.log('checklogin')
                //console.log(res)
            })
    }else if (process.env.LOGIN_SYSTEM_MODE == 'in'){
        knexmain.select()
            .from('patronlog')
            //.where('mode', 'in')
            .andWhere('IDnum',IDnum)
            .orderBy('reg_date', "desc")
            .limit(1)
            .then(function (res){
                result(null, res)
            })
    }


}

Task.SaveRecord = function (data, mode, location){
        if (mode == 'in'){
            knexmain.raw("INSERT INTO patronlog (Name, Degree_Course, User_class, IDnum, branch, gender, mode) VALUES ( '" + data.Name + "' , '" + data.Degree_Course + "' , '" + data.User_class + "' ,  '" + data.IDnum + "', '" + location + "', '" + data.gender + "','"+ mode +"')")
                .then(function(resp) {
                    //console.log(resp)
                });
        }else if (mode == 'out') {
            //console.log('confirm out ')
            //console.log(data)

            knexmain.raw("UPDATE patronlog SET `reg_out` = CURRENT_TIMESTAMP, modeout = 'out' WHERE id = '"+ data.id +"';")
                .then(function(resp) {
                    console.log(resp)
                });
        }
}

//PATRON LOG
Task.getPatronlogBYCourse = function (curdate,location, result){

    var dt = new Date();
    var datemonth = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  //+"- "+ (("0"+dt.getDate()).slice(-2))
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +"-"+ (("0"+dt.getDate()).slice(-2))

    if(location == 'Gender') {
        knexmain.raw("SELECT gender, count(*) as cnt FROM patronlog where reg_date like '" + datemonth + "-%' group by gender ")
            .then(function (resp) {
                result(null, resp)
            });
    }else if (location == 'GROUP'){
        knexmain.raw("SELECT User_Class as gender, count(*) as cnt FROM patronlog where reg_date like '" + datemonth + "-%' group by User_Class ")
            .then(function (resp) {
                result(null, resp)
            });
    }else if( location == 'LIBRARY'){
        knexmain.raw("SELECT branch as gender, count(*) as cnt FROM patronlog where reg_date like '" + datemonth + "-%' group by branch ")
            .then(function (resp) {
                result(null, resp)
            });

    }else {
        //console.log(datemonth2)
        //knexmain.raw("SELECT Degree_Course, count(*) as login FROM patronlog WHERE reg_date between '"+ datemonth +"-01%' and '"+ datemonth + "-31%" +"' and branch = '"+ location +"'  group by Degree_Course  ;")
        knexmain.raw("SELECT Degree_Course, count(*) as login FROM patronlog WHERE reg_date like '"+ datemonth2 +"%' and branch = '"+ location +"'  group by Degree_Course  ;")
            .then(function(resp) {
                result(null, resp)
            });
    }


}

//INHOUSE LOG
Task.getInHouseByType = function (type, result){
    var dt = new Date();
    var datemonth = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  //+"- "+ (("0"+dt.getDate()).slice(-2))
    switch (type){
        case 'book':
            knexmain.raw("SELECT count(*) as book FROM ihubk WHERE reg_date between '" + datemonth + '-01%' + "' and '" + datemonth + '-31%' + "';")
                .then(function(resp) {
                    result(null, resp)
                });
            break;
        case 'thesis':
            knexmain.raw("SELECT count(*) as thesis FROM ihutd WHERE reg_date  between '" + datemonth + '-01%' + "' and '" + datemonth + '-31%' + "';")
                .then(function(resp) {
                    result(null, resp)
                });
            break;
        case 'serials':
            knexmain.raw("SELECT count(*) as serials FROM SSIHS WHERE reg_date  between '" + datemonth + '-01%' + "' and '" + datemonth + '-31%' + "';")
                .then(function(resp) {
                    result(null, resp)
                });
            break;
        case 'patron':
            knexmain.raw("SELECT count(*) as patron FROM patronlog WHERE reg_date  between '" + datemonth + '-01%' + "' and '" + datemonth + '-31%' + "';")
                .then(function(resp) {
                    result(null, resp)
                });
            break;
    }

}


module.exports= Task;