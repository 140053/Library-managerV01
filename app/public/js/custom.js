var jq = $.noConflict();



function saveallIN_SS(table) {
    jq.post("/api/save",
    {
        table: table
        
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
    
    jq.post("/api/del",
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

