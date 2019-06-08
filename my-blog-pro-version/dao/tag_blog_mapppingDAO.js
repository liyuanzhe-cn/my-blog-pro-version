var dbutil = require('./DButil');

function insertTagsBlogMapping(tagId, blogId, ctime, utime, success) {
    var insertSQL = "insert into tags_blog_mapping (`tag_id`,`blog_id`,`ctime`,`utime`) value(?,?,?,?)";
    var params = [tagId, blogId, ctime, utime];
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

function queryBlogByTag(tag_id, page, pageSize, success) {
    // console.log('数据库查找中')
    var selectSQL = `select * from tags_blog_mapping where tag_id = ? order by ctime desc limit ? , ?`;
    var params = [tag_id, page * pageSize, pageSize];
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



module.exports = { insertTagsBlogMapping, queryBlogByTag };