var path = new Map();
var { inserEveryDay, queryEveryDay } = require('../dao/everydayDAO');
var { getNow } = require('../util/timeUtil');
const { writeResult, JSONtoString } = require('../util/responseUtil');
const queryString = require('query-string');

function editEveryDay(request, response) {
    request.on('data', function (data) {
        var { content, author } = queryString.parse(data.toString());
        console.log(content, author, getNow())
        if (content && author) {
            inserEveryDay(content, author, getNow(), function (result) {
                response.writeHead(200);
                response.write(writeResult('success', '添加成功', null));
                response.end()
            })
        } else {
            response.writeHead(400);
            response.write(writeResult('fail', '数据不合法', null));
            response.end()
        }
    });
}


function getEveryDay(request, response) {
    queryEveryDay(function (result) {
        response.writeHead(200);
        response.write(JSONtoString(result));
        response.end()
    })
}

path.set('/editEveryDay', editEveryDay);
path.set('/getEveryDay', getEveryDay);
module.exports.path = path;