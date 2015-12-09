<?php
// 以[臺北市列管營業場所消防安全檢查結果]為例
// 網址：http://data.taipei.gov.tw/opendata/apply/NewDataContent?oid=7123E3F3-D5B2-41A6-99D3-4B7393AD5E67
// 主要欄位說明：場所名稱,場所地址,場所用途,最近檢查日期,大隊,列管單位,經度,緯度,檢查結果
//               SBMNAME,SBMXADDR,S104NAME,LASTCDATE,S101NAME,S103NAME,WGS84_X,WGS84_Y,RESULT
// 底下以場所名稱與檢查結果為例
        
/* 資料介接  json 網址*/
//$url = "http://data.taipei.gov.tw/opendata/apply/json/NzEyM0UzRjMtRDVCMi00MUE2LTk5RDMtNEI3MzkzQUQ1RTY3";
$page = $_GET['page']; // get the requested page
$limit = $_GET['rows']; // get how many rows we want to have into the grid
$sidx = $_GET['sidx']; // get index row - i.e. user click to sort
$sord = $_GET['sord']; // get the direction
if(!$sidx) $sidx =1;
$start = $limit*$page - $limit; // do not put $limit*($page - 1)


//$query_string = $_SERVER['QUERY_STRING'];
$query_string = "&offset=" . $start . "&limit=" . $limit;

$url = "http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=b087af42-2c54-4dbf-86c8-427d788779e5" . $query_string;
$data = file_get_contents($url); // 取得json字串
$data = json_decode($data, true); // 將json字串轉成陣列
$count = $data['result']['count'];
if( $count >0 ) {
	$total_pages = ceil($count/$limit);
} else {
	$total_pages = 0;
}
/*        
foreach($data as $value) {
     echo $value['SBMNAME'] . " ";                                
     echo $value['RESULT'] . '<br>';
}*/

$responce =  new stdClass();
$responce->page = $page;
$responce->total = $total_pages;
$responce->records = $count;
$responce->rows = $data['result']['results'];
echo json_encode($responce);
//var_dump($data);
?>