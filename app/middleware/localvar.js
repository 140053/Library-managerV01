

const e = require('express');
const url = require('url')
var Serials = require('../model/serials_model');
var Thesis = require('../model/thesis_model');
var Book = require('../model/book_model');


exports.alert_notif = function(req,res,next){
    var a1 =       '<div class="alert alert-warning alert-dismissible fade show" role="alert">' +
                  +'  <strong>Holy guacamole!</strong> You should check in on some of those fields below.' +
                  +'  <button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                  +'  <span aria-hidden="true">&times;</span>'+
                  +'  </button>' +
                  +' </div>';
}


exports.checkAuth = function( req, res , next){
    if (req.session.Logged_status === false){
        req.session.auth = null
    }else{
        req.session.auth = true

    }
    next();
}


exports.set_var = function(req,res,next){
    res.locals.apptitle = 'Home';
   
    var pU = url.format({pathname: req.originalUrl})
   //console.log(pU)
   req.session.backpage = pU;

    switch (pU) {
        case '/inv':
            res.locals.title = 'Library Inventory Manager';
            res.locals.banner = 'inv2.jpg';
            res.locals.cjs = '<script src="/js/inv.js"></script>';
            res.locals.modal = "";
            break;
        case '/ihs':           
            res.locals.title = 'Library In-House Utilization Manager';
            res.locals.cjs = ' <script src="/js/custom.js"></script>';
            res.locals.modal = '';
            break;
        case '/login':           
            res.locals.title = 'Library Manager';
            res.locals.banner = 'inv3.jpg';
            res.locals.cjs = ' <script src="/js/custom.js"></script>';
            res.locals.modal = '';
            break;
        default:
            res.locals.title = 'Library Manager'; 
            res.locals.cjs = '<script src="/js/custom.js"></script>';
            res.locals.modal = '';
            res.locals.cjs = '<script src="/js/inv.js"></script>';
            break;
    }
   
    
    next();
}



exports.set_counts =  async function(req,res,next){
    var error = req.session.error 
   // console.log( error+ 'error');
    
       
    
  
      
   //req.sessions.cserials = '123';
    next();
}






exports.get_all_in_serialsTmp = function(req,res,next){
    Serials.check_if_exist('serials',function(err, task){
        
        if( task[0].exist == 1){
          Serials.select_all_from('serials',function(err,result){
            res.locals.sdata = result[0].title;
            
          });
        }
     });
     
     next();
}



exports.SaveAllDataInTmp = async function(req,res,next){
    var table = req.body.table;
    var newdate = req.body.daterange
    console.log('middleware ' + table)
    console.log(req.body.daterange + '++++++++++++++++++++++++')

    if(table == 'serials'){
        Serials.save_to_main_table(table,newdate, function(err,result){
            if(err == 'error'){
                console.log('error saving');
            }else{
                
                Serials.drop_table('serials', function(err, result){
                    if(err){
                        console.log('error drop table');
                    }else{
                        console.log('drop successfull');
                    }
                })

                console.log('save successfully');
            }

           


        });
        next();
    }else if(table == 'thesis'){
        console.log(table + ' in middlware' )
        Thesis.save_to_main_table(table,newdate ,function(err,result){

            console.log(result);
            if(err == 'error'){
                console.log('error saving');
            }else{

                Thesis.drop_table('thesis',function(err, res00 ){
                    console.log(err + res00);
                })
                console.log('save successfully');
            }

        });
        
        next();
    }else if(table == 'book'){
        console.log(table + ' in middlware' )
        Book.save_to_main_table(table, newdate, function(err,result){

            //console.log(result);
            if(err == 'error'){
                console.log('error saving');
            }else{

                Book.drop_table('book',function(err, res00 ){
                    console.log(err + res00);
                    console.log('save successfully');                   
                })
                
            }
        });
        next();
        
        
    }else{
        console.log('not serials');
        next();
    }
       
}







exports.DelbyID = function(req,res,next){
    var table = req.body.table;
    var id = req.body.id;
    console.log(req.body);
    if(table == 'serials'){
        Serials.del_content_by_ID(id,table,function(err,result){
            if(err == 'error'){
                console.log('error deleting');
            }else{
                console.log('00');
                 console.log('delete successfully');
            }
        });
    } else if (table == 'thesis'){
        Thesis.del_content_by_ID(id,table,function(err,result){
            if(err){
                console.log('error deleting');
            }else{
                 console.log('000');
                 console.log('delete successfully');
            }
            console.log('loasd')
        });
    } else if( table == 'book'){
        Book.del_content_by_ID(id,table,function(err,result){
            if(err){
                console.log('error deleting');
            }else{
                 console.log('000');
                 console.log('delete successfully');
            }
            console.log('loasd')
        });
    }
    next();


}