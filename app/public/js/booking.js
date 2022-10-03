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


function AcceptReservation(id){

    $.post("/api/room",{
        id: id
    },function(data, status){
        console.log(status)
        window.location.href ='/roomdashboard';
    })
}

