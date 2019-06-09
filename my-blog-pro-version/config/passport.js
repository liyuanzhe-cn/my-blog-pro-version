const JwtStrategy = require('passport-jwt').Strategy;
//
const ExtractJwt = require('passport-jwt').ExtractJwt;
//引入数据库操作接口
const userDAO = require('../dao/userDao');

// 环境变量中的key
const { secretOrKey } = require('../config');

var opts = {}
// 定义从请求头的Authrization获取token数据
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// 存入环境变量的混淆密码
opts.secretOrKey = secretOrKey;
console.log(opts)
module.exports = passport => {
    var jwtConfig = new JwtStrategy(opts, (jwt_payload, done) => {
        // jwt_payload 解析好的 token字符串，
        // done 验证用的函数 function verified (){} 
        console.log(jwt_payload);
        // userDAO.finduser(jwt_payload.username, function (result) {
        //     if (result.length == 1) {
        //         return done(null, user)
        //     }
        //     return done(null, user)
        // })
        return done(null, jwt_payload);
    })
    passport.use(jwtConfig);
}

