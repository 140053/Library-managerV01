'use strict';
const express = require('express');
const route = express.Router();
const task = require('../controller/appController');
var middleware = require('../middleware/localvar');
const LoginLM = require('../controller/loginSystemController');
const stat = require('../controller/statController')



//middleware


route.post('/',task.api);

route.post('/save',middleware.SaveAllDataInTmp,task.saveToMain);

route.post('/del',middleware.DelbyID,(req,res)=>{
    res.redirect('/ihs');
})

//login
route.post('/login',LoginLM.LoginLM)

//Stat

route.post('/getstatdetails', stat.getDetailed_list);


module.exports = route;