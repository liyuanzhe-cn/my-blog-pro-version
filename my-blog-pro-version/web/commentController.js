var path = new Map();
var { getNow } = require('../util/timeUtil');
const { writeResult, JSONtoString } = require('../util/responseUtil');
const queryString = require('query-string');
const url = require('url');
const commentDAO = require('../dao/commentDAO')
var { getNow } = require('../util/timeUtil');
const captcha = require('svg-captcha');


// 添加评论
function addComment(request, response) {
    var params = url.parse(request.url, true).query;
    const { bid, parent, parentName, userName, email, content } = params;
    commentDAO.addComment(
        bid,
        parent,
        parentName,
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

// 获取验证码
function queryCaptcha(request, response) {
    var img = captcha.create({
        fontSize: 50,
        width: 130,
        height: 40,
        size: 5
    });
    response.writeHead(200);
    response.write(writeResult('success', '验证码获取成功', img));
    response.end();
}

function queryCommentByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    const { bid } = params;
    commentDAO.queryCommentByBlogId(
        bid,
        function (result) {
            response.writeHead(200);
            response.write(writeResult('success', '发表成功', result));
            response.end();
        }
    )
}


function queryCommentCountByBlogId(request, response) {
    commentDAO.queryRecentComments(
        function (result) {
            response.writeHead(200);
            response.write(writeResult('success', '发表成功', result));
            response.end();
        }
    )
}

function queryRecentComments(request, response) {
    commentDAO.queryRecentComments(
        function (result) {
            response.writeHead(200);
            response.write(writeResult('success', '发表成功', result));
            response.end();
        }
    )
}
path.set('/queryRecentComments', queryRecentComments);
path.set('/queryCommentCountByBlogId', queryCommentCountByBlogId);
path.set('/queryCommentByBlogId', queryCommentByBlogId);
path.set('/queryCaptcha', queryCaptcha);
path.set('/addComment', addComment);
module.exports.path = path;