'use strict'

const knex = require('../../database/knex');

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

//real model here


Task.Login_model = function(creds, result){
    
    knex.select('id','name','lastname', 'StudentID', 'Gender', 'Kurso', 'username', 'auth', 'campus')
        .from('auser')
        .where('username', '=', creds.email)
        .andWhere('password', creds.password)       
        .then(function(res1){
            result(null, res1);
        });
}

Task.Login_model2 = function(creds, result){
    
    knex.select('id','uname','pass', 'username', 'auth', 'reg_date')
        .from('admin')
        .where('uname', '=', creds.username)
        .andWhere('pass', '=', creds.password)       
        .then(function(res1){
            result(null, res1);
        });
}





Task.check_bLogin = function(creds, result){
    knex.select()
        .from('auser')
        .where('username', creds.email)
        .whereNotNull('auth')
        .then(function(res1){
            result(null, res1);
        });

}

Task.check_userExist = function(creds , result ){
    knex.select()
    .from('admin')
    .where('uname', creds.username)
    .then(function(res1){
        result(null, res1);
    });
}

Task.register_model = function(creds, result){
  console.log(creds)
    knex('auser').insert({
        'name': creds.name,
        'lastname': creds.lastname,
        'username': creds.email,
        'password': creds.password,
        'StudentID': creds.sid,
        'Gender': creds.gender,
        'kurso': creds.kurso,
        'campus': creds.campus
    }).then(function(res1){
        result(null, res1);
    });
}



module.exports = Task;