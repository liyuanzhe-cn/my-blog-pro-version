
const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../config');
const userDAO = require('../dao/userDao');
console.log(secretOrKey);
const passport = require('passport');
const queryString = require('query-string');
const { getNow } = require('../util/timeUtil');
const { writeResult } = require('../util/responseUtil');

//注册接口
userRouter.post('/register', function register(request, response) {
    request.on('data', function (data) {

        var json = queryString.parse(data.toString());

        const { username, pass } = json;
        bcrypt.genSalt(10, (err, salt) => {
            //salt 是一串加密字符串 会成为密码前面的一段
            bcrypt.hash(pass, salt, function (err, hash) {
                if (err) throw err;
                //没有问题给密码赋值
                hashedPass = hash;
                userDAO.finduser(username, function (result) {
                    if (result.length == 0) {
                        console.log(result);
                        userDAO.insertuser(username, hashedPass, getNow(), function (result) {
                            response.writeHead(200);
                            response.write(writeResult('success', '注册成功', result));
                            response.end();
                        })
                    } else {
                        response.writeHead(400);
                        response.write(writeResult('fail', '用户已经被注册'));
                        response.end();
                    }
                })
            });
        });
    });
})

// 登录接口
userRouter.post('/login', function login(request, response) {
    request.on('data', function (data) {
        var json = queryString.parse(data.toString());
        const { username, pass } = json;
        console.log(data.toString(), json, username, pass);
        userDAO.finduser(username, function (result) {
            console.log(result);
            if (result.length == 0) {
                response.writeHead(400);
                response.write(writeResult('fail', '用户不存在'));
                response.end();
            } else {

                bcrypt.compare(pass, result[0].pass)
                    .then((passIsMatch) => {
                        if (passIsMatch) {
                            const rules = { username, id: result.id };
                            jwt.sign(rules, secretOrKey, { expiresIn: 3600 * 24 }, (err, token) => {
                                if (err) throw err;
                                // 加密成功，给前端返回成功的json
                                // res.json({
                                //     success: true,
                                //     token: "Bearer " + token
                                // })
                                console.log('密码', pass, result[0].pass)
                                response.writeHead(200);
                                response.write(JSON.stringify({ token: "Bearer " + token }));
                                // response.write('12345678');
                                response.end();
                            });
                        } else {
                            response.writeHead(400);
                            response.write(writeResult('fail', '用户不存在'));
                            response.end();
                        }
                    })
            }
        })
    });
})

userRouter.post('/test', passport.authenticate("jwt", { session: false }), function (request, response) {
    response.writeHead(200);
    response.write('{"success":"token有效"}');
    response.end();
})

module.exports = userRouter;
