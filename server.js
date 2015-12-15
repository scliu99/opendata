
var express = require('express'),
    HTTPClient = require('handy-http'),
    client = new HTTPClient(),
    onResponse = function (err, res) {
        console.log(err || res);
    };
    
var app = express();
app.use('/lib', express.static('lib'));
app.use('/js', express.static('js'));
app.get('/index1.html',function(req, res){
    res.sendFile(__dirname + "/index1.html");
    
})
app.get('/service/wifiod', function(req, res) {
    var page = req.query.page; // get the requested page
    var limit = req.query.rows; // get how many rows we want to have into the grid
    var sidx = req.query.sidx;
    var sord = req.query.sord;
    if(!sidx) sidx = 1;
    var start = limit * page - limit;
    var query_string = "&offset=" + start + "&limit=" + limit;
    var url = "http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=b087af42-2c54-4dbf-86c8-427d788779e5" + query_string;
    client.open({
        url: url,
        method: 'GET',
        //data: fileBuffer,
        // data: fileStream // wil be sended with 'Transfer-Encoding: chunked' HTTP-header, 
        headers: {
            'content-type': 'application/json'
        }
    }, function(err, json_data){
        console.dir(json_data.result);
        //var json_data = JSON.parse(data);
        var count = json_data.result.count;
        console.log(count)
        var total_page = 0;
        if(count>0){
            total_page = Math.ceil(count/limit);
        }
        var response_data = {};
        response_data.page = page;
        response_data.total = total_page;
        response_data.records = count;
        response_data.rows = json_data.result.results;
        
        res.send(response_data);
    });
});

app.listen(8080);
console.log('Listening on port 8080...');


