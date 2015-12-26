var map;
var maxPage = 1;
$(document).ready(function () {
    var page = 1;
    var rows = 10;
    fetchData(page, rows);
   
    // 下拉選單
    $("#pageRow").change(function(){
        page = 1;
        $("#pageNo").val(page);
        rows = $(this).val();
        fetchData(page, rows);
    });
    
    // 前一頁
    $("#prePage").click(function(){
        if(page <= 1){
            page = 1;
        }else{
            page--;
            fetchData(page, rows);
        }
        $("#pageNo").val(page);
    });
    
    // 頁次
    $("#pageNo").blur(function(){
        page = $(this).val();
        fetchData(page, rows);
    });
    
    // 後一頁
    $("#nextPage").click(function(){
        if(page >= maxPage){
            page = maxPage;
        }else{
            page++;
            fetchData(page, rows);   
        }
        $("#pageNo").val(page);
    });
});
function fetchData(page, rows){
    $.get("/service/wifiod?page="+page+"&rows="+rows, function(data){
        console.dir(data);
        maxPage = data.total;
        $myGrid = $("#myGrid");
        //var tr1 = "<tr><td>111</td><td>222</td></tr>"
        $myGrid.empty();
        var head = "<tr><th></th><th>ID</th><th>名稱</th><th>地區</th><th>地址</th><th>熱點類別</th></tr>";
        $myGrid.append(head);
        
        for(var i=0;i<data.rows.length;i++){
          
          var row = "<tr>";
          row += "<td><input type='checkbox' data-index='"+ i +"'></input></td>";
          row += "<td>" + data.rows[i]._id + "</td>";
          row += "<td>" + data.rows[i].HOTSPOT_NAME + "</td>";
          row += "<td>"+ data.rows[i].AREA  +"</td>";
          row += "<td>"+ data.rows[i].ADDRESS  +"</td>";
          row += "<td>"+ data.rows[i].HOTSPOT_TYPE  +"</td>";
          row += "</tr>";
          $myGrid.append(row);
        }
         $("input:checkbox").on("change",function(){
            var index = $(this).attr("data-index") - 0;
            var item = data.rows[index];
            var lat = item.LAT - 0;
            var lng = item.LNG - 0;
            var center = new google.maps.LatLng(lat,lng);
            map.panTo(center); // 移到center
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
        
        
    },"json")
    //$myGrid("input:checkbox").change(function(){
   
}
 function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 25.02211, lng: 121.4118},
      zoom: 13
      
    });
  }