var mysql = require('mysql');
var db = require('../configs/db');
var pool = mysql.createPool(db);

module.exports = {
    connPool (sql, val, cb) {
        pool.getConnection((err, conn) => {
            var q = conn.query(sql, val, (err, rows) => {

                if (err) {
                    console.log(err);
                }

                console.log(rows);
                if (rows) {
                    for(var i = 0; i < rows.length; i++)
                    {
                        console.log('%s',rows[i].a_pid);
                    }
                }

                cb(err, rows);

                conn.release();
            });
        });
    },

    // json格式
    writeJson(res, code = 200, msg = 'ok', data = null) {
        var obj = {code, msg, data};

        if (!data) {
            delete obj.data;
        }

        res.send(obj);
    },
};