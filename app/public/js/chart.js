
function getmoth(){
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date();
    $('.montholder').html(monthNames[d.getMonth()].toUpperCase())
}



function makechart(docID, typeC, labels, data, datalabel){
    const ctx = document.getElementById(docID);

    const myChart = new Chart(ctx, {
        type: typeC,
        data: {
            labels: labels,
            datasets: [{
                label: datalabel,
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function makechartpie(docID, typeC, labels, data, datalabel){
    const ctx = document.getElementById(docID);

    const myChart = new Chart(ctx, {
        type: typeC,
        data: {
            labels: labels,
            datasets: [{
                label: datalabel,
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,

        }
    });
}

function makechart2(docID, typeC, labels, data, datalabel){
    const ctx = document.getElementById(docID);

    const myChart = new Chart(ctx, {
        type: typeC,
        data: {
            labels: labels,
            datasets: [{
                label: datalabel,
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


async function getLoginByCourse(getdata, location){

    if (getdata == 'PatronBYCourse'){
        if( location == 'GCIR'){
            await $.post("/api/getLogby",{
                location: 'General Circulation'
            }, function(data, status){
                //console.log(data)
                var newdata = prepData(data)
                makechart('myChart', 'bar',newdata.Kurso, newdata.logged,'# of Students')
            });
        }else if (location == 'LCM'){
            await $.post("/api/getLogby",{
                location: 'Learning Commons'
            }, function(data, status){
                //console.log(data)
                var newdata = prepData(data)
                makechart('myChart1', 'bar',newdata.Kurso, newdata.logged,'# of Students')
            });
        } else if (location == 'GENDER'){
            await $.post("/api/getLogby",{
                location: 'Gender'
            }, function(data, status){
                //console.log(data)
                var newdata = prepdataGender(data)
                makechartpie('myChart3', 'doughnut',newdata.label, newdata.cnt,'# of Gender')
            });
        }else if (location == 'GROUP') {
            await $.post("/api/getLogby",{
                location: 'GROUP'
            }, function(data, status){
                //console.log(data)
                var newdata = prepdataGender(data)
                makechartpie('myChart4', 'doughnut',newdata.label, newdata.cnt,'# of GROUP')
            });
        }else if(location == 'Library'){
            await $.post("/api/getLogby",{
                location: 'LIBRARY'
            }, function(data, status){
                //console.log(data)
                var newdata = prepdataGender(data)
                makechartpie('myChart5', 'doughnut',newdata.label, newdata.cnt,'# of GROUP')
            });
        }

    }else if(getdata =='Resources'){

        await $.post("/api/getinhouse",{
            table: 'book'
        }, function(data, status){
            var newdata = prepdataInhouse(data)
            //var newdata = prepData(data)
           makechart2('myChart2', 'bar',newdata.label, newdata.cnt,'# of Record')
        });
    }

}

function prepData(data){
    var datalen = Object.keys(data).length
    var Kurso = []
    var logged = []
    for (let i = 0; i < datalen; i++) {
        Kurso.push(data[i].Degree_Course)
        logged.push(data[i].login)
    }
    var newdata = {Kurso, logged}
    //console.log(newdata.Kurso)
    return newdata;
}

function prepdataInhouse(data){
    //console.log(data)
    var datalen = Object.keys(data).length
    var label = []
    var cnt = []
    for (let i = 0; i < datalen; i++) {
        //console.log(data[i].table)
        label.push(data[i].table)
        cnt.push(data[i].cnt)
    }
    var newdata = {label, cnt}
    return newdata;
}

function prepdataGender(data){
    //console.log(data)
    var datalen = Object.keys(data).length
    var label = []
    var cnt = []
    for (let i = 0; i < datalen; i++) {
        //console.log(data[i].table)
        label.push(data[i].gender)
        cnt.push(data[i].cnt)
    }
    var newdata = {label, cnt}
    return newdata;
}







getLoginByCourse('PatronBYCourse','GCIR')
getLoginByCourse('PatronBYCourse','LCM')
getLoginByCourse('PatronBYCourse','GENDER')
getLoginByCourse('PatronBYCourse','GROUP')
getLoginByCourse('PatronBYCourse','Library')
getLoginByCourse('Resources','')
getmoth()


