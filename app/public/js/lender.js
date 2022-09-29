function Showlender(){
    $('#lendermodal').modal('show');
}

$('#dgid').on('keyup', function (){
    var bal = $(this).val()
    alert(bal)
    /*
    if ($(this).val().toUpperCase().match("GM")){
        $('#bgamestype').val('gog')
    }
    if ($(this).val().toUpperCase().match("SL")){
        $('#bgamestype').val('snakeandlader')
    }
    if ($(this).val().toUpperCase().match("CH")){
        $('#bgamestype').val('chess')
    }
    if ($(this).val().toUpperCase().match("SC")){
        $('#bgamestype').val('scrabble')
    }

     */
})

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