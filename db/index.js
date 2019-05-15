const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'dguiwgu1996',
    database: 'ems'
});

exports.query = function (sql,params=[]) {
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection) {
            if(err) {
                throw err;
            }else {
                connection.query(sql,params,function(err,results) {
                    resolve({err, results});
                    connection.release();
                })
            }
        })
    })
}

exports.error = function (msg) {
    return {
        error: true,
        msg
    }
}

exports.success = function (data) {
    return {
        error: false,
        data
    }
}
