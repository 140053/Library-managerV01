

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