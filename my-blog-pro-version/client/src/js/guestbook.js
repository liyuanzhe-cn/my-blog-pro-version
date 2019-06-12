//发送评论 默认使用-1 作为本页面blog_id
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
                    var res = await fetch(`/addComment?bid=-2&parentName=${reply_name.value}&parent=${reply.value}&userName=${nickname.value}&email=${email.value}&content=${replycontent.value}`)
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
        total: 0,
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
                var res = await fetch(`/queryCommentByBlogId?bid=-2`);
                var json = await res.json();
                // 发表评论和回复评论的处理
                var data = json.data;
                var arrMain = [];
                var arrReply = [];
                data.forEach((ele, index) => {
                    var time = new Date(ele.ctime * 1000);
                    ele.ctime = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日 ' + time.getHours() + ':' + time.getMinutes();
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
