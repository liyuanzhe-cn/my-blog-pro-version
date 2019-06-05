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


module.exports = { insertTagsBlogMapping };