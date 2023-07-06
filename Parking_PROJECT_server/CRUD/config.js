var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '8889',
    database:'carparking'
});
connection.connect(function(err,cat){
    if(err){
        console.log('SQL錯誤訊息',err.sqlMessage);
    }else{
        console.log(cat,'連線成功');
    }
});
module.exports = connection;