/**随机标签云 */
new Vue({
    el: '#random-tags',
    data: {
        tags: ["数组", "面向对象", "NODEJS", "REACT", "VUE", "ANGULAR", "TYPESCRIPT"]
    },
    computed: {
        randomColor: () => {
            return function () {
                var red = Math.random() * 200;
                var green = Math.random() * 200;
                var blue = Math.random() * 200;
                return "rgb(" + red + "," + green + "," + blue + ")";
            }
        },
        randomSize: () => {
            return function () {
                var fSize = Math.random() * 18 + 12 + 'px';
                return fSize;
            }
        }
    },
    methods: {

    }
})

/**音乐播放器 */
new Vue({
    el: '#music-player',
    data: {
        currentMusic: 1,
        audio: new Audio(),
        currentTime: 0,
        percentage: 0,
        timer: null,
        playing: false,
        deg: 0,
        musicList: [
            {
                "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557147265654&di=0d028315d14069f72113a0a5bdebff0e&imgtype=0&src=http%3A%2F%2Fp1.music.126.net%2FbZa1R51K75wmRsrMD5F8dA%3D%3D%2F109951163094616046.jpg",
                "audio": "http://se.sycdn.kuwo.cn/04d8ba6f7e092aaeb80180ce62706e1a/5cf3f510/resource/a3/24/88/2280016677.aac",
                "song": "Melody1",
                "album": "Melody",
                "singer": "Cadmium",
                "duration": 221,
                "isLike": false
            },
            {
                "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557147106191&di=beda36e75c0602746a03b24635bb3b50&imgtype=0&src=http%3A%2F%2Fimg2.soyoung.com%2Ftieba%2Fweb%2F20190114%2F3%2Fd44d0ec8fe54ed589affa5f8fbf79c3c_570.jpg",
                "audio": "http://se.sycdn.kuwo.cn/04d8ba6f7e092aaeb80180ce62706e1a/5cf3f510/resource/a3/24/88/2280016677.aac",
                "song": "Melody",
                "album": "Melody2",
                "singer": "Cadmium",
                "duration": 221,
                "isLike": false
            },
            {
                "image": "https://images.genius.com/4bd10dbc6bb093e27c984f863703dd6e.640x640x1.jpg",
                "audio": "http://se.sycdn.kuwo.cn/04d8ba6f7e092aaeb80180ce62706e1a/5cf3f510/resource/a3/24/88/2280016677.aac",
                "song": "Melody3",
                "album": "Melody",
                "singer": "Cadmium",
                "duration": 221,
                "isLike": false
            },
            {
                "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557147487355&di=153507d1842c7d6119ae9e5b846c71f6&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171126%2Fb4b871c6ff4749a0a4cac099de1e33cd.jpeg",
                "audio": "http://se.sycdn.kuwo.cn/04d8ba6f7e092aaeb80180ce62706e1a/5cf3f510/resource/a3/24/88/2280016677.aac",
                "song": "Melody4",
                "album": "Melody",
                "singer": "Cadmium",
                "duration": 221,
                "isLike": false
            }
        ]
    },
    methods: {
        play() {
            if (this.audio.paused) {
                this.playing = true;
                this.audio.src = this.musicList[this.currentMusic].audio;
                this.audio.currentTime = this.currentTime;
                this.handle_percentage('set');
                var promise = this.audio.play();
                if (promise) {
                    promise.catch((error) => { this.audio.play(); });
                }
            } else {
                this.playing = false;
                this.currentTime = this.audio.currentTime;
                console.log(this.currentTime);
                this.handle_percentage('clear');
                this.audio.pause();
            }
        },
        change(type) {
            this.currentTime = 0;
            this.percentage = 0;
            this.deg = 0;
            clearInterval(this.timer);
            if (type == 'next') {
                this.currentMusic = ((this.currentMusic + 1) % this.musicList.length);
                this.audio.pause();
                this.play();
            } else if (type == 'pre') {
                var num = ((this.currentMusic - 1) % this.musicList.length)
                this.currentMusic = num < 0 ? this.musicList.length + num : num;
                console.log("当前播放： " + this.currentMusic)
                this.audio.pause();
                this.play();
            }
        },
        handle_percentage(handle) {
            if (handle == "set" || handle == "set") {
                this.timer = setInterval(() => {
                    this.currentTime = this.audio.currentTime;
                    this.percentage = (this.currentTime / this.audio.duration) * 100 + '%';
                    this.deg += 0.5;
                    // 播放完毕，切换下一曲
                    if (parseFloat(this.percentage) >= 99.8) {
                        this.change('next');
                    }
                }, 30);
            } else if (handle == "clear" || handle == "clear") {
                clearInterval(this.timer)
            }
        }
    }
});

/*热门文章 */
new Vue({
    el: '#hot-articles',
    data: {
        titleList: [
            { title: "这是最火的文章", link: "https://baidu.com" },
            { title: "这是最火的文章", link: "https://baidu.com" },
            { title: "这是最火的文章", link: "https://baidu.com" },
            { title: "这是最火的文章", link: "https://baidu.com" },
            { title: "这是最火的文章", link: "https://baidu.com" },
            { title: "这是最火的文章", link: "https://baidu.com" },
            { title: "这是最火的文章", link: "https://baidu.com" },
            { title: "这是最火的文章", link: "https://baidu.com" },
            { title: "这是最火的文章", link: "https://baidu.com" }
        ]
    },
    created() {

    }
})


/**最近评论*/
new Vue({
    el: "#recent-comments",
    data: {
        commentsList: [
            { name: '用户名', date: "2019-6-3", comment: "这是评论" },
            { name: '用户名', date: "2019-6-3", comment: "这是评论" },
            { name: '用户名', date: "2019-6-3", comment: "这是评论" },
            { name: '用户名', date: "2019-6-3", comment: "这是评论" },
            { name: '用户名', date: "2019-6-3", comment: "这是评论" },
            { name: '用户名', date: "2019-6-3", comment: "这是评论" },
            { name: '用户名', date: "2019-6-3", comment: "这是评论" },
            { name: '用户名', date: "2019-6-3", comment: "这是评论" },
            { name: '用户名', date: "2019-6-3", comment: "这是评论" },
        ]
    },
    created() {

    }
})