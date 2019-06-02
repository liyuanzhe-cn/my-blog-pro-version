
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
