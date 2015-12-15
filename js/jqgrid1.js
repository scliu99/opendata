
$(document).ready(function () {
    $.get("/service/wifiod?page=1&rows=20", function(data){
        console.dir(data);
        console.log(data.records);
        console.log(data.rows[1].AP_ID);

    },"json")
});


