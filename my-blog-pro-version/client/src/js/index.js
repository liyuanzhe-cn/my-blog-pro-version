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
                        var res = await fetch("/queryBlogCountByTag");
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
                                ele.content = ele.content.replace(/<img[\d\D]>/g, '').substr(0, 2000);
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
                console.log(this.count)

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

