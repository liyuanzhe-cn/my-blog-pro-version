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
        // (async () => {
        //     try {
        //         var res = await fetch('/api/everyday');
        //         var data = await res.json();
        //         console.log(data);
        //     } catch (e) {
        //         console.log('每日一句获取失败;')
        //     }
        // })();
    }
})

// 文章部分
new Vue({
    el: '#article-list',
    data: {
        articleList: [
            {
                content: '占位置：文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章!',
                author: '李沅哲',
                title: '标题1',
                tags: "Vue,React",
                views: 500,
                date: '2019-05-20',
                id: "1",
                link: ""
            },
            {
                content: '占位置：文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章!',
                author: '李沅哲',
                title: '标题2',
                tags: "Vue,React",
                views: 500,
                date: '2019-05-20',
                id: "1",
                link: ""
            },
            {
                content: '占位置：文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章!',
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
    computed: {

    },
    created() {
        // 掉用fetch请求后端数据
        // (async () => {
        //     try {
        //         var res = await fetch('/api/everyday');
        //         var data = await res.json();
        //         console.log(data);
        //     } catch (e) {
        //         console.log('每日一句获取失败;')
        //     }
        // })();
    }
})

