'use strict'
const login = require('../model/knex/loginModel')


//Task object constructor
var controller = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

controller.loginSystem = function(req, res){
    res.render('pages/login/pLogin',{
        LoggedU: null,
        layout:'./layouts/blank'
        
    })
}


controller.LoginLM = function(req, res){
    login.check_userExist(req.body, function(err, result0){
        var status = Object.keys(result0).length
        var newstat = false;
        if (status !== 0){
            login.Login_model2(req.body, function(err, result1){
                var status1 = Object.keys(result1).length
                if (status1 !== 0){
                   // console.log(result1)
                    
                    newstat = true
                    req.session.data = result1;
                    req.session.Logged_status = true
                    //res.status(200).send('Loggin successfully')
                    res.redirect('/')
                }else{
                    res.status(404).send('Wrong password')
                }
               
            })
            
           
        }else{
            res.status(404).send('User Credintials Not found!')
        }
       
    })
   
}






module.exports = controller;