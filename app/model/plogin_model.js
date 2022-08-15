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

Task.checkLogin = function (IDnum, result){

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

Task.SaveRecord = function (data, mode){
    //console.log(data)
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
    knexmain.raw("INSERT INTO patronlog (Name, Degree_Course, User_class, IDnum, branch, gender, mode) VALUES ( '" + data.Name + "' , '" + data.Degree_Course + "' , '" + data.User_class + "' ,  '" + data.IDnum + "', '" + data.branch + "', '" + data.gender + "','"+ mode +"')")
        .then(function(resp) {
            //console.log(resp)
        });





}

module.exports= Task;