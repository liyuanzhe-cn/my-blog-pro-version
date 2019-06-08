/**随机标签云 */
new Vue({
    el: '#random-tags',
    data: {
        tags: []
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
    created() {
        (async () => {
            try {
                var res = await fetch(`/queryAllTags`);
                var data = await res.json();
                // { "id": 4, "tags": "测试", "ctime": 1559561784, "utime": 1559561784 }
                this.tags = data.data;
            } catch (e) {
                console.log(e);
            }
        })();
    }
})

/**音乐播放器 */
var music = new Vue({
    el: '#music-player',
    data: {
        currentMusic: 0,
        audio: new Audio(),
        currentTime: 0,
        percentage: 0,
        timer: null,
        playing: false,
        src: '',
        deg: 0,
        musicList: [
            {
                "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559722863895&di=f8d0438fe4dcd17b98b486c8b92ea9db&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn12%2F309%2Fw1200h709%2F20180620%2Fd001-hefphqk1195953.jpg",
                "audio": "/queryMusic?music=学猫叫.m4a",
                "song": "学猫叫",
                "album": "学猫叫",
                "singer": "小潘潘,小峰峰",
            },
            {
                "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557147106191&di=beda36e75c0602746a03b24635bb3b50&imgtype=0&src=http%3A%2F%2Fimg2.soyoung.com%2Ftieba%2Fweb%2F20190114%2F3%2Fd44d0ec8fe54ed589affa5f8fbf79c3c_570.jpg",
                "audio": "/queryMusic?music=小小恋歌.aac",
                "song": "小小恋歌",
                "album": "小小恋歌.aac",
                "singer": "新垣结衣",
            },
            {
                "image": "https://images.genius.com/4bd10dbc6bb093e27c984f863703dd6e.640x640x1.jpg",
                "audio": "/queryMusic?music=Melody.m4a",
                "song": "Melody",
                "album": "Melody",
                "singer": "Cadmium",
            },
            {
                "image": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557147487355&di=153507d1842c7d6119ae9e5b846c71f6&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171126%2Fb4b871c6ff4749a0a4cac099de1e33cd.jpeg",
                "audio": "/queryMusic?music=带你去旅行.mp3",
                "song": "带你去旅行",
                "album": "带你去旅行",
                "singer": "校长",
            }
        ]
    },
    methods: {
        play() {

            if (this.audio.paused) {
                // 暂停状态下
                this.playing = true;
                //判断src
                // if (!this.src) {
                //     console.log("音乐播放器首次赋值SRC")
                //     this.audio.src = window.location.origin + this.musicList[this.currentMusic].audio;
                //     this.src = this.musicList[this.currentMusic].audio
                // } else {
                //     if (this.src !== window.location.origin + this.musicList[this.currentMusic].audio) {
                //         console.log("音乐路径改变")
                //         this.audio.src = window.location.origin + this.musicList[this.currentMusic].audio;
                //         this.src = window.location.origin + Sthis.musicList[this.currentMusic].audio;
                //     }
                //     // 
                // }
                this.audio.src = window.location.origin + this.musicList[this.currentMusic].audio;
                console.log(this.audio.seekable)
                this.audio.currentTime = this.currentTime;
                console.log(this.currentTime, this.audio.currentTime);
                this.handle_percentage('set');
                var promise = this.audio.play();
                if (promise) {
                    promise.catch((error) => { this.audio.play(); });
                }


            } else {
                // 播放状态下
                this.playing = false;
                this.currentTime = this.audio.currentTime;


                this.handle_percentage('clear');

                this.audio.pause();
                console.log(this.audio.currentTime);
            }
        },
        setBar(e) {
            ///音乐不播放时，不能设置进度条
            if (!this.audio.paused) {
                this.play();
                var clickX = e.offsetX - 8;
                var width = e.currentTarget.offsetWidth;
                var percentage = clickX / width;
                this.percentage = percentage * 100 + "%";
                this.currentTime = Object.is(this.audio.duration * percentage, NaN) ? 0 : this.audio.duration * percentage;
                // console.log(this.percentage, this.currentTime);
                this.play();
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
    },
    mounted() {
        console.log(this.audio)
        this.audio.preload = "metadata"
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
        (async () => {
            try {
                var res = await fetch(`/queryHotBlog?size=10`);
                var data = await res.json();
                console.log(data.data)
                data.data.forEach((ele) => {
                    ele.link = `/blog_detail.html?bid=` + ele.id
                })
                this.titleList = data.data;
            } catch (e) {

            }
        })();

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
        (async () => {
            try {
                var res = await fetch(`/queryRecentComments`);
                var data = await res.json();

                data.data.forEach((ele, index) => {
                    var time = new Date(ele.ctime);
                    ele.ctime = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDay() + '日 ' + time.getHours() + ':' + time.getMinutes();
                })
                console.log('最近评论', data.data)
                this.commentsList = data.data;

            } catch (e) {
                console.log(e)
            }

        })();
    }
})