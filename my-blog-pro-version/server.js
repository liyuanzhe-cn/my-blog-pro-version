const express = require('express');
const server = express();
const globalConfig = require('./config');
const loader = require('./loader');
const fs = require('fs');
const passport = require('passport');
const userRouter = require('./router/loginRouter');

//get 类
server.get('/queryCommentCountByBlogId', loader.get('/queryCommentCountByBlogId'));
server.get('/queryCommentByBlogId', loader.get('/queryCommentByBlogId'));
server.get('/queryMusic', loader.get('/queryMusic'));
server.get('/queryCaptcha', loader.get('/queryCaptcha'));
server.get('/addComment', loader.get('/addComment'));
server.get('/queryBlogCount', loader.get('/queryBlogCount'));
server.get('/queryBlogById', loader.get('/queryBlogById'));
server.get('/getEveryDay', loader.get('/getEveryDay'));
server.get('/queryBlogByPage', loader.get('/queryBlogByPage'));
server.get('/queryAllBlog', loader.get('/queryAllBlog'));
server.get('/queryAllTags', loader.get("/queryAllTags"));
server.get('/queryRandomTags', loader.get('/queryRandomTags'));
server.get('/queryRecentComments', loader.get('/queryRecentComments'));
server.get('/queryHotBlog', loader.get('/queryHotBlog'));
server.get('/queryBlogByTag', loader.get('/queryBlogByTag'));
server.get("/queryBlogCountByTag", loader.get("/queryBlogCountByTag"))

//post 类
server.post('/editBlog', loader.get('/editBlog'));
server.post('/editEveryDay', loader.get('/editEveryDay'));


//登陆注册验证接口
server.use(passport.initialize());
require('./config/passport')(passport);
server.use('/api/user', userRouter);

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