'use strict'

const knex = require('../../database/knex');

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

//real model here


Task.List_office = function( result){
    
    knex.select()
        .table('inv_office')              
        .then(function(res1){
            result(null, res1);
        });
}

Task.list_accountableByOffice = function(officeID, result){
    knex.select()
        .table('inv_accountable')
        .where('office_id',officeID)
        .then( function(res){
            result(null, res);
        })
}

Task.list_myaccountableItems = function(myid, result) {
   
      knex('inv_myaccountable')        
        .whereRaw('accountable_id=?', [myid])
        .then( function(res){
            result(null, res);
        })
}


Task.insertMyAccountableItems = function(data, result){
   
    knex('inv_myaccountable')
        .insert({
            paccnt: data.person,
            office: data.office,
            accountable_id: data.acountableID,
            name: data.name,
            location: data.location,
            ammount: data.amount,
            serialnumber:  data.SN ,
            daquired: data.dateAquired,
            propertynumber:   data.propertynumber ,
            'typeof': data.unit,
            model: data.model,
            toequip: data.typof,
            status: 'onsite' },)
        .then( function(res){
            result(null, true);
        })
}


Task.insertMyAccountablePhoto = function(data,itemID, result){

    console.log( 'model part ' + itemID + ' ' + data)
    var filename = JSON.stringify(data) 
  
    knex('inv_myaccountable')
        .update({photo: filename } )
        .where('serialnumber', '=',itemID)
        .then( function(res){
            result(null, true);
        })
}


//add office
Task.insertinoffice = function(data, result){
    knex('inv_office')
        .insert({
            name: data.name,
            code: data.code
        })
        .then( function(res){
            result(null, true);
        })

}

//add Person

Task.insertaccountableperson = function(data, result){
    knex('inv_accountable')
        .insert({
            Name: data.name,
            photo: data.photo,
            office_id: data.office
        })
        .then( function(res){
            result(null, true);
        })
}


//delete
Task.invDeleteOffice = function(fid, result){
  
    knex('inv_office')
        .where('id', '=' , fid)
        .del()
        .then( function(res){
            result(null, true);
        })
}

Task.invDeletePerson = function(pid){
    knex('inv_accountable')
        .where(id, '=' , pid)
        .del()
}

Task.invDeleteItem = function(iid){
    knex('inv_myaccountable')
        .where(id, '=' , iid)
        .del()
}






module.exports = Task;