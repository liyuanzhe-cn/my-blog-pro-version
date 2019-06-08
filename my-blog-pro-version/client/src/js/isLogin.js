var token = localStorage.getItem("token");

new Vue({
    el: "#loginModal",
    data: {
        username: "",
        pass: ""
    },
    methods: {
        login() {
            fetch(`/login`, {
                method: "post",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `username=${this.username}&pass=${this.pass}`
            }).then(async (res) => {
                var data = await res.json();
                console.log(data);
            })
        }
    }

})