// 获取页面的search数据
function queryToJson(query) {
    var search = query.replace(/[=|&]/g, ',');
    console.log(search);
    var searchArr = search.split(',')
    var searchJson = {};
    for (var i = 0; i < searchArr.length; i++) {
        searchJson[searchArr[i]] = searchArr[++i];
    }
    return searchJson;
}

var searchUrlParams = location.search.indexOf('?') > -1 ? location.search.substr(1) : '';
// 获取当前网页的search信息
var searchJson = queryToJson(searchUrlParams);

// 每日一句
new Vue({
    el: '#every-day',
    data: {
        content: '失败是成功之母!',
        author: '李沅哲'
    },
    computed: {
        getContent: function () {
            return this.content;
        },
        getAuthor: function () {
            return this.author;
        }
    },
    created() {
        // 掉用fetch请求后端数据
        (async () => {
            try {
                var res = await fetch('/getEveryDay');
                var data = await res.json();
                // console.log(data);
                this.content = data[0].content;
                this.author = data[0].author;
            } catch (e) {
                console.log('每日一句获取失败;')
            }
        })();
    }
})

// 文章部分
new Vue({
    el: '#article-list',
    data: {
        search: "",
        page: 1,
        pageSize: 5,
        count: 0, // 总数
        pageNumList: [],
        articleList: [],
    },
    methods: {
        jumpTo(page) {
            console.log(page)
            this.page = page
            this.generatePageTool;
            this.getPage(this.page, this.pageSize);
        },
    },
    computed: {
        generatePageTool: function () {
            // 页码设置
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            // 移动到首页
            result.push({ text: "<<", page: 1 });
            if (nowPage > 2) {
                result.push({ text: nowPage - 2, page: nowPage - 2 });
            }
            if (nowPage > 1) {
                result.push({ text: nowPage - 1, page: nowPage - 1 });
            }
            result.push({ text: nowPage, page: nowPage });
            if (nowPage + 1 <= Math.ceil((totalCount) / pageSize)) {
                result.push({ text: nowPage + 1, page: nowPage + 1 });
            }
            if (nowPage + 2 <= Math.ceil((totalCount) / pageSize)) {
                result.push({ text: nowPage + 2, page: nowPage + 2 });
            }
            // 最后一页
            result.push({ text: ">>", page: Math.ceil((totalCount) / pageSize) });
            this.pageNumList = result;
            console.log(result);
            return result
        },
        getCount() {
            if (searchJson.tagId) {
                (async () => {
                    try {
                        var res = await fetch("/queryBlogCountByTag?tag=" + searchJson.tagId);
                        var data = await res.json();
                        console.log(data.data[0]['count(1)']);
                        this.count = data.data[0]['count(1)'];
                        this.generatePageTool;

                    } catch (e) {
                        console.log('博客总数获取储出现失败;');
                    }
                })();
            } else {
                // 获取博客总量
                (async () => {
                    try {
                        var res = await fetch("/queryBlogCount");
                        var data = await res.json();
                        console.log(data.data[0]['count(1)']);
                        this.count = data.data[0]['count(1)'];
                        this.generatePageTool;

                    } catch (e) {
                        console.log('博客总数获取储出现失败;');
                    }
                })();
            }
        },
        getPage() {
            return function (page, pageSize) {

                if (searchJson.tagId) {
                    // 指定tag的时候
                    (async () => {
                        try {
                            var res = await fetch("/queryBlogByTag?tagId=" + searchJson.tagId + "&page=" + (page - 1) + "&pageSize=" + pageSize);
                            var data = await res.json();
                            console.log(data);
                            data.data.forEach((ele, index) => {
                                var time = new Date(ele.ctime * 1000);
                                ele.ctime = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDay() + '日';
                                ele.content = ele.content.replace(/<img[\d\D]>/g, '').substr(0, 1000);
                                ele.link = '/blog_detail.html?bid=' + ele.id
                            })
                            this.articleList = data.data;
                        } catch (e) {
                            console.log('文章获取失败;')
                        }
                    })();
                } else {
                    // 不指定tag的时候
                    console.log('没有tag');
                    (async () => {
                        try {
                            var res = await fetch("/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize);
                            var data = await res.json();
                            console.log(data);
                            data.data.forEach((ele, index) => {
                                var time = new Date(ele.ctime * 1000);
                                ele.ctime = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDay() + '日';
                                ele.content = ele.content.replace(/<img[\d\D]>/g, '').substr(0, 2000);
                                ele.link = '/blog_detail.html?bid=' + ele.id
                            })
                            this.articleList = data.data;
                        } catch (e) {
                            console.log('文章获取失败;')
                        }
                    })();
                }
                console.log(this.count);
            }
        }
    },
    created() {
        this.getPage(this.page, this.pageSize);
        this.getCount;
        console.log(searchJson)
        if (searchJson.tag) {
            console.log(searchJson.tag)
            this.search = searchJson.tag
        }
        // 掉用fetch请求后端数据
    },
    updated() {
        // this.getPage(this.page, this.pageSize);
    }
})

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