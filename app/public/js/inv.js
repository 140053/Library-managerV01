
function setdateCustom(){

    var date = $('.daterangeField').val();
    $('#thesis').val(date);
    $('#select_date').modal('toggle');

}


function saveallIN_SS(table, daterange) {
    console.log(table + ' ' + daterange )

    $.post("/api/save",
    {
        table: table,
        daterange: daterange

    },
    function(data, status){
        if(status == 'success'){
            //alert('success saving data');
            window.location.href='/ihs';
        }
    });


}



function delbyID_SS(id,table) {
    //alert(id + ' '  + table);

    $.post("/api/del",
    {
        table: table,
        id: id

    },
    function(data, status){
        if(status == 'success'){
           // alert('success  data');
            window.location.href='/ihs/'+ table ;
        }
    });

}


























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
        // console.log(data[0].name)
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
function editModal(type){
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

function deleteModal(type){
    if(type != null){
        switch (type) {
            case 'office':
                    $('#deleteofficemodal').modal('toggle');
                break;
        
            default:
                break;
        }
    }
}


//manage
$('#manageofficebtn').on('mouseove', function(){
    $('#manageofficemodal').modal('toggle')
    $.post("/inv/list",{
        type: 'office',
         id: null
       
     }, 
     function(data, status){
         //console.log(data[0].Name)
         if(Array.isArray(data)){
             var acont = [];
             for (let index = 0; index < Object.keys(data).length; index++) {  
                 var btn = '<div class="btn-group" role="group">'+
                                '<button onclick=editModal("office") class="btn btn-info">Edit</button>'+
                                '<button onclick=deleteModal("office") type="button" class="btn btn-danger">Delete</button>'+                                
                            '</div>'

                 var aa = '<li class="list-group-item d-flex justify-content-between align-items-center"> '+ data[index].name + btn + ' </li>'
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

$('#seloffice4').on('mouseove', function(){
    selectInvetoryListof('#seloffice4', 'office' , 'null' );
})
$('#selperson4').on('mouseove', function(){
    var officeid = $('#seloffice4').val();
    selectInvetoryListof('#selperson4', 'person' , officeid );
})


//list
$('#listaccountable').on('mouseove', function(){
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
$('#listitembtn').on('mouseove', function(){
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


$('#seloffice2').on('mouseove', function(){
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



$('#seloffice3').on('mouseove', function(){
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




$('#selperson').on('mouseove',function(){
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
