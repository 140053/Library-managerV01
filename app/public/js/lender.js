function Showlender(){
    $('#lendermodal').modal('show');
}

$('#idin').on('keyup', function (){
    var bal = $('#idin').val()
    if (bal.toUpperCase().match("GM")){
        $('#typeid').val('bgame')
    }
    if (bal.toUpperCase().match("SL")){
        $('#typeid').val('bgame')
    }
    if (bal.toUpperCase().match("CH")){
        $('#typeid').val('bgame')
    }
    if (bal.toUpperCase().match("SC")){
        $('#typeid').val('bgame')
    }
    if (bal.toUpperCase().match("-")){
        $('#typeid').val('SID')
    }



})

function changeIdtype(){
    //$('#typeid').val()

}

function changeBgamesType(){
    var bal = $('#dgid').val()
    if (bal.toUpperCase().match("GM")){
        $('#bgamestype').val('gog')
    }
    if (bal.toUpperCase().match("SL")){
        $('#bgamestype').val('snakeandlader')
    }
    if (bal.toUpperCase().match("CH")){
        $('#bgamestype').val('chess')
    }
    if (bal.toUpperCase().match("SC")){
        $('#bgamestype').val('scrabble')
    }
    

}



function lenderReturn(id,bgame, equip, rooom){
    alert('return')
    $.post("/api/returnlender",{
        IDnum: id,
        Barcode: bgame,
        equipment: equip,
        room:rooom
    }, function(data, status){
        console.log(data)
        window.location.href = '/lenderV2';
    })

}