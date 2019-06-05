var dbutil = require('./DButil');

function inserBlog(title, content, tags, views, ctime, utime, success) {

    var insertSQL = "insert into blog (`title`, `content`, `tags`, `views`, `ctime`, `utime`) value (?,?,?,?,?,?)";

    const params = [title, content, tags, views, ctime, utime];


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

function queryBlogByPage(page, pageSize, success) {
    console.log('数据库查找中')
    var selectSQL = `select * from blog order by id desc limit ?,?`;
    var params = [page * pageSize, pageSize];

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

function queryBlogCount(success) {
    console.log('获取总数')
    var selectSQL = `select count(1) from blog`;
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


function queryBlogById(id, success) {
    console.log('获取某一篇博客')
    var selectSQL = `select * from blog where id = ?;`;
    var params = [id];
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

module.exports = { inserBlog, queryBlogByPage, queryBlogCount, queryBlogById };