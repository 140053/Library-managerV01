'use strict';
const express = require('express');
const route = express.Router();
const task = require('../controller/appController');
const inventoryController = require('../controller/inventoryController');
var middleware = require('../middleware/localvar');
const Serials = require('../model/serials_model');

const Slogin = require('../controller/patronSystem')



//middleware

route.use(middleware.set_var);
route.use(middleware.set_counts);


route.use(function(req, res, next){
    if (req.session.Logged_status === false){
        req.session.data = null
    }
    next();
})

route.get('/',task.index);




route.get('/ihs',task.ihs);
route.get('/ihs/book',task.ihs_book);
route.get('/ihs/thesis',task.ihs_theses);
route.get('/ihs/serials',task.ihs_serials);

//statistics
route.get('/statistics', task.statistics);
route.post('/statistics', task.postStat);







//login
route.get('/login', inventoryController.inv)

//Logout
route.get('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('/');
})








// INVENTORY ROUTE
route.get('/inv', inventoryController.inv)
route.post('/inv/request', middleware.checkAuth, inventoryController.getdataInventory )
route.get('/inv/request/:what/:id/:name/:office', middleware.checkAuth,inventoryController.getMyAccountableItems)
route.post('/inv/ingest', middleware.checkAuth, inventoryController.saveMyaccountable)
route.post('/add/photo', middleware.checkAuth, inventoryController.attachePhoto);
route.get('/add', (req, res)=>{
    console.log(req.session.fileinfo)
    res.render('pages/inventory/auth/addphoto',{
        LoggedU: null ,
        metadata: req.session.fileinfo  
    })
})

route.post('/inv/add', middleware.checkAuth, inventoryController.addmanagerController);

route.post('/inv/list', middleware.checkAuth, inventoryController.invListof);

route.post('/inv/delete', middleware.checkAuth, inventoryController.invDelete);

// LOGIN SYSTEM

route.get('/patron', Slogin.patron) // patron manager
route.get('/addpatron', Slogin.addPatron) //addpatron page

route.get('/plogin', Slogin.index ) //general circulation
route.post('/plogin',Slogin.post)

route.get('/llogin', Slogin.index2 ) // learning commons
route.post('/llogin',Slogin.post2)

//Login list
route.get('/listlogl',Slogin.listlogl)

//lenders dashboard
route.get('/lender', Slogin.lender)
//lender v2
route.get('/lenderv2', Slogin.lenderV2)

//room reservation
route.get('/room', Slogin.roomlender)

route.get('/reservation', Slogin.reservationlist )
route.get('/roomdashboard', Slogin.denyapprovereservation )
//room booking 
route.get('/bookroom', Slogin.roombooking)

route.post('/bookroom', Slogin.roombookingPOST )

route.get('/successbooking', Slogin.successbooking )

//export

route.get('/exportLog', Slogin.dataexportPatron)

//cheat
route.get('/autolog',Slogin.autolog)


route.get('/close', function(req, res){
    res.send('CLOSE')
})

route.get('/redir', function (req, res ){
    res.redirect('/ihs/serials')
})



module.exports = route;