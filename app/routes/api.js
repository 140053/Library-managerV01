'use strict';
const express = require('express');
const route = express.Router();
const task = require('../controller/appController');
var middleware = require('../middleware/localvar');




//middleware


route.post('/',task.api);

route.post('/save',middleware.SaveAllDataInTmp,task.saveToMain);

route.post('/del',middleware.DelbyID,(req,res)=>{
    res.redirect('/ihs');
})




module.exports = route;