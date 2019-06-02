/**随机标签云 */
new Vue({
    el: '#random-tags',
    data: {
        tags: ["数组", "面向对象", "NODEJS", "REACT", "VUE", "ANGULAR", "TYPESCRIPT"]
    },
    computed: {

        randomColor() {
            return "rgb(" + this.random() + "," + this.random() + "," + this.random() + ")";
        },
        randomSize() {
            return Math.random() * 12 + 12;
        }
    },
    methods: {
        random() {
            return Math.random() * 255;
        },
    }

})

window.onload = function () {
    var audio = new Audio("https://webfs.yun.kugou.com/201906022335/6d3ed42e41e2240d08e2100f68ee6e4f/G120/M04/12/1D/GIcBAFomaIqAOw3WADXMU26TS1g802.mp3");
    audio.onload = function () {
        // if (sessionStorage.getItem("musicIsPlaying") !== 'playing') {
        audio.play();
        // sessionStorage.setItem("musicIsPlaying", "playing");
        // }
    }


}
