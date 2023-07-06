var express = require('express');
var api = express.Router();
var config = require('./config.js')
api.put('/membermoney', function (req, res) {
    var sql = 'SELECT member_money  FROM member WHERE member_id=?;'    
    var sql1 = 'UPDATE member SET member_money=? where member_id=?;'   
    
    config.query(sql, [req.body.id],
        function (err, results, fields) {
            if (err) {
                console.log(err)
                res.send("修改失敗" + JSON.stringify(err))
            } else {
                var x = parseInt(results[0].member_money)+parseInt(req.body.money)
                config.query(sql1, [x,req.body.id],function(err, results, fields){
                    console.log(results)
                    res.send(results)
                })
                
            }
        })
        // console.log(x)
})
api.put('/memberimg', function (req, res) {
    var sql = 'SELECT member_image  FROM member WHERE member_id=?;'    
    var sql1 = 'UPDATE member SET member_image=? where member_id=?;'   
    
    config.query(sql, [req.body.id],
        function (err, results, fields) {
            if (err) {
                console.log(err)
                res.send("修改失敗" + JSON.stringify(err))
            } else {
                config.query(sql1, [req.body.image,req.body.id],function(err, results, fields){
                    console.log(results)
                    res.send(results)
                })
                
            }
        })
})
api.put('/ncread', function (req, res) {
    var sql = 'UPDATE traderecord SET tr_read = 1 WHERE member_id = ?;';
    var sql1 = 'UPDATE payment SET py_read = 1 WHERE license = ?;';
    // 假設 req.body.license 是一個包含多個車牌號碼的陣列
    var licenses = req.body.license;
    console.log(licenses);
    // 更新 traderecord 資料表
    config.query(sql, [req.body.id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // res.send("result")
        }
    });
    // 逐一更新 payment 資料表中的車牌號碼
    licenses.forEach((license) => {
        config.query(sql1, [license], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                // res.send("result")
            }
        });
    });
});

module.exports = api;