<script>
export default {
    data() {
        return {
            pwdInside: null,
            memberNameInside: null,
            phoneInside: null,
            birthdayInside: null,
        }
    },
    methods: {

    },
    mounted() {
    // fetch 後端API
    const body = {
        member_id: sessionStorage.getItem("member_id"),
    }

    fetch("http://localhost:8080/get_member_info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(body),
        credentials: 'include', 
    })
    .then(response => response.json())
    .then(data => {
        // let dataPwd = data.member.pwd;
        this.pwdInside = data.member.pwd;
        // let dataMemberName = data.member.memberName;
        this.memberNameInside = data.member.memberName;
        // let dataPhone = data.member.phone;
        this.phoneInside = data.member.phone;
        // let dataBirth = data.member.birth;
        this.birthdayInside= data.member.birth;
        
        // 預設內文
        // 密碼改成*符號
        let starPwd = "";
        function turnToStar(pwd) {
            pwd.split("").forEach(() => {
                starPwd += "*";
            })
        }
        turnToStar(dataPwd);
        pwdInsideDOM.innerText = starPwd;

        memberNameInsideDOM.innerText = dataMemberName;
        phoneInsideDOM.innerText = dataPhone;
        birthdayInsideDOM.innerText = dataBirth;


        // 修改密碼
        let inputPwdDOM = null;
        pwdDOM.addEventListener("click", function showPwd() {
            this.$swal({
                title: "修改密碼",
                html: 
                `
                <input type="text" id="inputPwd" class="swal2-input" style="display: flex justify-content: center">
                `,
                confirmButtonText: "確定",
                confirmButtonColor: "#ff7e6b",
                showCancelButton: true,
                cancelButtonText: "取消", 
                inputAttributes: {
                    autocomplete: 'off'
                },
                preConfirm: () => {
                    inputPwdDOM = document.querySelector("#inputPwd");
        
                    const pwdPattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\S]{8,12}$";

                    if(inputPwdDOM.value === null || inputPwdDOM.value === "") {
                        return this.$swal("*密碼欄位未填寫")
                        .then(() => {
                            showPwd(); 
                        });
                    }
                    else if (inputPwdDOM.value === dataPwd) {
                        return this.$swal("*密碼不可與原本相同")
                        .then(() => {
                            showPwd(); 
                        })
                    }
                    else if (!inputPwdDOM.value.match(pwdPattern)) {
                        return this.$swal("*密碼格式錯誤")
                        .then(() => {
                            showPwd(); 
                        })
                    }
                    else {
                        return this.$swal({
                            title: "請再次確認變更是否正確",
                            text: `新密碼:    ${inputPwdDOM.value}`,
                            confirmButtonText: "確定",
                            confirmButtonColor: "#ff7e6b",
                            showCancelButton: true,
                            cancelButtonText: "取消",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // fetch 後端api
                                const body = {
                                    member_id: sessionStorage.getItem("member_id"),
                                    password: inputPwdDOM.value,
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
                                        }).then((result) => {
                                            // 更新密碼後(會強制登出)需要重新登入
                                            sessionStorage.removeItem("member_id");
                                            location.href="/pages/member/login.html";
                                            // pwdInsideDOM.innerText = inputPwdDOM.value;
                                            // 密碼改成*符號
                                            let starPwd = "";
                                            function turnToStar(pwd) {
                                                pwd.split("").forEach(() => {
                                                    starPwd += "*";
                                                })
                                            }
                                            turnToStar(inputPwdDOM.value);
                                            pwdInsideDOM.innerText = starPwd;
                                        })
                                    }
                                })
                            }
                        })
                    }
                },
            })
        })


        // 修改姓名
        let inputMemberNameDOM = null;
        memberNameDOM.addEventListener("click", function showMemberName() {
            this.$swal({
                title: "修改姓名",
                html: 
                `
                <input type="text" value="${dataMemberName}" id="inputMemberName" class="swal2-input" style="display: flex justify-content: center">
                `,
                confirmButtonText: "確定",
                confirmButtonColor: "#ff7e6b",
                showCancelButton: true,
                cancelButtonText: "取消", 
                inputAttributes: {
                    autocomplete: 'off'
                },
                preConfirm: () => {
                    inputMemberNameDOM = document.querySelector("#inputMemberName");

                    if(inputMemberNameDOM.value === null || inputMemberNameDOM.value === "") {
                        return this.$swal("*姓名欄位未填寫")
                        .then(() => {
                            showMemberName(); 
                        });
                    }
                    else if (inputMemberNameDOM.value === dataMemberName) {
                        return this.$swal("*姓名不可與原本相同")
                        .then(() => {
                            showMemberName(); 
                        })
                    }
                    else {
                        return this.$swal({
                            title: "請再次確認變更是否正確",
                            text: `新姓名:    ${inputMemberNameDOM.value}`,
                            confirmButtonText: "確定",
                            confirmButtonColor: "#ff7e6b",
                            showCancelButton: true,
                            cancelButtonText: "取消",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // fetch 後端api
                                const body = {
                                    member_id: sessionStorage.getItem("member_id"),
                                    member_name: inputMemberNameDOM.value,
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
                                        memberNameInsideDOM.innerText = inputMemberNameDOM.value;
                                    }
                                })
                            }
                        })
                    }
                },
            })
        })

        
        // 修改手機
        let inputPhoneDOM = null;
        phoneDOM.addEventListener("click", function showPhone() {
            this.$swal({
                title: "修改手機",
                html: 
                `
                <input type="text" value="${dataPhone}" id="inputPhone" class="swal2-input" style="display: flex justify-content: center">
                `,
                confirmButtonText: "確定",
                confirmButtonColor: "#ff7e6b",
                showCancelButton: true,
                cancelButtonText: "取消", 
                inputAttributes: {
                    autocomplete: 'off'
                },
                preConfirm: () => {
                    inputPhoneDOM = document.querySelector("#inputPhone");
        
                    const phonePattern = "^09\\d{8}$";

                    if(inputPhoneDOM.value === null || inputPhoneDOM.value === "") {
                        return this.$swal("*手機欄位未填寫")
                        .then(() => {
                            showPhone(); 
                        });
                    }
                    else if (inputPhoneDOM.value === dataPhone) {
                        return this.$swal("*手機不可與原本相同")
                        .then(() => {
                            showPhone(); 
                        })
                    }
                    else if (!inputPhoneDOM.value.match(phonePattern)) {
                        return this.$swal("*手機格式錯誤")
                        .then(() => {
                            showPhone(); 
                        })
                    }
                    else {
                        return this.$swal({
                            title: "請再次確認變更是否正確",
                            text: `新手機:    ${inputPhoneDOM.value}`,
                            confirmButtonText: "確定",
                            confirmButtonColor: "#ff7e6b",
                            showCancelButton: true,
                            cancelButtonText: "取消",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // fetch 後端api
                                const body = {
                                    member_id: sessionStorage.getItem("member_id"),
                                    phone: inputPhoneDOM.value,
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
                                        phoneInsideDOM.innerText = inputPhoneDOM.value;
                                    }
                                })
                            }
                        })
                    }
                },
            })
        })


        // 日期: 設定最大日期為 today
        const today = new Date();
        const maxDate = today.toISOString().split('T')[0];

        // 修改生日
        let inputBirthdayDOM = null;
        birthdayDOM.addEventListener("click", function showBirthday() {
            this.$swal({
                title: "修改生日",
                html: 
                `
                <input type="date" value="${dataBirth}" id="inputBirthday" min="1900-01-01" max="${maxDate}" placeholder="yyyy/mm/dd" pattern="^\\d{4}-\\d{2}-\\d{2}$" class="swal2-input" style="display: flex justify-content: center" >
                `,
                confirmButtonText: "確定",
                confirmButtonColor: "#ff7e6b",
                showCancelButton: true,
                cancelButtonText: "取消", 
                inputAttributes: {
                    autocomplete: 'off'
                },
                preConfirm: () => {
                    inputBirthdayDOM = document.querySelector("#inputBirthday");

                    // 解析日期字串為日期物件
                    const date = new Date(inputBirthdayDOM.value);

                    if (date.getFullYear() < 1900 
                    || date.getFullYear() > today.getFullYear()) {
                        return this.$swal("*生日無效")
                        .then(() => {
                            showBirthday(); 
                        })
                    }
                    else if(inputBirthdayDOM.value === null || inputBirthdayDOM.value === "") {
                        return this.$swal("*生日欄位未填寫")
                        .then(() => {
                            showBirthday(); 
                        });
                    }
                    else if (inputBirthdayDOM.value === dataBirth) {
                        return this.$swal("*生日不可與原本相同")
                        .then(() => {
                            showBirthday(); 
                        })
                    }
                    else {
                        return this.$swal({
                            title: "請再次確認變更是否正確",
                            text: `新生日: ${inputBirthdayDOM.value}`,
                            confirmButtonText: "確定",
                            confirmButtonColor: "#ff7e6b",
                            showCancelButton: true,
                            cancelButtonText: "取消",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // fetch 後端api
                                const body = {
                                    member_id: sessionStorage.getItem("member_id"),
                                    birthday: inputBirthdayDOM.value,
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
                                        birthdayInsideDOM.innerText = inputBirthdayDOM.value;
                                    }
                                })
                            }
                        })
                    }
                },
            })
        })
        
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
                    <div class="each-content-box" @onclick="">
                        <p class="title">密碼</p>
                        <div id="upPwdBox" class="content-box">
                            <p>{{ pwdInside }}</p>
                            <font-awesome-icon icon="fa-solid fa-pen" style="color: #995a25;" />
                        </div>
                    </div>
                    <div class="each-content-box" @onclick="">
                        <p class="title">姓名</p>
                        <div id="upMemberNameBox" class="content-box">
                            <p>{{ memberNameInside }}</p>
                            <font-awesome-icon icon="fa-solid fa-pen" style="color: #995a25;" />
                        </div>
                    </div>
                    <div class="each-content-box" @onclick="">
                        <p class="title">手機</p>
                        <div id="upPhoneBox" class="content-box">
                            <p>{{ phoneInside }}</p>
                            <font-awesome-icon icon="fa-solid fa-pen" style="color: #995a25;" />
                        </div>
                    </div>
                    <div class="each-content-box" @onclick="">
                        <p class="title">生日</p>
                        <div id="upBirthBox" class="content-box">
                            <p>{{ birthdayInside }}</p>
                            <font-awesome-icon icon="fa-solid fa-pen" style="color: #995a25;" />
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
                background-color: #ffe9e8;
            }
            
            .nav-item {
                width: 48%;
                margin: 15px auto;
                border-radius: 10px;
                text-align: center;

                a {
                    display: block;
                    padding: 15px;
                    
                    i {
                        margin-bottom: 10px;
                    }
                    p {
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
    
                        i {
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