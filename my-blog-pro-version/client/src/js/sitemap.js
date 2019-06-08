new Vue({
    el: "#sphere-wrapper",
    data: {
        degY: 0,
        degZ: 0,
        degX: 0,
        checked: false,
        timer: null,

    },
    methods: {

    },
    created() {
        var plane = document.getElementsByClassName('plane');
        for (var i = 0; i < plane.length; i++) {
            plane[i].style.transform = "rotateY(" + i * 10 + "deg)";
            var li = plane[i].getElementsByTagName('li');
            // console.log(li);
            for (var j = 0; j < li.length; j++) {
                li[j].style.transform = "rotate(" + j * 10 + "deg)"
            }
        }
    },
    methods: {
        rotate() {

            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.degY += 0.2;
                this.degZ += 0.05;
                this.degX += 0.07;
                // console.log(this.deg);
                this.$refs.sphere.style.transform = "rotateY(" + this.degY + "deg) rotateZ(" + this.degZ + "deg) rotatex(" + this.degX + "deg)"
            }, 41)
        },
        rotateOrStop() {

            if (this.checked) {
                console.log("开启")
                clearInterval(this.timer);
                this.rotate()
            } else {
                console.log("关闭")
                clearInterval(this.timer);
            }
        }
    },
    mounted() {
        this.rotateOrStop();
        var style = document.createElement('style');
        var str = ``;
        for (var i = 1; i <= 684; i++) {
            str += ` #sphere .plane:nth-of-type(${Math.floor(i / 19)}) li:nth-of-type(${(i % 19) + 1})::after {background-color: rgba(${Math.random() * 250} ,${Math.random() * 250},${Math.random() * 250}, 1);}`
        }
        style.innerText = str;
        document.body.appendChild(style);

        // 鼠标切换视角
        // document.addEventListener('click', (e) => {

        //     var str = `${(e.clientX / window.innerWidth) * 100 + "%"} ${(e.clientY / window.innerHeight) * 100 + "%"}`;
        //     // console.log(str);
        //     this.$refs.sphere.style.perspectiveOrigin = str;
        // })




        // 运动，未完成
        // var downX;
        // var downY;
        // var mouseDown = (e) => {
        //     downX = e.clientX;
        //     downY = e.clientY;
        //     console.log(downX, downY);
        //     document.addEventListener("mousemove", mouseMove, false);
        //     document.addEventListener('mouseup', removeEvent, false);
        // };

        // var mouseMove = (e) => {
        //     var moveX = e.clientX;
        //     var moveY = e.clientY;
        //     var disX = moveX - downX;
        //     var disY = moveY - downY;
        //     console.log(disX, disY);
        // };

        // var removeEvent = (e) => {
        //     document.removeEventListener("mousemove", mouseMove, false);
        //     document.removeEventListener("mouseup", removeEvent, false);
        // };

        // this.$refs.sphere.addEventListener('mousedown', mouseDown, false);
    }
});

new Vue({
    el: "#article-list",
    data: {
        articleList: []
    },
    created() {
        (async () => {
            console.log(111)
            try {
                var res = await fetch("/queryAllBlog");
                var data = await res.json();
                console.log(data.data)
                this.articleList = data.data;
            } catch (e) {
                console.log(e);
            }

        })()
    }
})