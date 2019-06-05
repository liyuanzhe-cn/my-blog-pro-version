new Vue({
    el: '.imgWall',
    data: {
        lock: true
    },
    mounted() {

    },
    methods: {
        photo(e) {
            // console.log(this.$refs.photolist)
            if (this.lock) {
                this.lock = false;
                var imgs = this.$refs.photolist.children;
                for (let i = 0; i < imgs.length; i++) {
                    setTimeout(() => {
                        setTimeout(() => {
                            this.lock = true;
                            imgs[i].style.transition = "all 1s"
                            imgs[i].style.opacity = 0;
                            //多重效果 
                            var rate = Math.ceil(Math.random() * 3);
                            if (rate === 1) {
                                // 原地百叶窗
                                imgs[i].style.transform = "perspective(800px) translateZ(0px) rotateX(0deg) rotateY(-1800deg) rotateZ(0deg) translateY(0px) translateX(0px)";
                            } else if (rate === 2) {
                                // 由近到远 原地百叶窗效果
                                imgs[i].style.transform = "perspective(0px) translateZ(0px) rotateX(0deg) rotateY(-1800deg) rotateZ(0deg) translateY(0px) translateX(0px)";
                            } else if (rate === 3) {
                                // 左平移卷轴效果
                                imgs[i].style.transform = "perspective(0px) translateZ(0px) rotateX(0deg) rotateY(-1800deg) rotateZ(0deg) translateY(0px) translateX(1000px)";
                            }





                            setTimeout(() => {
                                this.lock = true;
                                imgs[i].style.transformOrigin = "0 0";
                                imgs[i].style.opacity = 1;
                                var num = i % 10;
                                imgs[i].style.transition = "all " + ((num * 400) + 500) + "ms";
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

})