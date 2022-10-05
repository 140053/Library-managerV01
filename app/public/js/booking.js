$(document).ready(function(){

    $('#locateSid').on('click',function(event) {
        var keyword = $('#locateSidval').val();
       if (keyword != ''){

           $.post("/api/getpatronbyID",{
               id: keyword
           },function(data, status){
               if (Object.keys(data).length === 0 ){
                   alert('User: '+ keyword + ' is not Logged in! . Please Login into the Entrance')
               }else {

                   //console.log(data[0])
                   $('#sname').html(data[0].Name.toUpperCase())
                   $('#sCourse').html("Course: " + data[0].Degree_Course + "<br> Student Number: " + data[0].IDnum )
                   $('#snamei').val(data[0].Name)
                   $('#idnum').val(data[0].IDnum)
                   $('#course').val(data[0].Degree_Course)
                   $('#rid').val(data[0].id)
                   $('.forreservation').show();

               }
           })
       }

        $('#locateSidval').val('')
    })

    $('#room').on('change', function (){
        var valll = $('#room').val();

        if(valll === 'avr'){
            $('.avr').show();
            $('.avrip').prop('required',true);
            $('.lecture').hide();
            $('.discussion').hide();
        }
        if (valll == 'lecture'){
            $('.avr').hide();
            $('.lecture').show()
            $('.lectureip').prop('required',true);
            $('.discussion').hide();
        }

        if(valll === 'discussion'){
            $('.avr').hide();
            $('.lecture').hide()
            $('.discussion').show()
            $('.discussionip').prop('required',true);
        }

        $('#btnres').removeAttr('disabled')
    })

    $('#btnres').on('click', function (){
        $('#submitbooking').modal('toggle')
    })

    //bookingform
    $('.booknow').on('click', function (){

        $('#bookingform').submit(function (event){
            alert( "Handler for .submit() called." );
            event.preventDefault();
        });
    })

    $('.booknow').click(function (){
        submitform()
    })

    function submitform(){
        document.getElementById("bookingform").submit();
    }


    $('.openres').on('click', function (){
        $('.reservation').modal('toggle')
    })



});


function AcceptReservation(id, status){
    $.post("/api/room",{
        id: id,
        status: status
    },function(data, status){
        console.log(status)
        window.location.href ='/roomdashboard';
    })
}

function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
}

function infomodal(id, status){

    $('#infomodal').modal('toggle');
    if(id !==''){
        $.post("/api/getroom",{
            rid: id
        }, function (data, status){
            //console.log(data)
            if(Object.keys(data).length != 0){
                $('.roomname').text(data[0].rooms.toUpperCase());
                $('.purpose').text(data[0].purpose)
                $('.snameholder').text(data[0].sname);
                $('.dateres').text(data[0].dateforreserv)
                $('.timerec').text(formatTime(data[0].refrom) + ' - ' + formatTime(data[0].reto))
                $('.idnum').text(data[0].IDnum)
                $('.stpop').text(data[0].people)
                $('.course').text(data[0].course)
                if(data[0].status == 'accept'){
                    var btn = ' <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
                    '          \n' +
                    '          <button type="button" class="btn btn-warning" onclick=AcceptReservation("'+data[0].id+'","false")>Cancel</button>'
                    $('.btnaction').html(btn)
                }
            }
        })
    }

}

