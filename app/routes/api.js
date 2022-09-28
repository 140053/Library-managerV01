'use strict';
const express = require('express');
const route = express.Router();
const task = require('../controller/appController');
var middleware = require('../middleware/localvar');
const LoginLM = require('../controller/loginSystemController');
const patron = require('../controller/patronSystem');


//middleware


route.post('/',task.api);

route.post('/save',middleware.SaveAllDataInTmp,task.saveToMain);

route.post('/del',middleware.DelbyID,(req,res)=>{
    res.redirect('/ihs');
})


//login
route.post('/login',LoginLM.LoginLM)

//get list of patron
route.post('/getpatron', patron.api_get)
// save ptron
route.post('/ingestpatron', patron.ingestpatron)

//patron register
route.post('/regester', patron.regesterPatron)
route.post('/regesterl', patron.regesterPatron_llogin)

// get one patron
route.post('/getOnepatron', patron.api_get_one)
// delete patron
route.get('/delpatron/:id', patron.delpatronbyID)
// edit patron
//route.post('/editpatron',)

//search login by id
route.post('/getpatronbyID', patron.getpatronInLoggedByID )

route.post('/listpatronToday', patron.listpatronInLoggedByID)

route.post('/boresv', patron.borres)

route.post('/getlender', patron.getlender )
route.post('/returnlender', patron.returnlender)

//room reservation accept
route.post('/room', patron.approvedenyroom)



//PATRON STAT
route.post('/getLogby', patron.getPatronLogBy)



//RESOURCES STAT
route.post('/getinhouse', patron.getInHouseLogBy)

//EXPORT DATA
route.post('/exportdata', patron.exportdataPatron )

//getrandom id 1
route.post('/getrandID', patron.getpatronrandom)




module.exports = route;