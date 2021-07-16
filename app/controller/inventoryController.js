const inv =  require('../model/knex/invModel')
const fs  = require('@supercharge/fs')
const ofs = require('fs')
const path = require('path');
const { min } = require('lodash');


//Task object constructor
var controller = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};




controller.inv = async function(req, res){  
    var cred =  req.session.data;

    if (req.session.data != null){
        await inv.List_office(function(err, result){
            //console.log(result[0])
            res.render('pages/inventory/auth/index',{
               // page: 'thesis',
                data: result,
                LoggedU: cred[0].username ,
                auth: 0,
            })
        })
       
    }else{
        res.render('pages/inventory/index',{
           // page: 'thesis',
            data: '',
            LoggedU: null,
            auth: null,
        })
    }
}



controller.getdataInventory = async function( req, res){
    var what = req.body.what;
    var id = req.body.id;
    var iid = req.params.id;
   console.log(req.params.id)
    switch (what) {
        case 'accountable':
            await inv.list_accountableByOffice(id, function(err, result){
                res.send(result)
            })
            break;
            
        case 'myaccountable':
            await inv.list_myaccountableItems(iid, function(err, result){
               
                res.send(result)
            })
            break;
            
        default:
            res.send('[]')
            break;
    }
   
}

controller.getMyAccountableItems = function( req, res){
    var cred =  req.session.data;
    var iid = req.params.id;
    var name = req.params.name;
    var office = req.params.office;
    console.log(name)
    inv.list_myaccountableItems(iid, function(err, result){   
        var datalent = Object.keys(result).length
        var dataraw = result;
        
        if(datalent > 0){
            res.render('pages/inventory/auth/myaccountable',{
                aid : iid,
                office: office,
                name: name,
                datalen: datalent,
                data: dataraw,
                LoggedU: cred[0].username ,              
                auth: 0,
                namu: result[0].name
                //accble: result
            })
        }else{
            res.render('pages/inventory/auth/myaccountable',{
                aid : iid,
                name: name,
                datalen: datalent,
                data: null,
                LoggedU: cred[0].username ,              
                auth: 0,
                namu: null
                //accble: result
            })
        }           
        
    })
}


controller.saveMyaccountable = function( req, res){
   
    var info = {
        person: req.body.person,
        office: req.body.office,
        acountableID: req.body.accountableId,
        name: req.body.name,
        model: req.body.model,
        location:  req.body.location,
        amount: req.body.amount,
        SN: req.body.SN,
        dateAquired: req.body.dateaquired,
        propertyNumber: req.body.propertynumber,
        unit: req.body.unit,
        typof: req.body.typof
    }
   
    inv.insertMyAccountableItems(info, function(err, result){
        req.session.fileinfo = info
        //console.log(req.session.backpage)
        res.redirect('/add')
    })
   

}

function mkdirpath(d1, d2){
    var sts = ofs.existsSync(path.join(__dirname,'../public/picture', d1))
            //console.log(sts)   
        if(sts){
            return {message: 'exist', status: true};
        }else{
            ofs.mkdir(path.join(__dirname,'../public/picture', d1), 
            { recursive: true }, (err) => { 
                if (err) { 
                    return {message: 'err', status: false};
                } 
                
                //console.log('Directory created successfully!'); 
            }); 
            return {message: 'created', status: false};
        }
}





controller.attachePhoto = function( req, res){

    var minfo = req.session.fileinfo
   

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    
 
    var f = req.files.pile;
  
    if (f.name){
        var ext = f.name
        var newext = ext.split('.')    
        var nname = minfo.person;
        var newname = nname.replace(/\s+/g, '-')
       // console.log('onfile') 
        var chkpath = './app/public/picture/ ' + minfo.office+ '/'+  minfo.person + '-' + minfo.model + '-' + minfo.SN + '.'+ newext[1];
        var chkpaths = './app/public/picture/ ' + minfo.office+ '/';
        var msts =  mkdirpath(minfo.office)
        if(msts.message == 'exist' || msts.message == 'created' ){
           
            if( fs.exists(chkpaths) == true ){
                ofs.unlink(chkpath, function(err){
                    if(err && err.code == 'ENOENT') {
                        console.error("Error occurred while trying to remove file");
                    }else{
                        console.info(`removed`);
                        inv.insertMyAccountablePhoto(   minfo.person + '-' + minfo.model + '-' + minfo.SN + '.'+ newext[1] , minfo.SN , function( err, result){
                            f.mv('./app/public/picture/' + minfo.office+ '/' +  minfo.person + '-' + minfo.model + '-' + minfo.SN + '.'+ newext[1] );
                        })
                    }
                })
             }else{
                inv.insertMyAccountablePhoto(  minfo.person + '-' + minfo.model + '-' + minfo.SN + '.'+ newext[1], minfo.SN , function( err, result){
                    f.mv('./app/public/picture/'  + minfo.office +  '/'  + minfo.person + '-' + minfo.model + '-' + minfo.SN + '.'+ newext[1] );
                })
             }
        }   
         req.session.fileinfo = null
         res.redirect('/inv')
    }else{
       
    
        //console.log('mutlifiles')
       // console.log(f)
       // console.log(Object.keys(f).length)
        var upstatus = null;
        var fnames = [];
        //console.log(f)
        for (let a = 0; a < Object.keys(f).length; a++) {
            var ext = f[a].name
            
            var newext = ext.split('.')
            var chkpath = './app/public/picture/'  + minfo.office +  '/' +  minfo.person + '-' + minfo.model + '-' + minfo.SN + '-img-'+ a + '.'+ newext[1];
            var chkpaths = './app/public/picture/ ' + minfo.office+ '/';
            var msts =  mkdirpath(minfo.office)
            if(msts.message == 'exist' || msts.message == 'created' ){
                if( fs.exists(chkpaths) == true ){
                    ofs.unlink(chkpath, function(err){
                        if(err && err.code == 'ENOENT') {
                            console.error("Error occurred while trying to remove file");
                            upstatus = false
                        }else{
                            console.info(`removed`);
                           
                                f[a].mv('./app/public/picture/'  + minfo.office + '/' +  minfo.person + '-' + minfo.model + '-' + minfo.SN + '-img-'+ a + '.'+ newext[1] );
                                upstatus = true
    
                           
                        }
                    })
                }else{
                
                        f[a].mv('./app/public/picture/'  + minfo.office+  '/' +  minfo.person + '-' + minfo.model + '-' + minfo.SN + '-img-'+ a + '.' + newext[1] );
                        upstatus = true
                }
    
              fnames.push( minfo.person + '-' + minfo.model + '-' + minfo.SN + '-img-'+ a + '.' + newext[1]);
            }else{
                upstatus = false
            }
          
           
            
        }
        if(upstatus == true){
            console.log(fnames)
            inv.insertMyAccountablePhoto(fnames,minfo.SN, function( err, result){
                req.session.fileinfo = null
                res.redirect('/inv')
            })
        }else{
            req.session.fileinfo = null
            res.send('App encountered an error un able to continue <a href="/inv" class="btn btn-info">Go Back</a>')
        }
        
      
    }
    
   // res.send('loki')
    
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
     //// let sampleFile = req.files.sampleFile;
    
      // Use the mv() method to place the file somewhere on your server
      /*
      sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
        if (err)
          return res.status(500).send(err);
    
        res.send('File uploaded!');
      });
      */
}









//POST



controller.addmanagerController = function(req, res){

    var form = req.body.form;

    if(form){
        switch (form) {
            case 'office':
                var data = {
                    name: req.body.name,
                    code: req.body.code
                }
                inv.insertinoffice(data, function(err, result){
                    res.redirect('/inv')
                })
                break;
            case 'person':
                var data = {
                    name: req.body.name,
                    photo: req.body.photo,
                    office: req.body.officeid
                }
                inv.insertaccountableperson(data, function(err, result){
                    res.redirect('/inv')
                })
                break;
            case 'item':
                var data = {
                    office: req.body.office,
                    person: req.body.person,
                    acountableID: req.body.accountableID,
                    name: req.body.name,
                    location: req.body.location,
                    amount: req.body.amount,
                    SN: req.body.SN,
                    dateAquired: req.body.dateaquired,
                    propertynumber: req.body.propertynumber,
                    unit: req.body.unit,
                    model: req.body.model,
                    typof: req.body.itemtype
                }
                //res.send(data)
             
                inv.insertMyAccountableItems(data, function(err, result){
                    req.session.fileinfo = data
                    //console.log(req.session.backpage)
                    res.redirect('/add')
                })
                
                break;
            default:
                res.redirect('/inv')
                break;
        }
    }else{
        res.status('404').send('NUll')
    }
   
}




controller.invListof = function(req, res ){
    var type = req.body.type

    if (type){
        switch (type) {
            case 'office':
                inv.List_office(function(err, result){
                    res.send(result)
                })                
                break;
            case 'person':
                var officeid = req.body.id;
                //if(officeid != ''){
                    //console.log(officeid)
                    inv.list_accountableByOffice( officeid, function(err, result){
                        res.send(result)
                        
                    })
               // }
                break;
            case 'items':
                var personid = req.body.id;
                
                inv.list_myaccountableItems(personid, function(err, result){
                    res.send(result)
                   
                })
                break;
            default:
                res.send('{err: {err:error}}')
                break;
        }
    }
}



controller.invDelete = function(req, res ){
    var type = req.body.type
    
    if (type){
        switch (type) {
            case 'office':
                inv.invDeleteOffice(req.body.id, function(err, result){
                    res.send('del')
                })          
                break;
            case 'person':
                inv.invDeletePerson(req.body.id)
                break;
            case 'items':
                inv.invDeleteItem(req.body.id)
                break;
            default:
                res.send('{err: {err:error}}')
                break;
        }
    }
}



















module.exports = controller;