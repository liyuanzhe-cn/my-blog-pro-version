const express = require('express');
const server = express();
const globalConfig = require('./config');
const loader = require('./loader');
const fs = require('fs');

//get 类
server.get('/queryMusic', loader.get('/queryMusic'));
server.get('/queryCaptcha', loader.get('/queryCaptcha'));
server.get('/addComment', loader.get('/addComment'));
server.get('/queryBlogCount', loader.get('/queryBlogCount'));
server.get('/queryBlogById', loader.get('/queryBlogById'));
server.get('/getEveryDay', loader.get('/getEveryDay'));
server.get('/queryBlogByPage', loader.get('/queryBlogByPage'));

//post 类
server.post('/editBlog', loader.get('/editBlog'));
server.post('/editEveryDay', loader.get('/editEveryDay'));
server.listen(globalConfig.port);
// 打印接口
console.log(globalConfig);

server.use(express.static('./' + globalConfig.page_path));

// 404
server.get('*', function (req, res) {
    fs.readFile('./client/src/404.html', {}, function (err, data) {
        res.writeHead(404);
        res.write(data);
        res.end();
    })
});