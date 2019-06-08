// 照片墙
new Vue({
    el: '.imgWall',
    data: {
        lock: true,
        changeType: 1,
    },
    mounted() {

    },
    methods: {
        photo(e) {
            var rate1 = Math.ceil(Math.random() * 3);
            var rate2 = Math.ceil(Math.random() * 3);
            this.changeType = (rate1 - 1) * 3 + rate2;
            console.log(this.changeType);
            // console.log(this.$refs.photolist)
            if (this.lock) {
                this.lock = false;
                var imgs = this.$refs.photolist.children;
                for (let i = 0; i < imgs.length; i++) {
                    setTimeout(() => {
                        setTimeout(() => {
                            //返回的时候的起始位置
                            this.lock = true;
                            imgs[i].style.transition = "all 0s"
                            imgs[i].style.opacity = 0;
                            //多重效果 
                            if (rate1 === 1) {
                                // 原地百叶窗
                                imgs[i].style.transform = "perspective(800px) translateZ(0px) rotateX(0deg) rotateY(-1800deg) rotateZ(0deg) translateY(0px) translateX(0px)";
                            } else if (rate1 === 2) {
                                // 由近到远随机位置返回效果
                                imgs[i].style.transform = `perspective(800px) translateZ(${Math.random() * 400 + 200}px)  rotateX(${(180)}deg) rotateY( ${(180)}deg) rotateZ(${(Math.random() * 180)}deg) translateY(${Math.random() * 400 - 200}px) translateX(${Math.random() * 400 - 200}px)`;
                            } else if (rate1 === 3) {
                                // 左平移卷轴效果
                                imgs[i].style.transform = "perspective(1000px) translateZ(0px) rotateX(-720deg) rotateY(0deg) rotateZ(0deg) translateY(0px) translateX(1000px)";
                            }
                            setTimeout(() => {
                                //返回的时候的终点
                                this.lock = true;
                                imgs[i].style.transformOrigin = "0 0";
                                imgs[i].style.opacity = 1;

                                if (rate2 == 1) {
                                    var num = i % 10;
                                } else if (rate2 == 2) {
                                    var num = Math.ceil(i / 10) * 2;
                                } else {
                                    num = (Math.random() * 10) | 0;
                                }

                                imgs[i].style.transition = "all " + ((num * 500) + 500) + "ms";
                                imgs[i].style.transform = "perspective(800px) translateZ(0px)  rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(0px) translateX(0px)";
                            }, 2000)
                        }, 1500)
                        imgs[i].style.opacity = 0;
                        imgs[i].style.transform = `perspective(1000px) translateZ(${Math.random() * 400 + 200}px)  rotateX(${(180)}deg) rotateY( ${(180)}deg) rotateZ(${(Math.random() * 180)}deg) translateY(${Math.random() * 400 - 200}px) translateX(${Math.random() * 400 - 200}px) `
                    }, Math.random() * 1000);
                }
            }
        },

    }

});

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
                    var res = await fetch(`/addComment?bid=-1&parentName=${reply_name.value}&parent=${reply.value}&userName=${nickname.value}&email=${email.value}&content=${replycontent.value}`)
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
                var res = await fetch(`/queryCommentByBlogId?bid=-1`);
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


