var path = new Map();
var { getNow } = require('../util/timeUtil');
const { writeResult, JSONtoString } = require('../util/responseUtil');
const queryString = require('query-string');
const url = require('url');
const commentDAO = require('../dao/commentDAO')
var { getNow } = require('../util/timeUtil');
const captcha = require('svg-captcha');


// 编辑博客
function addComment(request, response) {
    var params = url.parse(request.url, true).query;
    const { bid, parent, userName, email, content } = params;
    commentDAO.addComment(
        bid,
        parent,
        userName,
        email,
        content,
        getNow(),
        getNow(),
        function (result) {
            response.writeHead(200);
            response.write(writeResult('success', '发表成功', result));
            response.end();
        }
    )
}

function queryCaptcha(request, response) {
    var img = captcha.create({
        fontSize: 50,
        width: 100,
        height: 30
    });
    response.writeHead(200);
    response.write(writeResult('success', '验证码获取成功', img));
    response.end();

}




path.set('/queryCaptcha', queryCaptcha);
path.set('/addComment', addComment);
module.exports.path = path;