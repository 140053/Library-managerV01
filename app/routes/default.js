'use strict';
const express = require('express');
const route = express.Router();
const task = require('../controller/appController');
var middleware = require('../middleware/localvar');
const Serials = require('../model/serials_model');



//middleware

route.use(middleware.set_var);
route.use(middleware.set_counts);

route.get('/',task.index);




route.get('/ihs',task.ihs);



route.get('/ihs/book',task.ihs_book);

route.get('/ihs/thesis',task.ihs_theses);


route.get('/ihs/serials',task.ihs_serials);










module.exports = route;