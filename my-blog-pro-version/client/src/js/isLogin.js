var token = localStorage.getItem("token");

new Vue({
    el: "#loginModal",
    data: {
        username: "",
        pass: "",
        show: false
    },
    methods: {
        login() {
            fetch(`/api/user/login`, {
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `username=${this.username}&pass=${this.pass}`
            }).then(async (res) => {
                var data = await res.json();
                console.log(data);
                localStorage.setItem('token', data.token);
                this.isLogin();
            })
        },
        register() {
            fetch(`/api/user/register`, {
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `username=${this.username}&pass=${this.pass}`
            }).then(async (res) => {
                var data = await res.json();
                console.log(data);
                if (data.status == 'success') {
                    alert('注册成功');
                } else {
                    alert('已被注册');
                }
            })
        },
        isLogin() {
            // 登陆状态的判断
            var token = localStorage.getItem('token');
            if (!token) {
                this.show = true;
            } else {
                this.show = false;
            }
        }
    },
    mounted() {
        this.isLogin();
    }

})