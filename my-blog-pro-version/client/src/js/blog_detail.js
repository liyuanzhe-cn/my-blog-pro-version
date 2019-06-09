function queryToJson(query) {
    var searchArr = query.split('=');
    var searchJson = {};
    for (var i = 0; i < searchArr.length; i++) {
        searchJson[searchArr[i]] = searchArr[++i];
        i++;
    }
    return searchJson;
}

var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.substr(1) : '';
// 获取当前网页的search信息
var searchJson = queryToJson(searchUrlParams);
//获取某个文章
new Vue({
    el: "#blog-detail",
    data: {
        title: "标题",
        tags: "Vue",
        views: 20,
        ctime: 120002020,
        content: "<h1>文章内容正在赶来。。。</h1>",
        id: 0
    },
    created() {

        // 没有blogID
        if (!searchJson.bid) {
            this.notFoundBlog();
        }

        var bid = searchJson.bid ? searchJson.bid : -1;

        console.log(bid);

        (async () => {
            try {
                var res = await fetch(`/queryBlogById?bid=` + bid);
                var json = await res.json();
                console.log(json.data);
                if (json.data.length == 0) {
                    this.notFoundBlog();
                } else {
                    // content: "啊啊啊=啊啊啊啊"
                    // ctime: 1559582072
                    // id: 31
                    // tags: "vue,react,测试"
                    // title: "测试"
                    // utime: 1559582072
                    // views: 0
                    console.log(this.data)
                    this.content = json.data[0].content;
                    this.ctime = json.data[0].ctime;
                    this.id = json.data[0].id;
                    this.tags = json.data[0].tags;
                    this.title = json.data[0].title;
                    this.views = json.data[0].views;
                }
            } catch (e) {
                console.log(e);
            }
        })();
    },
    methods: {
        notFoundBlog() {
            this.content = `<h2 style="color: red;">文章不存在或者已被删除</h2>`;
            return;
        }
    }
})
//发送评论
var sendComments = new Vue({
    el: "#send-comments",
    data: {
        comment_id: -1,
        comment_user_name: 0,
        imgText: '',
        imgCode: '',
        inputCode: '',
        canSubmit: false,
        update: 0,
        floor: '',
    },
    methods: {
        input() {
            this.inputCode.toLowerCase() == this.imgText.toLowerCase() ? this.canSubmit = true : this.canSubmit = false;
        },
        switchToComment() {
            this.comment_id = -1;
            this.comment_user_name = 0;
            this.floor = '';
        },
        sendComment() {
            var { reply, reply_name, nickname, email, replycontent } = this.$refs;
            console.log(reply, reply_name, nickname, email, replycontent);
            (async () => {
                try {
                    var res = await fetch(`/addComment?bid=${searchJson.bid}&parentName=${reply_name.value}&parent=${reply.value}&userName=${nickname.value}&email=${email.value}&content=${replycontent.value}`)
                    var data = res.json().data;
                    console.log(data);
                    var emptyArr = [reply, nickname, reply_name, email, replycontent];
                    emptyArr.forEach(ele => {
                        ele.value = '';
                    })
                } catch (e) {
                    console.log(e)
                }
            })();
        },
        changeCaptcha() {
            (async () => {
                try {
                    var res = await fetch(`/queryCaptcha`)
                    var data = await res.json();
                    var imgCode = data.data.data;
                    var imgText = data.data.text;
                    this.imgCode = imgCode;
                    this.imgText = imgText;
                    console.log(imgText)
                } catch (e) {
                    console.log(e)
                }
            })();
        }
    },
    created() {
        this.changeCaptcha()
    }
})

// 获取评论列表
new Vue({
    el: "#comments-list",
    data: {
        total: 100,
        comments: [
        ]
    },
    methods: {
        reply(comment_id, user_name, floor) {
            sendComments.comment_id = comment_id;
            sendComments.comment_user_name = user_name;
            sendComments.floor = floor
        }
    },
    computed() {

    },
    created() {
        (async () => {
            try {
                var res = await fetch(`/queryCommentByBlogId?bid=` + searchJson.bid);
                var json = await res.json();
                // 发表评论和回复评论的处理
                var data = json.data;
                var arrMain = [];
                var arrReply = [];
                data.forEach((ele, index) => {
                    var time = new Date(ele.ctime * 1000);
                    ele.ctime = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDay() + '日 ' + time.getHours() + ':' + time.getMinutes();
                    if (ele.parent == -1) {
                        ele.children = [];
                        arrMain.push(ele);
                    } else {
                        arrReply.push(ele);
                    }
                });
                arrReply.forEach((eleReply, indexReply) => {
                    arrMain.forEach((eleMain, indexMain) => {
                        if (eleMain.id == eleReply.parent) {
                            eleMain.children.push(eleReply);
                        }
                    })
                })
                this.total = data.length;
                console.log(arrMain);
                this.comments = arrMain;
            } catch (e) {
                console.log(e);
            }
        })();

    }
})


// var data = [
//     { "id": 1, "blog_id": 41, "user_name": "a", "parent": -1, "comment": "c", "ctime": 1559726868, "utime": 1559726743, "email": "b", "parent_name": "0" },
//     { "id": 2, "blog_id": 41, "user_name": "lyz", "parent": -1, "comment": "lyz", "ctime": 1559731968, "utime": 1559731968, "email": "lyz@lyz.com", "parent_name": "0" },
//     { "id": 3, "blog_id": 41, "user_name": "鏉庢矃鍝�", "parent": -1, "comment": "FGHJKL;", "ctime": 1559760475, "utime": 1559760475, "email": "DFGHJK", "parent_name": "0" },
//     { "id": 4, "blog_id": 41, "user_name": "鏉庢矃鍝�", "parent": 2, "comment": "FGHJKL;", "ctime": 1559760514, "utime": 1559760514, "email": "DFGHJK", "parent_name": "lyz" }
// ];
// var arrMain = [];
// var arrReply = [];
// data.forEach((ele, index) => {
//     if (ele.parent == -1) {
//         ele.children = [];
//         arrMain.push(ele);
//     } else {
//         arrReply.push(ele);
//     }
// });
// arrReply.forEach((eleReply, indexReply) => {
//     arrMain.forEach((eleMain, indexMain) => {
//         if (eleMain.id == eleReply.parent) {
//             eleMain.children.push(eleReply);
//         }
//     })
// })