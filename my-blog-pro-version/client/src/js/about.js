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

})