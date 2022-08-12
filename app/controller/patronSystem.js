
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

controller.index = function(req, res){  

    res.render('pages/PLogin/index',{
        layout: 'layouts/blank',
        data: '',
        LoggedU: null,
        Status: null
    })
}
controller.index2 = function(req, res){

    res.render('pages/PLogin/learn',{
        layout: 'layouts/blank',
        data: '',
        LoggedU: null,
        Status: null
    })
}



controller.post = async function (req, res){


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
            ploginModel.checkLogin(req.body.keyword2, function (err, res1){
                console.log(res1[0].mode)
                var mode
                if (Object.keys(res1).length == 1){
                    //means login
                    //do logout
                    //mode = 'out';

                    if (res1[0].mode == 'in'){
                        mode = 'out'
                    }else if (res1[0].mode == 'out'){
                        mode = 'in'
                    }else if (res1[0].mode == null ){
                        mode = 'in'
                    }
                }else {
                    mode = 'in';
                }

                ploginModel.SaveRecord(result[0], mode)
            })

        }
        res.render('pages/PLogin/index',{
            layout: 'layouts/blank',
            data: data,
            LoggedU: null,
            Status: Statuss,
            times: gettimev2()
        })
    })

}
controller.post2 = async function (req, res){


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
            ploginModel.checkLogin(req.body.keyword2, function (err, res1){
               // console.log(res1[0].mode)
                var mode
                if (Object.keys(res1).length == 1){
                    //means login
                    //do logout
                    //mode = 'out';
                    if (res1[0].mode == 'in'){
                        mode = 'out'
                    }else if (res1[0].mode == 'out'){
                        mode = 'in'
                    }
                }else {
                    mode = 'in';
                }

                ploginModel.SaveRecord(result[0], mode)
            })

        }
        res.render('pages/PLogin/learn',{
            layout: 'layouts/blank',
            data: data,
            LoggedU: null,
            Status: Statuss,
            times: gettimev2()
        })
    })

}



module.exports = controller;