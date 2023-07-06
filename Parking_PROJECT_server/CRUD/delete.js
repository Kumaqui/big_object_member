var express = require('express');
var api = express.Router();
var config = require('./config.js')
api.delete('/payment/:id',function(req,res){
    console.log(req.params.id)
    var sql ='DELETE FROM payment WHERE py_id=?;'
    config.query(sql,[req.params.id],
        function(err,result,fields){
           console.log(err)
    })
    res.send("刪除成功");
})
api.post('/license',function(req,res){ 
    var sql =`DELETE FROM license WHERE license=?;`
    config.query(sql,[req.body.license],
        function(err,result,fields){
           console.log(err)
           res.send("刪除成功");
    })
    
})
module.exports = api;