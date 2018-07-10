var sql = require('../sql/sql');
var moment = require('moment');
var func = require('../sql/func');
var path = require('path');

function formatData(rows) {
    return rows.map(row => {
        row.a_expiretime = moment.unix(row.a_expiretime).format("YYYY-MM-DD hh:mm:ss");
        row.r_regtime = moment.unix(row.r_regtime).format("YYYY-MM-DD hh:mm:ss");
    });
}


module.exports = {
    // 获取商品列表
    selectAll (req, res) {
        res.json({code: 200, msg: 'ok', goods: 'aaa'});
		return;
        func.connPool("select * from tb_account;", '', (err, rows) => {
            //rows = formatData(rows);
            console.log(rows);
            res.json({code: 200, msg: 'ok', data: rows});
         });
    },

    login (req, res) {
        //res.json({code: 200, msg: 'ok', goods: 'aaa'});
        var name = req.body.name;
        var pwd = req.body.pwd;
        func.connPool("select * from admin where name=?;", [name], (err, rows) => {
            //rows = formatData(rows);
            if(err || !rows || rows.length < 1 || rows[0].password != pwd){
                res.json({code: 1, msg: 'invalid user', user: name});
                return;
            }
            req.session.user = name;
            res.json({code: 0, msg: 'ok', user: name});
        });
    },

    search (req, res) {
        //res.json({code: 200, msg: 'ok', goods: 'aaa'});
        var telephone = req.body.telephone;
        var sql = 'select * from tb_account inner join tb_register on tb_account.a_account = tb_register.r_account where tb_account.a_telephone = ?'
        func.connPool(sql, [telephone], (err, rows) => {
            //rows = formatData(rows);
            if(err || !rows || rows.length < 1){
                console.log('search error');
                res.json({code: 1, msg: 'not found info', data: telephone});
                return;
            }
            formatData(rows);
            console.log("search:");
            console.log(rows);
            res.json({code: 0, msg: 'ok', data: rows});
        });
    },

    resetPwd (req, res) {
        //res.json({code: 200, msg: 'ok', goods: 'aaa'});
        var pwd = req.body.pwd;
        var pid = req.body.pid;
        var sql = 'update tb_account set a_password = ? where a_pid = ?'
        func.connPool(sql, [pwd, pid], (err, rows) => {
            //rows = formatData(rows);
            if(err){
                res.json({code: 1, msg: 'update error', data: pid});
                return;
            }
            res.json({code: 0, msg: 'ok', data: pid});
        });
    },

    resetExpiretime (req, res) {
        //res.json({code: 200, msg: 'ok', goods: 'aaa'});
        var time = req.body.expiretime;
        console.log(time);
        var timeval = moment(time, "YYYY-MM-DD hh:mm:ss").unix()
        console.log(timeval);
        var pid = req.body.pid;
        var sql = 'update tb_account set a_expiretime = ? where a_pid = ?'
        func.connPool(sql, [timeval, pid], (err, rows) => {
            //rows = formatData(rows);
            if(err){
                res.json({code: 1, msg: 'update error', data: pid});
                return;
            }
            res.json({code: 0, msg: 'ok', data: time});
        });
    },

    resetAgentcount (req, res) {
        //res.json({code: 200, msg: 'ok', goods: 'aaa'});
        var agentcount = req.body.agentcount;
        var pid = req.body.pid;
        var sql = 'update tb_account set a_agentcount = ? where a_pid = ?'
        func.connPool(sql, [agentcount, pid], (err, rows) => {
            //rows = formatData(rows);
            if(err){
                res.json({code: 1, msg: 'update error', data: pid});
                return;
            }

            res.json({code: 0, msg: 'ok', data: agentcount});
        });
    },


};