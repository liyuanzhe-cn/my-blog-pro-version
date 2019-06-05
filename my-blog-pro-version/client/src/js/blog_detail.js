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
        content: "<h1>文章内容正在赶来。。。</h1>"
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
                    // this.data.id = json.data[0].id;
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
new Vue({
    el: ".send-comments",
    data: {
        imgText: '',
        imgCode: '',
        inputCode: '',
        canSubmit: false
    },
    methods: {
        input() {
            this.inputCode.toLowerCase() == this.imgText.toLowerCase() ? this.canSubmit = true : this.canSubmit = false;
        },
        sendComment() {
            var { reply, nickname, email, replycontent } = this.$refs;
            console.log(reply, nickname, email, replycontent);
            (async () => {
                try {
                    var res = await fetch(`/addComment?bid=${searchJson.bid}&parent=${reply.value}&userName=${nickname.value}&email=${email.value}&content=${replycontent.value}`)
                    var data = res.json().data;
                    console.log(data)
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
            { id: '1', name: "panda", ctime: "123123123", comments: "aaaaaaaaa" },
            { id: '2', name: "panda", ctime: "123123123", comments: "aaaaaaaaa" },
            { id: '3', name: "panda", ctime: "123123123", comments: "aaaaaaaaa" },
        ]
    },
    computed() {

    },
    created() {

    }
})

