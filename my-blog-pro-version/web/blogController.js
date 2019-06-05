var path = new Map();
var blogDAO = require('../dao/blogDAO');
var { getNow } = require('../util/timeUtil');
const { writeResult, JSONtoString } = require('../util/responseUtil');
const queryString = require('query-string');
const url = require('url');
const tagsDAO = require('../dao/tagsDAO');
const tagsBlogMappingDao = require('../dao/tag_blog_mapppingDAO');


function queryBlogByPage(request, response) {
    var params = url.parse(request.url, true).query;
    blogDAO.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        response.writeHead(200);
        response.write(writeResult('success', '查询成功', result));
        response.end();
    })
}


// 编辑博客
function editBlog(request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params)
    request.on('data', function (data) {
        var content = queryString.parse(data.toString()).content;
        console.log(content && params.title && params.tags)
        blogDAO.inserBlog(
            params.title,
            content,
            params.tags,
            0,
            getNow(),
            getNow()
            , function (result) {
                response.writeHead(200);
                response.write(writeResult('success', '添加成功', null));
                response.end();

                // 设置存储标签 和 标签博客的映射
                var blogId = result.insertId;
                var tagsList = params.tags.split(',');
                for (var i = 0; i < tagsList.length; i++) {
                    if (tagsList[i] == "") {
                        continue;
                    }
                    // 查询 tags是否存在，不存在在tags表中存入一个新的tag
                    queryTags(tagsList[i], blogId);
                }
            })

    });
}


function queryTags(tags, blogId) {
    tagsDAO.getTags(tags, function (result) {
        if (result == null || result.length == 0) {
            // 当标签不存在的时候
            insertTags(tags, blogId)
        } else {
            // 当标签存在的时候
            console.log(result[0].id, blogId)
            insertTagsBlogMapping(result[0].id, blogId);
        }
    })
}


function insertTags(tags, blogId) {
    tagsDAO.insertTags(tags, getNow(), getNow(), function (result) {
        insertTagsBlogMapping(result.insertId, blogId);
    })
}

function insertTagsBlogMapping(tagId, blogId) {
    tagsBlogMappingDao.insertTagsBlogMapping(tagId, blogId, getNow(), getNow(), function (result) {

    })
}


function queryBlogCount(request, response) {
    blogDAO.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(writeResult('success', '查询成功', result));
        response.end();
    })
}


function queryBlogById(request, response) {
    var blogId = url.parse(request.url, true).query;
    blogDAO.queryBlogById(blogId.bid, function (result) {
        response.writeHead(200);
        response.write(writeResult('success', '查询成功', result));
        response.end();
    })
}

path.set('/queryBlogById', queryBlogById);
path.set('/queryBlogCount', queryBlogCount);
path.set('/editBlog', editBlog);
path.set('/queryBlogByPage', queryBlogByPage);
module.exports.path = path;