$(document).ready(function(){

    $('#locateSid').on('click',function(event) {
        var keyword = $('#locateSidval').val();
       if (keyword != ''){

           $.post("/api/getpatronbyID",{
               id: keyword
           },function(data, status){
               if (Object.keys(data).length === 0 ){
                   alert('User: '+ keyword + ' not Found!')
               }else {
                   $('#btnres').removeAttr('disabled')
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













});