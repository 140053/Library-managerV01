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
**/
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