var path = new Map();
var blogDAO = require('../dao/blogDAO');
var { getNow } = require('../util/timeUtil');
const { writeResult } = require('../util/responseUtil');
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
        blogDAO.addViews(blogId.bid, function (result) {

        });
    })
}

function queryAllBlog(request, response) {
    blogDAO.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(writeResult('success', '查询成功', result));
        response.end();
    })
}

function queryHotBlog(request, response) {
    var params = url.parse(request.url, true).query;
    blogDAO.queryHotBlog(+params.size, function (result) {
        response.writeHead(200);
        response.write(writeResult('success', '查询成功', result));
        response.end();
    })
}





function queryBlogByTag(request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params)
    tagsBlogMappingDao.queryBlogByTag(parseInt(params.tagId), parseInt(params.page), parseInt(params.pageSize), function (result) {
        if (result == null || result.length == 0) {
            response.writeHead(200);
            // console.log(result);
            response.write(writeResult('success', '查询成功', result));
            response.end();
        } else {
            // 返回给前端的博客列表
            var blogList = [];
            // 异步执行队列
            promiseList = [];
            // 逐次加入异步执行队列
            result.forEach(ele => {
                // console.log(ele.blog_id);
                // 异步处理
                promiseList.push(
                    new Promise((resolve, reject) => {
                        blogDAO.queryBlogById(ele.blog_id, function (searchByIdResult) {
                            // console.log(searchByIdResult)
                            blogList.push(searchByIdResult[0]);
                            resolve();
                        })
                    })
                )
            });
            // 当全部promise都执行成功后返回给前端
            Promise.all(promiseList).then(() => {
                response.writeHead(200);
                // console.log(blogList);
                response.write(writeResult('success', '查询成功', blogList));
                response.end();
            })


        }

    })
}

function queryBlogCountByTag(request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params);
    blogDAO.queryBlogCountByTag(parseInt(params.tag), function (result) {
        response.writeHead(200);
        response.write(writeResult('success', '查询成功', result));
        response.end();
    })
}



path.set('/queryBlogByTag', queryBlogByTag);
path.set('/queryBlogCountByTag', queryBlogCountByTag);


path.set('/queryHotBlog', queryHotBlog);
path.set('/queryAllBlog', queryAllBlog);
path.set('/queryBlogById', queryBlogById);
path.set('/queryBlogCount', queryBlogCount);
path.set('/editBlog', editBlog);
path.set('/queryBlogByPage', queryBlogByPage);


module.exports.path = path;