var maxPage = 1;
var map;
$(document).ready(function () {
    var page = 1;
    var rows = 10;
    
    fetchData(page, rows);
    $("#pageRow").change(function(){
        page = 1; 
        rows = $(this).val();
        $("#pageNo").val(page);
        //console.dir($(this).val());
        fetchData(page, rows);
    });
    $("#prePage").click(function(){
        if(page <= 1) {
            page = 1;
        }else{
            page--;
            fetchData(page, rows);        
        }
        $("#pageNo").val(page);
    });
    $("#nextPage").click(function(){
        if(page >= maxPage) {
            page = maxPage;
        }else{
            page++;
            fetchData(page, rows);        
        }
        $("#pageNo").val(page);
    });
    $("#pageNo").blur(function(){
        page = $(this).val();
        if(page <= 1){
            page = 1;
        }else if(page >= maxPage){
            page = maxPage;
        }
        fetchData(page, rows); 
        $("#pageNo").val(page);
    });
    
});



function fetchData(page, rows){
    $("#message").show();
    $.get("/service/wifiod?page="+page+"&rows="+rows, function(data){
        maxPage = data.total;
        //$("myGrid").app
        //for(var item in data)
        var $myGrid = $("#myGrid");
        $myGrid.empty();
        var head = "<tr><th></th><th>ID</th><th>名稱</th><th>地區</th><th>地址</th><th>熱點類別</th></tr>";
        $myGrid.append(head);
        for(var i=0; i<data.rows.length; i++){
            //console.dir(data.rows[i]);
            var lat = data.rows[i].LAT - 0;
            var lng = data.rows[i].LNG - 0;
            var row = "<tr>";
            row += "<td><input type='checkbox' data-index='" + i + "'></input></td>";
            row += "<td>"+ data.rows[i]._id  +"</td>";
            row += "<td>"+ data.rows[i].HOTSPOT_NAME  +"</td>";
            row += "<td>"+ data.rows[i].AREA  +"</td>";
            row += "<td>"+ data.rows[i].ADDRESS  +"</td>";
            row += "<td>"+ data.rows[i].HOTSPOT_TYPE  +"</td>";
            row += "</tr>";
            $myGrid.append(row);
        }    
        // 將資料插入後才能設定事件
        $("input:checkbox").on('change',function(){
            //console.dir($(this));
            //var $this = this;
            var index = $(this).attr("data-index") - 0;
            var lat = data.rows[index].LAT - 0;
            var lng = data.rows[index].LNG - 0;
            var center = new google.maps.LatLng(lat, lng);
            map.panTo(center);
            if($(this).is(":checked")){
                var marker = new google.maps.Marker({
                    position: {lat: lat, lng: lng},
                    map: map,
                    title: data.rows[index].ADDRESS
                });
                data.rows[index].marker = marker;
            }else{
                var marker = data.rows[index].marker;
                if(marker){
                    marker.setMap(null);
                    marker = null;
                }
            }
            
        })
        $("#message").hide();    
    },"json")
    
    
    
    
}
 
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 25.02211, lng: 121.4118},
        zoom: 13
    }); 
}