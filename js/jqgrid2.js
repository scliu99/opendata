$(document).ready(function () {
    
    $.get("service/wifiod.php?limit=10", function(data){
        console.dir(data.result.results[0]);
    },"json")
    
    
});