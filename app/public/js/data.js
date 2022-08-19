
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