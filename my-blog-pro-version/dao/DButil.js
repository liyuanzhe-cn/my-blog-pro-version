var mysql = require('mysql');
function createConnection() {
    var connection = mysql.createConnection({
        host: "127.0.0.1",
        port: "3306",
        user: 'root',
        password: 'root',
        database: "my_blog_v2"
    });
    return connection;
}


module.exports.createConnection = createConnection;