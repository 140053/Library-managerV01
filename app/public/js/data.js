
$(document).ready( function () {
    $('#example').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print', 'pageLength'
        ],
        lengthMenu: [
            [ 10, 25, 50, -1 ],
            [ '10 rows', '25 rows', '50 rows', 'Show all' ]
        ],

    } );


    $('#clickme').on('click', function (){
        alert('click work')
        console.log('sasa')
    })

    $('#searchpa').keypress( function (){
        var data = $('#searchp').val()
        $.post("/api/getpatron",{
                data: data
            },
            function(data, status){
                console.log(data)
            });
    })


    $('#searchp').on('keypress',function(e) {
        if(e.which == 13) {
            var data = $('#searchp').val()
            $.post("/api/getpatron",{
                    data: data
                },
                function(data, status){
                   // console.log(data)
                    var len = Object.keys(data).length
                    if ( len > 0 ){
                        var datalog = []
                        var a
                        for (let i = 0; i < len; i++) {
                            //console.log(data[i].Name)
                            a = '<tr>\n' +
                                    '<th scope="row">' + i + '</th>\n' +
                                    '<td>' + data[i].Name + '</td>\n' +
                                    '<td>' + data[i].Degree_Course + '</td>\n' +
                                    '<td>' + data[i].IDnum + '</td>\n' +
                                    '<td><div class="btn-group d-flex justify-content-center" role="group" aria-label="Basic example">\n' +
                                        '  <button id="' + data[i].IDnum + '" onclick="editpatron(this.id)" type="button" class="btn  btn-success "   > EDIT</button>\n' +
                                        '  <button id="' + data[i].IDnum + '" onclick="deletepatron(this.id)" type="button" class="btn btn-danger btn-outline-warning">DELETE</button>\n' +
                                    '</div></td>\n' +
                                '</tr>'
                            datalog.push(a)
                        }
                        $('.datahold').html(datalog)
                    }
                    $('#table').DataTable();

                });
        }
    });



});

function editpatron(ID){
    $.post("/api/getOnepatron",{
        data: ID
    },function(data, status){
        console.log(data)
        $('.editModalPatron').modal('toggle')
        $('#pname').val(data.Name)
        $('#pKurso').val(data.Degree_Course)
        $('#pIDnum').val(data.IDnum)
        $('#inputCity').val(data.Address)
        $('#pyear').val(data.Year_Level)
        $('#pgroup').val(data.User_class)
        $('#pdateapplied').val(data.DateApplied)
        $('#pdateexpired').val(data.DateExpired)
        $('#pbranch').val(data.branch)
        $('#pgender').val(data.gender)


    });
}

function deletepatron(ID){
    $.post("/api/getOnepatron",{
        data: ID
    },function(data, status){
        console.log(data)
        $('.deletepatron').modal('toggle');
        var Udata = data.Name + '<br>' + data.Degree_Course + '<br>' +  data.IDnum

        $('#patroninfo').html(Udata)
        $('.cnlbtn').attr('id',  data.IDnum)
        $('.delbtn').attr('href', '/api/delpatron/' + data.IDnum)
    });
}

function deletePatron(ID, status){
    if (status == 'cancel') {
        $('.deletepatron').modal('toggle');

    }else if (status == 'true'){

    }else {
        $('.deletepatron').modal('toggle');
    }

}

// listlog

$('.searchlog').keyup( function(event){
    if (event.keyCode === 13) {
        var elementstatus = $('.dataalert').is(":hidden");
        //console.log(elementstatus + ' status')
        if(elementstatus == true){
            $('.dataalert').show();
            $('.datalog').empty();
        }
        var data = $('.searchlog').val();
        $.post("/api/getpatronbyID",{
            id: data
        },function(data, status){
            if (Object.keys(data).length > 0){
                var template = ' <div class="card ml-2 mr-2 mb-2 " style="width: 18rem;">\n' +
                    '                    <div class="img-responsive  " >\n' +
                    '                        <img  class="img-fluid " src="/img/photo1.png" alt="Card image cap">\n' +
                    '                    </div>\n' +
                    '                    <div class="card-body justify-content-center">\n' +
                    '                        <h5 class="card-title">' + data[0].Name + '</h5>\n' +
                    '                        <p class="card-text">Course: ' + data[0].Degree_Course + '<br> Student Number: <b>' + data[0].IDnum + '</b><br> Group: ' + data[0].User_Class  + '</p>\n' +
                    '                        <button onclick="triggermodal(this.id,'+ '&apos;' + data[0].Name + '&apos;' + ','+ '&apos;' + data[0].Degree_Course + '&apos;' +')" id="' + data[0].IDnum + '" class="btn btn-primary btn-block">Borrow</button>\n' +
                    '                    </div>\n' +
                    '                </div>';
                $('.datalog').html(template)
                $('.dataalert').hide();
            }else{
                var alert = '<div class="alert alert-danger" role="alert">\n' +
                    '  <h4 class="alert-heading">Not FOUND</h4>\n' +
                    '  <p>No User ID Found in the record that logged today </p>\n' +
                    '  <hr>\n' +
                    '  <p class="mb-0">{}</p>\n' +
                    '</div>'
                $('.dataalert').html(alert)
            }
        });
        $('.searchlog').val('')
    }
})

function listAllLoggedToday(){
    ///listpatronToday
    $.post("/api/listpatronToday",{
        id: ''
    },function(data, status){
        //console.log(data)
        if (Object.keys(data).length > 0){
            var datalist = [];
            for (let i = 0; i < Object.keys(data).length ; i++) {

                var template = ' <div class="card ml-2 mr-2 mb-2 " style="width: 18rem;">\n' +
                    '                    <div class="img-responsive  " >\n' +
                    '                        <img  class="img-fluid " src="/img/photo1.png" alt="Card image cap">\n' +
                    '                    </div>\n' +
                    '                    <div class="card-body justify-content-center">\n' +
                    '                        <h5 class="card-title">' + data[i].Name + '</h5>\n' +
                    '                        <p class="card-text">Course: ' + data[i].Degree_Course + '<br> Student Number: <b>' + data[i].IDnum + '</b><br> Group: ' + data[i].User_Class  + '</p>\n' +
                    '                        <button onclick="triggermodal(this.id,'+ '&apos;' + data[i].Name + '&apos;' + ','+ '&apos;' + data[i].Degree_Course + '&apos;' +')" id="' + data[i].IDnum + '"  class="btn btn-primary btn-block">Borrow</button>\n' +
                    '                    </div>\n' +
                    '                </div>';
                datalist.push(template)

            }

            $('.listlogged').html(datalist)

        }
    });
}


function triggermodal(id, name, course){
    $('#sname').text(name)
    $('#sdesc').empty().text('Course: ' + course + ' ' + 'Student Number: ' + id)
    $('#snamei').val(name)
    $('#idnum').val('').val(id)
    $('#course').val(course)
    $('.brmodal').modal('toggle');
}

$('#borroworreserved').on('change', function (){
    var value = $(this).val();
    if (value === 'borrow'){
        if($('.itemlist').is(':hidden')){
            $('#labelforitem').text('Materials').show()
            $('.itemlist').show().attr('required');
            $('#room').val('')

        }
        $('#room').hide()
        $('.forreservation').hide();

    }else if(value === 'reserve'){
        if($('#room').is(':hidden')){
            $('#room').show().attr('required');
            $('#labelforitem').text('Rooms').show()
            $('.itemlist').val('')
            $('.forreservation').show();

        }
        $('#labelforboardgames').hide()
        $('.listforboardgames').hide().val('')
        $('.itemlist').hide()
        $('.fofequipments').hide();

    }else {
        $('#labelforitem').hide()
        $('#labelforboardgames').hide()
        $('.listforboardgames').hide().val('')
        $('.itemlist').hide()
        $('#room').hide()
        $('.forreservation').hide();
        $('.fofequipments').hide();
    }
    /**
    var itemlist = $('.itemlist').val();
    if (itemlist === 'equipment'){
        $('#labelforboardgames').hide()
        $('.listforboardgames').hide()
    }
     **/
})

$('#item').on('change', function () {
    var value = $('#item').val();
    if (value === 'boardgames') {
        if( $('.listforboardgames').is(':hidden')){
            $('#labelforboardgames').show();
            $('.listforboardgames').show();
            $('.forbarcode').show();
        };
        $('.fofequipments').hide();

    }else if(value == 'equipment'){
        if($('.fofequipments').is(':hidden')){
            $('.fofequipments').show()
        }
        $('#labelforboardgames').hide();
        $('.listforboardgames').hide().val('');
        $('.forbarcode').hide().val('')

    }else {
        $('#labelforboardgames').hide();
        $('.listforboardgames').hide().val('');
        $('.forbarcode').hide().val('')
        $('.fofequipments').hide();
    }


})


$('#board').on('click', function (){
    getlenderdata('board')
})
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

function getlenderdata(category){
    $.post("/api/getlender",{
        category: category
    },function(data, status){
        console.log(data[0])
        var lend = Object.keys(data[0]).length;
        console.log(lend)
        var boarddata = []
        for (let i = 0; i < lend; i++) {
            var temp = ' <button id="'+data[0][i].id+'" onclick="lenderReturn(this.id,'+ '&apos;' + data[0][i].boardgamesbcode + '&apos;' +',null,null)" type="button" class="btn btn-outline-success">' + data[0][i].sname + ' '+ data[0][i].course +  ' ' + data[0][i].IDnum  + ' ' + data[0][i].boardgames.toProperCase() + ' {' + data[0][i].boardgamesbcode.toUpperCase() + '}  </button>'
            boarddata.push(temp)

        }
        $('#boarddata').html(boarddata)


    })
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
    })

}