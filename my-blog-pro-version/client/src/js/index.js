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
        page: 1,
        pageSize: 5,
        count: 50,
        pageNumList: [],
        articleList: [
            {
                content: '占位置：文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章!',
                author: '李沅哲',
                title: '标题1',
                tags: "Vue,React",
                views: 500,
                date: '2019-05-20',
                id: "1",
                link: ""
            },
            {
                content: '占位置：文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章!',
                author: '李沅哲',
                title: '标题2',
                tags: "Vue,React",
                views: 500,
                date: '2019-05-20',
                id: "1",
                link: ""
            },
            {
                content: '占位置：文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章!',
                author: '李沅哲',
                title: '标题3',
                tags: "Vue,React",
                views: 500,
                date: '2019-05-20',
                id: "1",
                link: ""
            }
        ]
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
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({ text: "<<", page: 1 });

            if (nowPage > 2) {
                result.push({ text: nowPage - 2, page: nowPage - 2 });
            }
            if (nowPage > 1) {
                result.push({ text: nowPage - 1, page: nowPage - 1 });
            }

            result.push({ text: nowPage, page: nowPage });

            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({ text: nowPage + 1, page: nowPage + 1 });
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({ text: nowPage + 2, page: nowPage + 2 });
            }

            result.push({ text: ">>", page: Math.ceil((totalCount + pageSize - 1) / pageSize) });
            this.pageNumList = result;
            console.log(result);
            return result
        },
        getCount() {
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
        },
        getPage() {
            return function (page, pageSize) {
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
                        console.log('每日一句获取失败;')
                    }
                })();

            }
        }
    },
    created() {
        this.getPage(this.page, this.pageSize);
        this.getCount;
        // 掉用fetch请求后端数据
    },
    updated() {
        // this.getPage(this.page, this.pageSize);
    }
})

