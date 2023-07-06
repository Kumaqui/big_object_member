var express = require('express');
var app = express();
var cors = require("cors");
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
var mysql = require('mysql');

app.listen(3000, function () {
    console.log('Node server is running..');
    console.log('crtl + c to exit');
});
app.get('/', function (req, res) {
    res.send("我是SERVER ");
})


var config = require('./CRUD/config.js')
var insertCURD = require('./CRUD/insert.js');
app.use('/insert', insertCURD);
var updateCURD = require('./CRUD/update.js');
app.use('/update', updateCURD);
var deleteCURD = require('./CRUD/delete.js');
app.use('/delete', deleteCURD);
var selectCURD = require('./CRUD/select.js');
app.use('/select', selectCURD);
app.use('/Parking_PROJECT_client',express.static('Parking_PROJECT_client') )

//404頁面
app.use(function (req, res) {
    res.send('404找不到 不知道 不清楚 不要問我');
});
