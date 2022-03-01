var statmodel = require('../model/statistics_model')



exports.getDetailed_list = function (req, res){
    var table = req.body.table;



    statmodel.getAllFromTable(table, function (err, result){
        res.json(result)
    })

}