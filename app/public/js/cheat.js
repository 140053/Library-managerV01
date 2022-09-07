$(document).ready(function (){
    $('#autolog').on('click', function (){
        getIDRand()



    })


    /**

      { slocation: 'Learning Commons', keyword2: '00-0000' }

     $.post("/llogin",{
                slocation: data,
                keyword2: 00-0000
            },
     function(data, status){
                console.log(data)
            });


     */

    function getIDRand(){
        $.post("/api/getrandID",{
            data: ''
        }, function (data, status){
            //console.log(data[0].IDnum)
            autolog(data[0].IDnum)

        })
    }

    function autolog(id){
       // console.log(id)

        $.post('/llogin',{
            slocation: 'Learning Commons',
            keyword2: id
        }, function (data, status){
            console.log(id)
            $('#patronlog').append("<div class=\"card m-2 d-flex justify-content-center\" style=\"width: 15rem;\">\n" +
                "        <img style=\"width: 4cm; height: 4cm;\"  class=\"card-img-top img-responsive img-size-32\" src=\"/img/photo1.png\" alt=\"Card image cap\">\n" +
                "        <div class=\"card-body\">\n" +
                "            <h5 class=\"card-title\">"+ id +"</h5>\n" +
                "            <p class=\"card-text\">" + status + "</p>\n" +
                "            <a href=\"/\" class=\"btn btn-primary\">Home</a>\n" +
                "        </div>\n" +
                "    </div>")
        })


    }


})