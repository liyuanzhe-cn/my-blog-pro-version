var dbutil = require('./DButil');

function insertTags(tags, ctime, utime, success) {
    var insertSQL = "insert into tags (`tags`,`ctime`,`utime`) value(?,?,?)";
    var params = [tags, ctime, utime];
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

function getTags(tags, success) {
    var insertSQL = "select * from tags where tags = ?";
    var params = [tags];
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

function queryAllTags(success) {
    var insertSQL = "select * from tags";
    var params = [];
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

function queryRandomTags(success) {
    var insertSQL = `select * from tags where id % 2 = ${Math.ceil(Math.random() * 2)}`;
    var params = [];
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


module.exports = { insertTags, getTags, queryAllTags, queryRandomTags };