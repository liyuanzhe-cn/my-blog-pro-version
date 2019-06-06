var dbutil = require('./DButil');

// 添加评论
function addComment(blogId, parent, parentName, userName, email, comment, ctime, utime, success) {
    console.log(blogId, parent, userName, email, ctime, utime)
    var insertSQL = "insert into comments (`blog_id`,`parent`,`parent_name`,`user_name`,`email`,`comment`, `ctime`, `utime`) value (?,?,?,?,?,?,?,?)";

    const params = [blogId, parent, parentName, userName, email, comment, ctime, utime];

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



function queryCommentCountByBlogId(blog_id, success) {
    var selectSQL = `select count(1) from comments where blog_id = ?`;
    var params = [blog_id];
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


function queryCommentByBlogId(blog_id, success) {
    var selectSQL = `select * from comments where blog_id = ?;`;
    var params = [blog_id];
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

module.exports = { addComment, queryCommentByBlogId, queryCommentCountByBlogId };