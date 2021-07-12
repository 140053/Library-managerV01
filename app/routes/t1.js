const express = require('express');
const route = express.Router();
var todoList = require('../controller/appController');



route.get('/',(req,res)=>{
    res.send('lol');
});


route.get('/lol',todoList.list_all_tasks_1);



module.exports = route;