<script>
export default {
    data() {
        return {
            pwdInside: "",
            memberNameInside: "",
            phoneInside: "",
            birthdayInside: "",

            // inputPwd: "",
            // inputMemberName: "",
            // inputPhone: "",
            // inputBirthday: "",

            phonePattern: "^09\\d{8}$",
            pwdPattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\S]{8,12}$",

            today: new Date(),
            maxDate: new Date().toISOString().split('T')[0],
            date: "",

            memberInfoBody: null
        }
    },
    methods: {
        // 修改密碼
        showPwd() {
            this.$swal({
                title: "修改密碼",
                html: 
                `
                <input type="text" v-model="inputPwd" class="swal2-input" style="display: flex justify-content: center">
                `,
                confirmButtonText: "確定",
                confirmButtonColor: "#ff7e6b",
                showCancelButton: true,
                cancelButtonText: "取消", 
                inputAttributes: {
                    autocomplete: 'off'
                },
                preConfirm: () => {
                    if(this.inputPwd === null || this.inputPwd === "") {
                        return this.$swal("*密碼欄位未填寫")
                        .then(() => {
                            this.showPwd(); 
                        });
                    }
                    else if (this.inputPwd === this.pwdInside) {
                        return this.$swal("*密碼不可與原本相同")
                        .then(() => {
                            this.showPwd(); 
                        })
                    }
                    else if (!this.inputPwd.match(this.pwdPattern)) {
                        return this.$swal("*密碼格式錯誤")
                        .then(() => {
                            this.showPwd(); 
                        })
                    }
                    else {
                        return this.$swal({
                            title: "請再次確認變更是否正確",
                            text: `新密碼: ${this.inputPwd}`,
                            confirmButtonText: "確定",
                            confirmButtonColor: "#ff7e6b",
                            showCancelButton: true,
                            cancelButtonText: "取消",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // fetch 後端api
                                const body = {
                                    member_id: sessionStorage.getItem("member_id"),
                                    password: this.inputPwd,
                                }
                                
                                return fetch("http://localhost:8080/update_pwd", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    "body": JSON.stringify(body),
                                    credentials: 'include', 
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    if (data.message === "更新會員資訊成功") {
                                        this.$swal({
                                            title: "成功更新密碼",
                                            text: "請重新登入",
                                            icon: "success"
                                        }).then(() => {
                                            // 更新密碼後(會強制登出)需要重新登入
                                            sessionStorage.removeItem("member_id");
                                            sessionStorage.removeItem("administrator");
                                            this.$router.push("/loginSignup/login")

                                            // 密碼改成*符號
                                            let starPwd = "";
                                            function turnToStar(pwd) {
                                                pwd.split("").forEach(() => {
                                                    starPwd += "*";
                                                })
                                            }
                                            turnToStar(this.inputPwd);
                                            this.pwdInside = starPwd;
                                        });
                                    }
                                })
                            }
                        })
                    }
                },
            })
        },
        // 修改姓名
        showMemberName() {
            this.$swal({
                title: "修改姓名",
                html: 
                `
                <input type="text" value="${this.memberNameInside}" v-model="inputMemberName" class="swal2-input" style="display: flex justify-content: center">
                `,
                confirmButtonText: "確定",
                confirmButtonColor: "#ff7e6b",
                showCancelButton: true,
                cancelButtonText: "取消", 
                inputAttributes: {
                    autocomplete: 'off'
                },
                preConfirm: () => {
                    if(this.inputMemberName === null || this.inputMemberName === "") {
                        return this.$swal("*姓名欄位未填寫")
                        .then(() => {
                            this.showMemberName(); 
                        });
                    }
                    else if (this.inputMemberName === this.memberNameInside) {
                        return this.$swal("*姓名不可與原本相同")
                        .then(() => {
                            this.showMemberName(); 
                        })
                    }
                    else {
                        return this.$swal({
                            title: "請再次確認變更是否正確",
                            text: `新姓名: ${this.inputMemberName}`,
                            confirmButtonText: "確定",
                            confirmButtonColor: "#ff7e6b",
                            showCancelButton: true,
                            cancelButtonText: "取消",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // fetch 後端api
                                const body = {
                                    member_id: sessionStorage.getItem("member_id"),
                                    member_name: this.inputMemberName,
                                }
                                
                                return fetch("http://localhost:8080/update_member_name", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    "body": JSON.stringify(body),
                                    credentials: 'include', 
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    if (data.message === "更新會員資訊成功") {
                                        this.$swal({
                                            title: "成功更新姓名",
                                            icon: "success"
                                        });
                                        this.memberNameInside = this.inputMemberName;
                                    }
                                })
                            }
                        })
                    }
                },
            })
        },
        // 修改手機
        showPhone() {
            this.$swal({
                title: "修改手機",
                html: 
                `
                <input type="text" value="${this.phoneInside}" v-model="inputPhone" class="swal2-input" style="display: flex justify-content: center">
                `,
                confirmButtonText: "確定",
                confirmButtonColor: "#ff7e6b",
                showCancelButton: true,
                cancelButtonText: "取消", 
                inputAttributes: {
                    autocomplete: 'off'
                },
                preConfirm: () => {

                    if(this.inputPhone === null || this.inputPhone === "") {
                        return this.$swal("*手機欄位未填寫")
                        .then(() => {
                            this.showPhone(); 
                        });
                    }
                    else if (this.inputPhone === this.phoneInside) {
                        return this.$swal("*手機不可與原本相同")
                        .then(() => {
                            this.showPhone(); 
                        })
                    }
                    else if (!this.inputPhone.match(phonePattern)) {
                        return this.$swal("*手機格式錯誤")
                        .then(() => {
                            this.showPhone(); 
                        })
                    }
                    else {
                        return this.$swal({
                            title: "請再次確認變更是否正確",
                            text: `新手機:    ${this.inputPhone}`,
                            confirmButtonText: "確定",
                            confirmButtonColor: "#ff7e6b",
                            showCancelButton: true,
                            cancelButtonText: "取消",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // fetch 後端api
                                const body = {
                                    member_id: sessionStorage.getItem("member_id"),
                                    phone: this.inputPhone,
                                }
                                
                                return fetch("http://localhost:8080/update_phone", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    "body": JSON.stringify(body),
                                    credentials: 'include', 
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    if (data.message === "更新會員資訊成功") {
                                        this.$swal({
                                            title: "成功更新手機",
                                            icon: "success"
                                        });
                                        this.phoneInside = this.inputPhone;
                                    }
                                })
                            }
                        })
                    }
                },
            })
        },
        // 修改生日
        showBirthday() {
            this.$swal({
                title: "修改生日",
                html: 
                `
                <input type="date" value="${this.birthdayInside}" v-model="inputBirthday" min="1900-01-01" :max="${this.maxDate}" placeholder="yyyy/mm/dd" pattern="^\\d{4}-\\d{2}-\\d{2}$" class="swal2-input" style="display: flex justify-content: center" >
                `,
                confirmButtonText: "確定",
                confirmButtonColor: "#ff7e6b",
                showCancelButton: true,
                cancelButtonText: "取消", 
                inputAttributes: {
                    autocomplete: 'off'
                },
                preConfirm: () => {
                    // 解析日期字串為日期物件
                    this.date = new Date(this.inputBirthday);

                    if (this.date.getFullYear() < 1900 
                    || this.date.getFullYear() > this.today.getFullYear()) {
                        return this.$swal("*生日無效")
                        .then(() => {
                            this.showBirthday(); 
                        })
                    }
                    else if(this.inputBirthday === null || this.inputBirthday === "") {
                        return this.$swal("*生日欄位未填寫")
                        .then(() => {
                            this.showBirthday(); 
                        });
                    }
                    else if (this.inputBirthday === this.birthdayInside) {
                        return this.$swal("*生日不可與原本相同")
                        .then(() => {
                            this.showBirthday(); 
                        })
                    }
                    else {
                        return this.$swal({
                            title: "請再次確認變更是否正確",
                            text: `新生日: ${this.inputBirthday}`,
                            confirmButtonText: "確定",
                            confirmButtonColor: "#ff7e6b",
                            showCancelButton: true,
                            cancelButtonText: "取消",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // fetch 後端api
                                const body = {
                                    member_id: sessionStorage.getItem("member_id"),
                                    birthday: this.inputBirthday,
                                }
                                
                                return fetch("http://localhost:8080/update_birthday", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    "body": JSON.stringify(body),
                                    credentials: 'include', 
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    if (data.message === "更新會員資訊成功") {
                                        this.$swal({
                                            title: "成功更新生日",
                                            icon: "success"
                                        });
                                        this.birthdayInside = this.inputBirthday;
                                    }
                                })
                            }
                        })
                    }
                },
            })
        }
    },
    mounted() {
    // fetch 後端API
    this.memberInfoBody = {
        member_id: sessionStorage.getItem("member_id"),
    }

    fetch("http://localhost:8080/get_member_info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(this.memberInfoBody),
        credentials: 'include', 
    })
    .then(response => response.json())
    .then(data => {
        this.pwdInside = data.member.pwd;
        this.memberNameInside = data.member.memberName;
        this.phoneInside = data.member.phone;
        this.birthdayInside= data.member.birth;
        
        // 預設內文
        // 密碼改成*符號
        let starPwd = "";
        function turnToStar(pwd) {
            pwd.split("").forEach(() => {
                starPwd += "*";
            })
        }
        turnToStar(this.pwdInside);
        this.pwdInside = starPwd;
    })
    }
}
</script>

<template>
    <div class="member-info-body">
        <aside>
            <ul class="nav">
                <li class="nav-item member-info-item">
                    <a href="/pages/member_info.html">
                        <font-awesome-icon icon="fa-solid fa-user" style="color: #995a25;" />
                        <p>會員資訊</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#">
                        <font-awesome-icon icon="fa-solid fa-cart-shopping" style="color: #995a25;" />
                        <p>購物車</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#">
                        <font-awesome-icon icon="fa-solid fa-file-lines" style="color: #995a25;" />
                        <p>訂單歷史</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#">
                        <font-awesome-icon icon="fa-solid fa-heart" style="color: #995a25;" />
                        <p>我想認養</p>
                    </a>
                </li>
            </ul>
        </aside>
        <main>
            <h2>會員資訊</h2>
            <div class="merber-info-box">
                <div class="info-content-box">
                    <div class="each-content-box" @click="showPwd">
                        <p class="title">密碼</p>
                        <div class="content-box">
                            <p>{{ pwdInside }}</p>
                            <font-awesome-icon class="icon-pen" icon="fa-solid fa-pen" style="color: #995a25;" />
                        </div>
                    </div>
                    <div class="each-content-box" @click="showMemberName">
                        <p class="title">姓名</p>
                        <div class="content-box">
                            <p>{{ memberNameInside }}</p>
                            <font-awesome-icon class="icon-pen" icon="fa-solid fa-pen" style="color: #995a25;" />
                        </div>
                    </div>
                    <div class="each-content-box" @click="showPhone">
                        <p class="title">手機</p>
                        <div class="content-box">
                            <p>{{ phoneInside }}</p>
                            <font-awesome-icon class="icon-pen" icon="fa-solid fa-pen" style="color: #995a25;" />
                        </div>
                    </div>
                    <div class="each-content-box" @click="showBirthday">
                        <p class="title">生日</p>
                        <div class="content-box">
                            <p>{{ birthdayInside }}</p>
                            <font-awesome-icon class="icon-pen" icon="fa-solid fa-pen" style="color: #995a25;" />
                        </div>
                    </div>               
                </div> 
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.member-info-body {
    display: flex;
    margin: 30px 0;
    padding: 0 30px;
    font-family: sans-serif;

    aside {
        width: 16%;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 3px 10px rgba(0,0,0,.05);
        .nav {
            padding: 15px 0;

            .member-info-item {
                background-color: #edd76a;
            }
            
            .nav-item {
                width: 48%;
                margin: 15px auto;
                border-radius: 10px;
                text-align: center;

                a {
                    display: block;
                    padding: 15px;
                    font-weight: normal;
                    
                    p {
                        margin-top: 10px;
                        font-size: .9rem;
                        color: #665e54;
                    }
                }
            }
        }
    }

    main {
        width: 80%;
        margin: 0 30px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 3px 10px #0000000d;
        
        h2 {
            text-align: center;
            padding: 30px 0 15px;
            font-size: 1.5rem;
            font-weight: bold;
        }

        .merber-info-box {
            display: flex;
            justify-content: center;
            margin-bottom: 15px;
    
            .info-content-box {
                width: 400px;
                .each-content-box {
                    width: 80%;
                    margin: 20px auto;
                    
                    .title {
                        margin-bottom: 5px;
                        &::before {
                            content: "*";
                            color: #ff7e6b;
                        }
                    }
                    .content-box {
                        border-radius: 5px;
                        line-height: 48px;
                        background-color: #ececec;
                        cursor: pointer;
                        position: relative;
    
                        p {
                            padding-left: 16px;
                            color: #665e54;
                        }
    
                        .icon-pen {
                            position: absolute;
                            top: 16px;
                            right: 16px;
                        }
                    }
                }
            }
        }
    }
}
</style>