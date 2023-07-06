var express = require('express');
var api = express.Router();
var config = require('./config.js')
api.get('/member/:ac', function (req, res) {
    // res.send('123456');
    var sql = 'SELECT *  FROM member WHERE member_ac=?;'
    config.query(sql, [req.params.ac],
        function (err, result, fields) {
            if (err) {
                console.log(err)
                res.send('完蛋 出錯了' + err)
            } else {
                res.send(JSON.stringify(result));
            }
        })
})
api.post('/member', function (req, res) {
    var sql = 'SELECT *  FROM member WHERE member_id=?;'
    config.query(sql, [req.body.id],
        function (err, result, fields) {
            if (err) {
                console.log(err)
                res.send('完蛋 出錯了' + err)
            } else {
                res.send(JSON.stringify(result));
            }
        })
})
api.get('/carstay', function (req, res) {
    var sql = `SELECT *  FROM carstay;`
    config.query(sql,
        function (err, result, fields) {
            if (err) {
                console.log(err)
                res.send(err + '完蛋 出錯了')
            } else {
                res.send(JSON.stringify(result));
            }
        })

})
api.get('/carstay/:id', function (req, res) {
    var sql = `SELECT *  FROM carstay WHERE sl_id=?;`
    config.query(sql, [req.params.id],
        function (err, result, fields) {
            if (err) {
                console.log(err)
                res.send('完蛋 出錯了' + err)
            } else {
                res.send(JSON.stringify(result));
            }
        })
})
api.get('/traderecord/:id', function (req, res) {
    var sql = `SELECT tr_id, member_id, tr_amount, DATE_FORMAT(tr_date,'%Y/%m/%d')AS tr_date, tr_time,tr_location,tr_counterparty,tr_type,tr_ps,tr_pe,tr_read  FROM traderecord WHERE member_id=? ORDER BY tr_date DESC,tr_time DESC;`
    config.query(sql, [req.params.id],
        function (err, result, fields) {
            if (err) {
                console.log(err)
                res.send('完蛋 出錯了' + err)
            } else {
                res.send(JSON.stringify(result));
            }
        })
})
api.get('/traffic/:id', function (req, res) {
    var sql = `SELECT * FROM traffic WHERE parkingLot_id =?`
    config.query(sql, [req.params.id],
        function (err, result, fields) {
            if (err) {
                console.log(err)
                res.send('完蛋 出錯了' + err)
            } else {
                res.send(JSON.stringify(result));
            }
        })
})
api.get('/traffic', function (req, res) {
    var sql = `SELECT * FROM traffic `
    config.query(sql, [req.params.id],
        function (err, result, fields) {
            if (err) {
                console.log(err)
                res.send('完蛋 出錯了' + err)
            } else {
                res.send(JSON.stringify(result));
            }
        })
})
api.get('/license/:id', function (req, res) {
    var sql = `SELECT * FROM license WHERE member_id=?`
    config.query(sql, [req.params.id],
        function (err, result, fields) {
            if (err) {
                console.log(err)
                res.send('完蛋 出錯了' + err)
            } else {
                res.send(JSON.stringify(result));
            }
        })
})
api.get('/payment/:id',function(req,res){
    // res.send('123456');
    var sql ='SELECT * FROM  payment  WHERE license = ?'
    config.query(sql,[req.params.id],
        function(err,result,fields){
            if (err) {
                console.log(err)
                res.send('完蛋 出錯了' + err)
            } else {
                console.log(result)
                res.send(JSON.stringify(result));
            }
    })
})
module.exports = api;