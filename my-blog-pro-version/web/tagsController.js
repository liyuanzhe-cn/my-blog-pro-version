var path = new Map();
var { getNow } = require('../util/timeUtil');
const { writeResult, JSONtoString } = require('../util/responseUtil');
const queryString = require('query-string');
const url = require('url');
const tagDAO = require('../dao/tagsDAO')
var { getNow } = require('../util/timeUtil');
const captcha = require('svg-captcha');




function queryRandomTags(request, response) {
    tagDAO.queryRandomTags(
        function (result) {
            response.writeHead(200);
            response.write(writeResult('success', '发表成功', result));
            response.end();
        }
    )
}

function queryAllTags(request, response) {
    tagDAO.queryAllTags(
        function (result) {
            response.writeHead(200);
            response.write(writeResult('success', '发表成功', result));
            response.end();
        }
    )
}


path.set('/queryAllTags', queryAllTags);
path.set('/queryRandomTags', queryRandomTags);
module.exports.path = path;