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

Task.getRandomID = function (result){
    knex.raw("SELECT  IDnum FROM db_a78e30_cbsuadb.client where Degree_Course is not null and Degree_Course not like 'PH%' and Degree_Course not like 'PH%' order by rand() Limit 1;")
        .then(function(res1){
            //console.log(res1[0])
            result(null, res1[0]);
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

//lenders password

Task.getCountLendMaterials = function (result){

    var dt = new Date();
    //var datemonth = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  //+"- "+ (("0"+dt.getDate()).slice(-2))
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +"-"+ (("0"+dt.getDate()).slice(-2))



    knexmain.raw("SELECT boardorequip, count(*) as cnt FROM webopacwihs.lending_mater where reg_date like '" + datemonth2 + "%';")
        .then(function (board){
            result(null, board[0]);
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

//getpatron
Task.getpatronbyIDTotaday = function (id, result){
    var dt = new Date();
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +"-"+ (("0"+dt.getDate()).slice(-2)) + '%'
    knexmain.select()
        .from('patronlog')
        .where('IDnum',id)
        .andWhere('reg_date', 'like', datemonth2)
        .limit(1)
        .then(function(resp) {
            result(null, resp)

        });

}

Task.ListPatronToday = function(result){
    var dt = new Date();
    var datemonth = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  //+"- "+ (("0"+dt.getDate()).slice(-2))
    var datemonth2 = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  +"-"+ (("0"+dt.getDate()).slice(-2)) + '%'


    knexmain.select()
        .from('patronlog')
        .where('reg_date', 'like', datemonth2)

        .limit(20)
        .then(function(resp) {
            result(null, resp)
        });
}


Task.ingestLendingMater = function (data, result){
    /*
                                                                                                                                            {"sname":"kenneth Roman","idnum":"00-0000","course":"BSA-AN SCI","action":"borrow","boardorequip":"boardgames","boardgames":"scrabble","boardgamesbcode":"GM1"}
    */
    var ches = "INSERT INTO `webopacwihs`.`lending_mater`(`sname`,`IDnum`,`course`,`action`,`boardorequip`,`boardgames`,`boardgamesbcode`)VALUES ('" + data.sname + "','" + data.idnum + "','"+ data.course +"' ,'"+ data.action +"', '"+ data.boardorequip +"','"+data.boardgames+"','"+data.boardgamesbcode+"')"
    var equip = "INSERT INTO `webopacwihs`.`lending_mater`(`sname`,`IDnum`,`course`,`action`,`boardorequip`,`eqipname`) VALUES ('" + data.sname + "','" + data.idnum + "','"+ data.course +"' ,'"+ data.action +"','"+ data.boardorequip +"', '"+ data.eqipname +"')"
    var room = "INSERT INTO `webopacwihs`.`lending_mater`(`sname`,`IDnum`,`course`,`action`,`rooms`,`dateforreserv`, `refrom`, `reto`, `people`) VALUES ('" + data.sname + "','" + data.idnum + "','"+ data.course +"' ,'"+ data.action +"', '"+ data.rooms +"','"+data.dateforreserv+"','"+data.refrom+"','"+data.reto +"','"+ data.people +"')"
    if(data.action === 'borrow'){
        var sql
        if(data.boardorequip == 'equipment'){
            sql = equip
        }
        if(data.boardorequip == 'boardgames'){
            sql = ches
        }
        knexmain.raw(sql)
            .then(function(resp) {
                result(null, resp)
            });
    }else if(data.action === 'reserve'){
        knexmain.raw(room)
            .then(function(resp) {
                result(null, resp)
            });
    }else {
        result(null, 'null')
    }
}


Task.getlenderbycategory = function (category, result){
    var ches = "SELECT * FROM webopacwihs.lending_mater where boardorequip = 'boardgames' and status is null order by id desc;"
    var equip = "SELECT * FROM webopacwihs.lending_mater where boardorequip = 'equipment';"
    var room = "SELECT * FROM webopacwihs.lending_mater where action = 'reserve';"
    var sql ;
    if (category == 'board'){
        //console.log('board')
        knexmain.raw(ches)
            .then(function(resp) {
                result(null, resp)
            });
    }


}

Task.returnLenderbyCategory = function (data, result) {
    var ches = "UPDATE webopacwihs.lending_mater SET status = 'return' Where id = '" + data.IDnum + "' and boardgamesbcode ='" + data.Barcode + "'";

    if (data.Barcode != '') {
        knexmain.raw(ches)
            .then(function (resp) {
                result(null, resp)
            });
    }
}

Task.returnLenderbyCategoryv2_1 = function (data, result) {

    var ches = "UPDATE webopacwihs.lending_mater SET status = 'return' Where boardgamesbcode ='" + data.id + "' and  status is null";

    if (data.Barcode != '') {
        knexmain.raw(ches)
            .then(function (resp) {
                result(null, resp)
            });
    }
}


Task.approvedeny_room = function (id, result){
    knexmain.raw("UPDATE webopacwihs.lending_mater SET status = 'accept' WHERE id = ?", id)
        .then(function (resp) {
            result(null, resp)
        });

}
Task.approvedeny_room_v2 = function (id,status, result){

    knexmain.raw("UPDATE webopacwihs.lending_mater SET status = '"+ status +"' WHERE id = '"+ id +"'" )
        .then(function (resp) {
            result(null, resp)
        });

}



    //Can change 7 to 2 for longer results.


    Task.SaveLenderRoom = function(data, result){

        let r = (Math.random() + 1).toString(36).substring(7);
        var room = 'INSERT INTO `webopacwihs`.`lending_mater` (`sname`,`IDnum`,`course`,`action`,`rooms`,`dateforreserv`, `refrom`, `reto`, `people`,`purpose`, `keycode`, `email`) VALUES ("' + data.sname + '","' + data.idnum  + '","' +  data.course + '" , "reserve" , "' +  data.rooms + '" , "' + data.dateforreserv + '" , "' + data.refrom + '" , "' + data.reto + '" , "' + data.people + '" , "' + data.purpose + '" , "' + r + '" , "' + data.email + '")';

        //result(null, room)

            knexmain.raw(room)
                .then(function(resp) {
                    result(null, resp)
                });

    }

    Task.getRoomrecordByID = function(id, result){
    //id, dateforreserv, refrom, reto, sname, status

        var sql = "SELECT *  FROM webopacwihs.lending_mater where action = 'reserve' and id = '" + id + "';";
        knexmain.raw(sql)
            .then(function(resp) {
                result(null, resp[0])
            });
    }

    Task.getAllRoomresDiscussion = function (result){
        knexmain.select('id','dateforreserv', 'refrom', 'reto', 'sname', 'rooms' )
            .from('lending_mater')
            .where('action', '=', 'reserve')
            .andWhere('rooms', 'discussion')
            .andWhere('status', 'accept')
            .orderBy('dateforreserv', "asc")
            .then(function(resp) {
                result(null, resp)
            });

    }
    Task.getAllRoomresDiscussion_ad = function (result){
        knexmain.select('id','dateforreserv', 'refrom', 'reto', 'sname', 'rooms', 'status' )
            .from('lending_mater')
            .where('action', '=', 'reserve')
            .andWhere('rooms', 'discussion')
            .orderBy('dateforreserv', "desc")
            .then(function(resp) {
                result(null, resp)
            });

    }

    Task.getAllRoomresAVR = function (result){
        knexmain.select('id','dateforreserv', 'refrom', 'reto', 'sname', 'rooms' )
            .from('lending_mater')
            .where('action', '=', 'reserve')
            .andWhere('rooms', 'avr')
            .andWhere('status', 'accept')
            .orderBy('dateforreserv', "desc")
            .then(function(resp) {
                result(null, resp)
            });

    }
    Task.getAllRoomresAVR_ad = function (result){
        knexmain.select('id','dateforreserv', 'refrom', 'reto', 'sname', 'rooms', 'status ')
            .from('lending_mater')
            .where('action', '=', 'reserve')
            .andWhere('rooms', 'avr')
            .orderBy('dateforreserv', "desc")
            .then(function(resp) {
                result(null, resp)
            });

    }
    Task.getAllRoomresLecture = function (result){
        knexmain.select('id','dateforreserv', 'refrom', 'reto', 'sname', 'rooms', 'status' )
            .from('lending_mater')
            .where('action', '=', 'reserve')
            .andWhere('rooms', 'lecture')
            .andWhere('status', 'accept')
            .orderBy('dateforreserv', "desc")
            .then(function(resp) {
                result(null, resp)
            });

    }
    Task.getAllRoomresLecture_ad = function (result){
        knexmain.select('id','dateforreserv', 'refrom', 'reto', 'sname', 'rooms' , 'status' )
            .from('lending_mater')
            .where('action', '=', 'reserve')
            .andWhere('rooms', 'lecture')
            .orderBy('dateforreserv', "desc")
            .then(function(resp) {
                result(null, resp)
            });

    }












//INHOUSE LOG
Task.getInHouseByType = function (type, result){
    var dt = new Date();
    var datemontha = (dt.getFullYear()) +"-"+  (("0"+(dt.getMonth()+1)).slice(-2))  //+"- "+ (("0"+dt.getDate()).slice(-2))
    //console.log(datemontha)
    switch (type){
        case 'book':
            //knexmain.raw("SELECT count(*) as book FROM webopacwihs.ihubk WHERE reg_date like '" + datemontha + "';")
            knexmain.raw("SELECT count(*) as book FROM webopacwihs.ihubk where reg_date like '" + datemontha + "-%';")
                .then(function(resp) {
                   // console.log(resp)
                    result(null, resp)
                });
            break;
        case 'thesis':
            //knexmain.raw("SELECT count(*) as thesis FROM webopacwihs.ihutd WHERE reg_date  between '" + datemontha + '-01%' + "' and '" + datemontha + '-31%' + "';")
            knexmain.raw("SELECT count(*) as thesis FROM webopacwihs.ihutd where reg_date like '" + datemontha + "-%';")
                .then(function(resp) {
                    result(null, resp)
                });
            break;
        case 'serials':
           // knexmain.raw("SELECT count(*) as serials FROM webopacwihs.SSIHS WHERE reg_date  between '" + datemontha + '-01%' + "' and '" + datemontha + '-31%' + "';")
            knexmain.raw("SELECT count(*) as serials FROM webopacwihs.SSIHS where reg_date like '" + datemontha + "-%';")
                .then(function(resp) {
                    result(null, resp)
                });
            break;
        case 'patron':
            //knexmain.raw("SELECT count(*) as patron FROM webopacwihs.patronlog WHERE reg_date  between '" + datemontha + '-01%' + "' and '" + datemontha + '-31%' + "';")
            knexmain.raw("SELECT count(*) as patron FROM webopacwihs.patronlog where reg_date like '" + datemontha + "-%';")
                .then(function(resp) {
                    result(null, resp)
                });
            break;
    }

}


module.exports= Task;