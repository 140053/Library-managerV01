

function getAcountableByOffice(id){
   

    $.post("/inv/request",{
        what: 'accountable',
        id:  id  
    }, 
    function(data, status){
        //console.log(data[0].Name)
        if(Array.isArray(data)){
            var acont = [];
            for (let index = 0; index < Object.keys(data).length; index++) {
               
                var a = ' <a class="list-group-item list-group-item-action"  href="/inv/request/myaccountable/'+ data[index].id +'/'+ data[index].Name +' " id="'+ data[index].id +'" ><small> '+ data[index].Name +'</small></a>'
                acont.push(a)
            }
            $('.acountable').html(acont)
        }
      
    })
}

function selectInvetoryListof(idofdst, type, officeid  ){
    $.post("/inv/list",{
        type: type,
         id: officeid
       
     }, 
     function(data, status){
        // console.log(data[0].name)
        // if(Array.isArray(data)){
             var acont = [];
             for (let index = 0; index < Object.keys(data).length; index++) {
                
                if(type == 'person'){
                    var a = ' <option value="'+ data[index].id+'">'+ data[index].Name+'</option>'
                }else if(type == 'items'){
                    var btn = '<div class="btn-group" role="group" aria-label="Basic example">'+
                                    '<button type="button" class="btn btn-info">Edit</button>'+
                                    '<button type="button" class="btn btn-danger">Delete</button>'+                                
                                '</div>'

                    var a = '<li class="list-group-item d-flex justify-content-between align-items-center"> '+ data[index].name + btn + ' </li>'
                }else{
                    var a = ' <option value="'+ data[index].id+'">'+ data[index].name+'</option>'
                }                
                 acont.push(a)
             }
             $(idofdst).html(acont)
        // }
       
     })
}
function selectInvetoryListofitems(idofdst, type, personid  ){
    $.post("/inv/list",{
        type: type,
         id: personid
       
     }, 
     function(data, status){
        // console.log(data[0])
        // if(Array.isArray(data)){
             var acont = [];
             for (let index = 0; index < Object.keys(data).length; index++) {
                
              
                    var btn = '<div class="btn-group" role="group" aria-label="Basic example">'+
                                    '<button type="button" class="btn btn-info">Edit</button>'+
                                    '<button type="button" class="btn btn-danger">Delete</button>'+                                
                                '</div>'

                    var a = '<li class="list-group-item d-flex justify-content-between align-items-center"> '+ data[index].name + btn + ' </li>'
                    console.log(a)
                        
                 acont.push(a)
             }
             $(idofdst).html(acont)
        // }
       
     })
}

//edit office
function editModal(type, id, name){
    if(type != null){
        switch (type) {
            case 'office':
                    $('#editofficemodal').modal('toggle');
                   
                break;
        
            default:
                break;
        }
    }
}

function deleteModal(type, id, name){
    if(type != null){
        switch (type) {
            case 'office':
                    $('#deleteofficemodal').modal('toggle');
                    $('.nanamu').text(name)
                    $('.type').text(type)
                    $('.idd').text(id)
                break;
        
            default:
                break;
        }
    }
}


function finalDeleteModal(){
    var type = $('.type').html()
    var id =  $('.idd').html()
    var name = $('.nanamu').html();
   // alert(type + ' ' + id + ' ' + name)

    $.post("/inv/delete",{
        type: type,
         id: id
       
     }, 
     function(data, status){
       console.log(status)
     })
     $('#deleteofficemodal').modal('hide')
     $('#manageofficemodal').modal('hide')
     
}


//manage
$('#manageofficebtn').on('click', function(){
   
    $('#manageofficemodal').modal('toggle')
    $.post("/inv/list",{
        type: 'office',
         id: null
       
     }, 
     function(data, status){
         console.log(data)
         if(Array.isArray(data)){
             var acont = [];
             for (let index = 0; index < Object.keys(data).length; index++) {  
                 var btn = '<div class="btn-group" role="group">'+
                                '<button onclick=editModal("office") class="btn btn-info">Edit</button>'+
                                '<button onclick=deleteModal("office","'+ data[index].id +'","'+ data[index].name +'") type="button" class="btn btn-danger">Delete</button>'+                                
                            '</div>'
               
                    var aa = '<li id=" '+ data[index].name + '-'+ data[index].id +'" class="list-group-item d-flex justify-content-between align-items-center "> '+ data[index].name + btn + ' </li>'
               
                 acont.push(aa)
             }
             $('.listoffice').html(acont)
         }
       
     })
})

$('#manageaccountablepersonbtn').on('click', function(){
    $('#manageaccountablepersonmodal').modal('toggle')

})

$('#manageitembtn').on('click', function(){
    $('#manageitemmodal').modal('toggle')
})

$('#seloffice4').on('mouseover', function(){
    selectInvetoryListof('#seloffice4', 'office' , 'null' );
})
$('#selperson4').on('mouseover', function(){
    var officeid = $('#seloffice4').val();
    selectInvetoryListof('#selperson4', 'person' , officeid );
})


//list
$('#listaccountable').on('mouseover', function(){
    var officeid = $('#seloffice3').val();
   
    if( officeid == null){
        alert('Select Office First')
    }else{
        $.post("/inv/list",{
            type: 'person',
             id: officeid
           
         }, 
         function(data, status){
             //console.log(data[0].Name)
             if(Array.isArray(data)){
                 var acont = [];
                 for (let index = 0; index < Object.keys(data).length; index++) {  
                     var btn = '<div class="btn-group" role="group" aria-label="Basic example">'+
                                    '<button type="button" class="btn btn-info">Edit</button>'+
                                    '<button type="button" class="btn btn-danger">Delete</button>'+                                
                                '</div>'
    
                     var aa = '<li class="list-group-item d-flex justify-content-between align-items-center"> '+ data[index].Name + btn + ' </li>'
                     acont.push(aa)
                 }
                 $('.listperson').html(acont)
             }
           
         })
    }
    
})


//list item
$('#listitembtn').on('click', function(){
    
    var personid = $('#selperson4').val();
    selectInvetoryListofitems('.listitem', 'items', personid);
})



//add
$('.myaccbtn').on('click', function(){
    $('#groupmdl').modal('toggle')
})

$('.toolsetbtn').on('click', function(){
    $('#toolset').modal('toggle')
})

$('#addofficebtn').on('click', function(){
    $('#addofficemodal').modal('toggle')
})

$('#addaccountablepersonbtn').on('click', function(){
    $('#addaccountablepersonmodal').modal('toggle')
})

$('#additembtn').on('click', function(){
    $('#additemmodal').modal('toggle')
})





$('#seloffice').on('mouseover', function(){
    $.post("/inv/list",{
       type: 'office',
        id: null
      
    }, 
    function(data, status){
        //console.log(data[0].Name)
        if(Array.isArray(data)){
            var acont = [];
            for (let index = 0; index < Object.keys(data).length; index++) {
               
                var a = ' <option value="'+ data[index].id+'">'+ data[index].name+'</option>'
                acont.push(a)
            }
            $('#seloffice').html(acont)
        }
      
    })
})


$('#seloffice2').on('mouseover', function(){
    $.post("/inv/list",{
       type: 'office',
        id: null
      
    }, 
    function(data, status){
        //console.log(data[0].Name)
        if(Array.isArray(data)){
            var acont = [];
            for (let index = 0; index < Object.keys(data).length; index++) {
               
                var a = ' <option value="'+ data[index].id+'">'+ data[index].name+'</option>'
                acont.push(a)
            }
            $('#seloffice2').html(acont)
        }
      
    })
})



$('#seloffice3').on('mouseover', function(){
  
    $.post("/inv/list",{
       type: 'office',
        id: null
      
    }, 
    function(data, status){
        //console.log(data[0].Name)
        if(Array.isArray(data)){
            var acont = [];
            for (let index = 0; index < Object.keys(data).length; index++) {
               
                var a = ' <option value="'+ data[index].id+'">'+ data[index].name+'</option>'
                acont.push(a)
            }
            $('#seloffice3').html(acont)


            
        }
      
    })
})




$('#selperson').on('mouseover',function(){
    var officeid = $('#seloffice2').val();
   // alert(officeid)


    if (officeid != ''){
        $.post("/inv/list",{
            type: 'person',
             id: officeid
           
         }, 
         function(data, status){
             //console.log(data[0])
             if(Array.isArray(data)){
                 var acont = [];
                 for (let index = 0; index < Object.keys(data).length; index++) {
                    
                     var a = ' <option value="'+ data[index].id+'">'+ data[index].Name+'</option>'
                     acont.push(a)
                 }
                 $('#selperson').html(acont)
             }
           
         })


    }else{

        alert('Please Select Office First!!')
    }
})
