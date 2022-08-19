
const ploginModel = require('../model/plogin_model')


// Task object constructor
var controller = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

function  gettimev2 (){
    var dt = new Date();
    var timestamp = (("0"+(dt.getMonth()+1)).slice(-2)) +"/"+ (("0"+dt.getDate()).slice(-2)) +"/"+ (dt.getFullYear()) +" "+ (("0"+dt.getHours()+1).slice(-2)) +":"+ (("0"+dt.getMinutes()+1).slice(-2));
    var timestamp2 = (("0"+(dt.getMonth()+1)).slice(-2)) +"/"+ (("0"+dt.getDate()).slice(-2)) +"/"+ (dt.getFullYear()) +" "+ dt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric'});
    return timestamp2;
}

controller.exportdataPatron = function (req, res){

    ploginModel.getfrompatronlogbyDate(req.body, function (err, result){


        res.render('pages/PLogin/tools/exportDATA',{
            layout: 'layouts/blank_datatable',
            LoggedU: null,
            auth: null,
            data: result
        })
    })

}

controller.ingestpatron = async function (req, res){
    if (req.session.data  != null ) {
        var cred = req.session.data;

        //console.log(req.body)

        await ploginModel.ingestpatronmodel(req.body, function (err, result){
            //console.log(result)
            res.render('pages/message',{
                layout: 'layouts/datatable',
                LoggedU: cred[0].username,
                auth: 0,
                status: 'SAVE SUCCESSFULLY',
                msgtitle: 'ADD PATRON',
                msgbody: 'Patron Credintials save Successfully ',
                msgbtn: 'Back',
                msglink: '/patron'
            })
        })
    }
}

controller.regesterPatron = function (req,res){

    ploginModel.regesterpatronmodel(req.body, function (err, result){
        //console.log(result)
        res.render('pages/PLogin/index',{
            layout: 'layouts/blank',
            data: '',
            LoggedU: null,
            Status: null,
            alert: 'Congratiolation you successfully registerd! ' + req.body.IDnum
        })
    })
}
controller.regesterPatron_llogin = function (req,res){

    ploginModel.regesterpatronmodel(req.body, function (err, result){
        //console.log(result)
        res.render('pages/PLogin/learn',{
            layout: 'layouts/blank',
            data: '',
            LoggedU: null,
            Status: null,
            alert: 'Congratiolation you successfully registerd! ' + req.body.IDnum
        })
    })
}



controller.updatePatron = async function(err, result) {
    if (req.session.data != null) {
        var cred = req.session.data;

    }
}

controller.addPatron =function (req, res){
    if (req.session.data  != null ){
        var cred =  req.session.data;
        res.render('pages/PLogin/tools/Add_Patron',{
            layout: 'layouts/datatable',
            LoggedU: cred[0].username,
            auth: 0
        })


    }else {
        res.render('pages/index',{
            //layout: 'layouts/datatable',
            LoggedU: null
        })
    }
}



controller.patron = function(req, res){
    if (req.session.data  != null ){
        var cred =  req.session.data;
        res.render('pages/PLogin/patronmanager',{
            layout: 'layouts/datatable',
            LoggedU: cred[0].username,
            auth: 0,
            state: '',
            alert: null
        })


    }else {
        res.render('pages/PLogin/patronmanager',{
            layout: 'layouts/datatable',
            LoggedU: null,
            state: 'disabled'
        })
    }
}

controller.index = function(req, res){
    //console.log(req.headers)

    res.render('pages/PLogin/index',{
        layout: 'layouts/blank',
        data: '',
        LoggedU: null,
        Status: null,
        alert: null
    })
}
controller.index2 = function(req, res){

    res.render('pages/PLogin/learn',{
        layout: 'layouts/blank',
        data: '',
        LoggedU: null,
        Status: null,
        alert: null
    })
}

controller.post = async function (req, res){

    if(req.body.keyword2 != ''){
        await ploginModel.GetStudentInfo(req.body.keyword2, function (err, result){
            //console.log(result)
            //console.log(Object.keys(result).length)

            var Statuss, data
            if (Object.keys(result).length == 0){
                Statuss = false;
                data = null;
            }else {
                Statuss = true;
                data = result[0]
                // check for login or logout
                ploginModel.checkLogin(req.body.keyword2, req.body.slocation, function (err, res1){
                   // console.log(Object.keys(res1).length)

                    var mode, cred


                    if (process.env.LOGIN_SYSTEM_MODE == 'inout') {
                        if (Object.keys(res1).length == 0){
                            //means logout
                            cred = result[0]
                            mode = 'in'
                        }else {
                            cred = res1[0]
                            mode = 'out';
                        }
                    }else if(process.env.LOGIN_SYSTEM_MODE == 'in')  {
                        console.log(process.env.LOGIN_SYSTEM_MODE)

                        if (Object.keys(res1).length == 1){

                            if (res1[0].mode == 'in'){
                                cred = result[0]
                                mode = 'in'
                            }else if (res1[0].mode == 'out'){
                                cred = result[0]
                                mode = 'in'
                            }else if (res1[0].mode == null ){
                                cred = result[0]
                                mode = 'in'
                            }
                        }else if(Object.keys(res1).length == 0){

                            //console.log('no first time login')
                            cred = result[0]
                            mode = 'in';
                        }else{
                           // console.log('nodata')
                            cred = result[0]
                            mode = 'in';
                        }
                    }

                    //console.log(cred)
                    ploginModel.SaveRecord(cred, mode, req.body.slocation)
                })

            }
            var alert = null
            if(data != null){
                alert = 'Congratiolation you successfully Log In! ' + req.body.keyword2
            }
            res.render('pages/PLogin/index',{
                layout: 'layouts/blank',
                data: data,
                LoggedU: null,
                Status: Statuss,
                times: gettimev2(),
                alert: alert
            })
        })
    }else {
        res.redirect('/plogin')
    }


}
controller.post2 = async function (req, res){
   // console.log(req.body)

    if(req.body.keyword2 != '') {
        await ploginModel.GetStudentInfo(req.body.keyword2, function (err, result) {
            //console.log(result)
            //console.log(Object.keys(result).length)

            var Statuss, data
            if (Object.keys(result).length == 0) {
                Statuss = false;
                data = null;
            } else {
                Statuss = true;
                data = result[0]
                // check for login or logout
                ploginModel.checkLogin(req.body.keyword2, req.body.slocation, function (err, res1){
                    // console.log(res1[0].mode)
                    var mode, cred


                    if (process.env.LOGIN_SYSTEM_MODE == 'inout') {
                        if (Object.keys(res1).length == 0){
                            //means logout
                            cred = result[0]
                            mode = 'in'
                        }else {
                            cred = res1[0]
                            mode = 'out';
                        }
                    }else if(process.env.LOGIN_SYSTEM_MODE == 'in')  {
                        console.log(process.env.LOGIN_SYSTEM_MODE)

                        if (Object.keys(res1).length == 1){

                            if (res1[0].mode == 'in'){
                                cred = result[0]
                                mode = 'in'
                            }else if (res1[0].mode == 'out'){
                                cred = result[0]
                                mode = 'in'
                            }else if (res1[0].mode == null ){
                                cred = result[0]
                                mode = 'in'
                            }
                        }else if(Object.keys(res1).length == 0){

                            //console.log('no first time login')
                            cred = result[0]
                            mode = 'in';
                        }else{
                            // console.log('nodata')
                            cred = result[0]
                            mode = 'in';
                        }
                    }

                    //console.log(cred)
                    ploginModel.SaveRecord(cred, mode, req.body.slocation)
                })

            }
            var alert = null
            if(data != null){
                alert = 'Congratiolation you successfully Log In! ' + req.body.keyword2
            }
            res.render('pages/PLogin/learn', {
                layout: 'layouts/blank',
                data: data,
                LoggedU: null,
                Status: Statuss,
                times: gettimev2(),
                alert: alert
            })
        })
    }else {
        res.redirect('/Llogin')
    }
}

controller.api_get = async function (req, res){
    await ploginModel.getPatron(req.body.data,function (err, result){
        res.send(result[0])
    } )
}

controller.api_get_one = async function (req, res){
    await ploginModel.getPatron_one(req.body.data,function (err, result){
        res.send(result[0])
    } )
}

controller.delpatronbyID = async function (req, res){
    //console.log(req.params) //{ id: '00-0000' }
    if (req.session.data  != null ) {
        var cred = req.session.data;
        await ploginModel.delPatronByIDModel(req.params.id, function (err, result){
            console.log(result)
            res.render('pages/message',{
                layout: 'layouts/datatable',
                LoggedU: cred[0].username,
                auth: 0,
                status: 'DELETE SUCCESSFULLY',
                msgtitle: 'DELETE PATRON',
                msgbody: 'Patron Credintials Delete Successfully ',
                msgbtn: 'Back',
                msglink: '/patron'
            })

        })
    }
}



//STAT PATRON
controller.getPatronLogBy = function (req, res){

    ploginModel.getPatronlogBYCourse( '2022-08-18', req.body.location,function (err, result){
        res.send(result[0])
    })
}

//STAT INHOUSE

controller.getInHouseLogBy = function (req, res){

    ploginModel.getInHouseByType('book', function (err, book){
        //res.send(book[0])
        ploginModel.getInHouseByType('thesis', function (err, thesis){
            //res.send(thesis[0])
            ploginModel.getInHouseByType('serials', function (err, serials){
               // res.send(serials[0])
                ploginModel.getInHouseByType('patron', function (err, patron){
                    //console.log(patron[0][0].patron)
                    var data = []
                    for (var key in book[0][0]) {
                        var keys = key;
                        var datas = book[0][0][key];
                        data.push({table: keys, cnt: datas})
                    }
                    for (var key in thesis[0][0]) {
                        var keys = key;
                        var datas = thesis[0][0][key];
                        data.push({table: keys, cnt: datas})
                    }
                    for (var key in serials[0][0]) {
                        var keys = key;
                        var datas = serials[0][0][key];
                        data.push({table: keys, cnt: datas})
                    }
                    for (var key in patron[0][0]) {
                        var keys = key;
                        var datas = patron[0][0][key];
                        data.push({table: keys, cnt: datas})
                    }
                    res.send(data)
                })
            })
        })
    })
}

controller.dataexportPatron = function (req, res){
    res.render('pages/Plogin/tools/exportDATA',{
        layout: 'layouts/blank_datatable',
        LoggedU: null,
        auth: null
    })
}



module.exports = controller;
