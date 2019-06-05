var dbutil = require('./DButil');

function inserEveryDay(content, author, ctime, success) {
    var insertSQL = `insert into every_day (content,author,ctime) value(?,?,?)`;
    var params = [content, author, ctime];
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

function queryEveryDay(success) {
    console.log('数据库查找中')
    var selectSQL = `select * from every_day order by id desc limit 1`;
    var params = [];

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


module.exports = { inserEveryDay, queryEveryDay };