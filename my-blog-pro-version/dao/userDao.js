var dbutil = require('./DButil');

function insertuser(username, pass, ctime, success) {
    var insertSQL = `insert into user (username, pass,ctime ) value (?,?,?)`;
    var params = [username, pass, ctime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSQL, params, (err, result) => {
        if (!err) {
            success(result);
        } else {
            console.log(err);
        }
    });
    connection.end();

}

function finduser(username, success) {
    // console.log('数据库查找中')
    var selectSQL = `select * from user where username = ?`;
    var params = [username];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(selectSQL, params, (err, result) => {
        if (!err) {
            success(result);
        } else {
            console.log(err);
        }
    });
    connection.end();

}


module.exports = { insertuser, finduser };