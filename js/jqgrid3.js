$(document).ready(function () {
     $("#jqGrid").jqGrid({
        url: 'service/wifiod.php',
        mtype: "GET",
        datatype: "json",
        colNames:['Id','熱點', '地區', '地址', '熱點類別', 'LNG', 'LAT'],
        colModel:[
           	{name:'_id',index:'_id', width:55},
           	{name:'HOTSPOT_NAME',index:'HOTSPOT_NAME', width:90},
           	{name:'AREA',index:'AREA', width:90},
           	{name:'ADDRESS',index:'ADDRESS', width:280},
           	{name:'HOTSPOT_TYPE',index:'HOTSPOT_TYPE', width:90},
           	{name:'LNG',index:'LNG', width:90},
           	{name:'LAT',index:'LAT', width:90},
           	
        ],
        rowNum:50,
        rowList:[50,100,200],
        width:900,
        height:500,
        pager: 'jqGridPager',
        sortname: 'id',
        viewrecords: true,
        sortorder: "desc",
        caption:"JSON Example"
    });
    
    //$("#jqGrid").jqGrid('gridResize',{minWidth:350,maxWidth:800,minHeight:80, maxHeight:350});
    
});