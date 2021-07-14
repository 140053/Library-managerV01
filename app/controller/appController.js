'use strict'

const e = require('cors');
const { render } = require('ejs');
const { result, isString, split } = require('lodash');
var Task = require('../model/appModel.js');
var Serials = require('../model/serials_model');
var Thesis = require('../model/thesis_model');
var pmaster = require('../model/pmaster');
var Book = require('../model/book_model');


exports.index = function(req, res) {

   
      res.render('pages/index',{
        LoggedU: null
      })
    
   
   
};


exports.ihs = function(req, res) {
 
  
  Serials.CountonInTable('SSIHS', function(err,res1){
    var serials = res1[0].total;
    console.log(serials);
    Serials.CountonInTable('ihubk', function(err,res2){
      var book  = res2[0].total;
      console.log(book);
      Serials.CountonInTable('ihutd', function(err,res3){
        var thesis = res3[0].total;
        console.log(thesis);
        pmaster.get_Loggedin('clientlog',function(err,res4){
          var patron = res4[0].patron;
          res.render('pages/ihs',{
            page: null,
            LoggedU: null,
            book: book,
            thesis: thesis,
            serials:serials,
            patron: patron
          
            
            
          })
        })
        
          
        
      })
      
    })
      
  })
 
 
   /* 
  Serials.CountonInTable('SSIHS', function(err,ress){
    if(err){
      
        console.log(err);
        res.render('pages/ihs',{
          page: null,
          LoggedU: null,
          sser: '0'
      })
    }else{
       
       console.log(ress[0].total);
       res.locals.cserials = ress[0].total;
      
    }
           
  })


*/
 
 
};


exports.ihs_book = function(req,res){

  Book.check_record_in('book', function(err,res_cnt){
    
    var ress = res_cnt; // nul empty 
    console.log(ress);

    Book.CountonInTable_m('ihubk', function(err,ress){   
      console.log(ress);
      if(err){
        
          console.log(err);
          res.render('pages/ihs',{
            page: 'thesis',
            data: {},
            LoggedU: null,
            sser: '0'
        })
      }else{

        Book.check_if_exist_td('book',function(err,r0){
          console.log(r0);
          if(r0[0].exist == 1){
            
            Book.select_all_from('book',function(err,r1){
              //console.log(r1);
              res.render('pages/ihs',{
                page: 'book',
                data: r1,
                LoggedU: null,
                sser: ress
              })
            })
          }else{
            res.render('pages/ihs',{
              page: 'book',
              data: {},
              LoggedU: null,
              sser: ress
            })
          }
        })

        
        
              
      }
            
    });

  });

  
}

exports.ihs_theses = function(req,res){
  
  Thesis.check_record_in('thesis', function(err,res_cnt){
    
    var ress = res_cnt; // nul empty 
    //console.log(ress);

    Thesis.CountonInTable_m('ihutd', function(err,ress){   

      if(err){
        
          console.log(err);
          res.render('pages/ihs',{
            page: 'thesis',
            data: {},
            LoggedU: null,
            sser: '0'
        })
      }else{

        Thesis.check_if_exist_td('thesis',function(err,r0){
          //console.log(r0);
          if(r0[0].exist == 1){
            
            Thesis.select_all_from('thesis',function(err,r1){
              //console.log(r1);
              res.render('pages/ihs',{
                page: 'thesis',
                data: r1,
                LoggedU: null,
                sser: ress
              })
            })
          }else{
            res.render('pages/ihs',{
              page: 'thesis',
              data: {},
              LoggedU: null,
              sser: ress
            })
          }
        })

        
        
              
      }
            
    });

  });
}


exports.ihs_serials = function(req,res){

  Serials.CountonInTable_m('SSIHS', function(err,result){
    
    var ress = result;
  
  Serials.check_if_exist('serials',function(err, task){ // check if serials table exist

    console.log('table  check');
    if( task[0].exist == 1){  //if nag exist procced
      console.log('table  exist');
      Serials.select_all_from('serials', async function(err,result){  // get all data from db serials
        var rres = JSON.stringify(result);
        //console.log('listing all' + rres);
        
        if(err){  // if nag error
          console.log(err);
          res.render('pages/ihs',{
            page: 'serials',
            data: {},
            LoggedU: null,
            sser: ress
            
          })
        }else{
         
          
            res.render('pages/ihs',{
              page: 'serials',
              data: JSON.parse(rres),
              LoggedU: null,
              sser: ress
              
            })
         
         
        }

      });
    } else{
      console.log('table not exist');
      //return res.redirect('/ihs');

      res.render('pages/ihs',{
        page: 'serials',
        data: {},
        LoggedU: null,
        sser: ress
        
      })
      
    }
 });
})
 
}



exports.saveToMain = function(req,res){
  var table = req.body  
  console.log(table);
 

  res.redirect('/ihs/');

}








exports.api = function(req, res) {
  /**
     { query: 'SER00994' } serials
     { query: 'NWP00480' } newletter
     { query: 'BSP01006' } bsp
     { query: 'T0005785' } theses
     { query: 'MLIB00006586' } books
  */
  var data = req.body;
  if( !data.query == ''){
    if(data.type == 'serials'){
      console.log(data);
      Serials.check_if_exist('serials',function(err,exist){
        console.log(exist);
        if(exist[0].exist == 1){
          console.log('exist')
          Serials.getserialsinfo(data.query ,function(err,ress){
            console.log(ress);
            if(ress != ''){
              Serials.insertToTemp(ress,'serials',function(err,status){
                console.log(err+' '+status + ' ' + 'exist table');
                res.redirect('/ihs/serials');
              })
            }else{
              res.redirect('/ihs/serials');
            }
              
              
          })
        }else{
          console.log('not exist ');
          Serials.create_table('serials',function(err,status){
            console.log(status);
            Serials.getserialsinfo(data.query ,function(err,ress){
             // console.log(res);            
             if(ress != ''){
              Serials.insertToTemp(ress,'serials',function(err,status){
                console.log(err+' '+status + ' ' + 'exist table');
                res.redirect('/ihs/serials');
              })
            }else{
              req.session.error = 'invalid barcode';
              res.redirect('/ihs/serials');
            }
                
                
            })
          })
        }
      })
        
    } else if(data.type == 'theses'){

      Thesis.check_if_exist_td('thesis',function(err,status){
        console.log(status); //  [ RowDataPacket { exist: 0 } ]
        if(status[0].exist == 1){
          console.log(' looking by barcode 1');
          Thesis.get_td_metadata('books',data.query,function(err,resulta){
            if(err == true){
              res.redirect('/ihs/thesis');
            }else{
             
            
              if(resulta != ''){

               //console.log( resulta.split('<002>'));
               Thesis.process_metada(resulta,function(err,resultb){
               // console.log(resultb);
                Thesis.Insert_into(resultb,function(err,resultc){
                  if(err){
                    res.redirect('/ihs/thesis');
                  }else{
                    //console.log(resultc);
                   

                    res.redirect('/ihs/thesis');
                  }
                })
                               
               
              })
              }else{
                //console.log('empty');
                res.redirect('/ihs/thesis');
              }
             
            }
            
          })
        }else{
          //create table 
          Thesis.create_table('thesis',function(err,result1){
            
            
            if(err){
              //console.log('error creation table');
              res.redirect('/ihs/thesis');
            }else{
              //console.log('creation table success');
              console.log(' looking by barcode 2');
              Thesis.get_td_metadata('books',data.query,function(err,result2){
                //console.log(result2 +' ' + 'b')
                if(err == true){
                  res.redirect('/ihs/thesis');
                }else{
                
                  if(result2 != ''){
    
                  //console.log( resulta.split('<002>'));
                  Thesis.process_metada(result2,function(err,resultb){
                   // console.log(resultb);
                    Thesis.Insert_into(resultb,function(err,resultc){
                      if(err){
                        res.redirect('/ihs/thesis');
                      }else{
                       // console.log(resultc);
                       
    
                        res.redirect('/ihs/thesis');
                      }
                    })
                  
                  })
                  }else{
                    console.log('empty');
                    res.redirect('/ihs/thesis');
                  }
                
                }

                
              })
            }

          })

        }
      })

      
    }else if (data.type == 'book'){
      Book.check_if_exist_td('book',function(err,status){
        console.log(status); //  [ RowDataPacket { exist: 0 } ]
        if(status[0].exist == 1){
          console.log(' looking by barcode 1');
          Book.get_td_metadata('books',data.query,function(err,resulta){
            if(err == true){
              res.redirect('/ihs/book');
            }else{            
            
              if(resulta != ''){

               //console.log( resulta.split('<002>'));
               Book.process_metada(resulta,function(err,resultb){
               // console.log(resultb);
                Book.Insert_into(resultb,function(err,resultc){
                  if(err){
                    res.redirect('/ihs/book');
                  }else{
                    //console.log(resultc);
                   

                    res.redirect('/ihs/book');
                  }
                })
                               
               
              })
              }else{
                //console.log('empty');
                res.redirect('/ihs/book');
              }
             
            }
            
          })
        }else{
          //create table 
          Book.create_table('book',function(err,result1){
            
            
            if(err){
              //console.log('error creation table');
              res.redirect('/ihs/book');
            }else{
              //console.log('creation table success');
              console.log(' looking by barcode 2');
              Book.get_td_metadata('books',data.query,function(err,resulta){
                if(err == true){
                  res.redirect('/ihs/book');
                }else{            
                
                  if(resulta != ''){
    
                   //console.log( resulta);
                   Book.process_metada(resulta,function(err,resultb){
                   // console.log(resultb);
                    Book.Insert_into(resultb,function(err,resultc){
                      if(err){
                        res.redirect('/ihs/book');
                      }else{
                        //console.log(resultc);
                       
    
                        res.redirect('/ihs/book');
                      }
                    })
                                   
                   
                  })
                  }else{
                    //console.log('empty');
                    res.redirect('/ihs/book');
                  }
                 
                }
                
              })
            }

          })

        }
      })

    }
  } else{
    console.log('empty');
    res.redirect('/ihs');
  }

  
  
   

  
};

































/**

exports.list_all_tasks = function(req, res) {
  Task.getAllTask(function(err, task) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', task);
    res.send(task);
  });
};

exports.list_all_tasks_1 = function(req, res) {
  Task.getAllTask_1(function(err, task) {

    console.log('controller')
    if (err)
      res.send(err);
      //console.log('res', task);
    res.send(task);
    
  });
};




exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);

  //handles null error 
   if(!new_task.task || !new_task.status){

            res.status(400).send({ error:true, message: 'Please provide task/status' });

        }
else{
  
  Task.createTask(new_task, function(err, task) {
    
    if (err)
      res.send(err);
    res.json(task);
  });
}
};


exports.read_a_task = function(req, res) {
  Task.getTaskById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.updateById(req.params.taskId, new Task(req.body), function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove( req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};


**/