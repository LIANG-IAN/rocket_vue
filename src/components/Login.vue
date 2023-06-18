<script>
export default {
    components: {
    },
    data() {
        return {
            memberId: "",
            pwd: "",
            idAlertText: "",
            pwdAlertText: "",
            validText: "",
            verifyAlert: ""
        }
    },
    methods: {
        // 帳號欄位檢查
        checkMemberId() {
            const idPattern = "^[A-Z][1-2]\\d{8}$";
            if (this.memberId === null || this.memberId === "") {
                this.idAlertText = "*帳號欄位未填寫";
            }
            else if (!this.memberId.match(idPattern)) {
                this.idAlertText = "*帳號格式錯誤";
            }
            else {
                this.idAlertText = "";
            }
        },
        // 密碼欄位檢查
        checkPwd() {
            const pwdPattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\S]{8,12}$";
            if (this.pwd === null || this.pwd === "") {
                this.pwdAlertText = "*密碼欄位未填寫";
            }
            else if (!this.pwd.match(pwdPattern)) {
                this.pwdAlertText = "*密碼格式錯誤";
            }
            else {
                this.pwdAlertText = "";
            }
        },
        fetchLogin() {
            const body = {
                member_id: this.memberId,
                password: this.pwd
            }
            fetch("http://localhost:8080/log_in", {
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

                // 跳出提醒視窗
                if (data.message === "登入成功") {
                    // 暫存帳號資訊
                    sessionStorage.setItem("member_id", data.member.memberId);
                    sessionStorage.setItem("administrator", data.member.administrator);
                    
                    this.$swal(data.message, "登入成功", "success")
                    .then((result) => {
                        if (result.isConfirmed) {
                            window.history.go(-1);
                        }
                    });
                }
                if (data.message === "資料不正確") {
                    this.$swal(data.message, "輸入錯誤", "error");
                }
                if (data.message === "尚未註冊會員或資料錯誤或尚未生效會員") {
                    this.$swal(data.message, "資訊錯誤", "error");
                }
            })
        },
        loginBtn() {
            // 若有欄位是空
            if (this.memberId.trim() === "" 
                || this.pwd.trim() === ""
                || this.validText.trim() === "") {
                return this.$swal("注意!", "有欄位未填寫", "error");
            }

            // 驗證碼錯誤
            if (this.verifyAlert === "驗證碼錯誤") {
                return this.$swal("驗證碼錯誤", "請重新輸入", "error")
                .then(() => {
                    location.href = "/pages/member/login.html";
                }) 
            }

            this.fetchLogin();
        }
    },
    mounted() {

        // 驗證碼欄位

    }
}
</script>

<template>
    <div class="login-wrap">
        <form>
            <div class="form-item">
                <div class="input-box">
                    <label for="memberId">帳號</label>
                    <input v-model="memberId" @blur="checkMemberId" autocomplete="off" type="text" placeholder="身分證字號，英文字母須大寫" pattern="^[A-Z][1-2]\\d{8}$" required>
                </div>
                <p class="alert-text">{{ idAlertText }}</p>
            </div>
            <div class="form-item">
                <div class="input-box">
                    <label for="pwd">密碼</label>
                    <input v-model="pwd" @blur="checkPwd" autocomplete="off" type="password" placeholder="請輸入8~12碼英文字母和數字" pattern="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\S]{8,12}$" required>
                </div>
                <p class="alert-text">{{ pwdAlertText }}</p>
            </div>

            <div class="input-block">
                <div class="verify-pic">
                    <canvas class="verify-canva" id="authCode"></canvas>
                    <button type="button" class="verify-btn" id="reBtn">換圖</button>
                </div>
                <div class="verify-input">
                    <input id="validText" type="text" placeholder="請輸入驗證碼" />
                    <p id="verifyAlert"></p>
                </div>
            </div>

            <button @click="loginBtn" class="submit-btn" type="button">登入</button>              
        </form>  
    </div>
</template>

<style lang="scss" scoped>
    form {
        background-color: #fff;
        padding: 30px 0;
        .form-item {
            .input-box {
                display: flex;
                width: 300px;
                margin: 20px auto 15px;

                label {
                    width: 3rem;
                    padding: 0 15px;
                    line-height: 2rem;
                }
                
                input {
                    width: 100%;
                    padding-left: 10px;
                    line-height: 2rem;
                    border: 1px solid #777;
                    border-radius: 4px;
                    color: #665e54;
                    font-weight: 700;

                    &:focus {
                        outline: none;
                        border: 1px solid #edd76a;
                    }
                }
            }

            .alert-text {
                width: 30%;
                height: .5rem;
                margin: 0 auto;
                color: #f00;
                font-size: .5rem;
            }
        }
        .input-block {
            width: 60%;
            margin: 10px auto;
            text-align: center;
            .verify-pic {
                display: flex;
                padding-left: 10px;
                margin: 10px 0;
                .verify-canva {
                    width: 200px;
                    height: 50px;
                    border-radius: 4px;
                }
                .verify-btn {
                    width: 50px;
                    height: fit-content;
                    margin: 10px;
                    padding: 5px;
                    border-radius: 5px;
                    background-color: #665e54;
                    font-size: .6rem;
                    transition: .3s;

                    &:hover {
                        background-color: #777;
                    }

                    &:active {
                        scale: .95;
                    }
                }
            }
            .verify-input {
                display: flex;
                padding-left: 10px;

                input {
                    width: 100px;
                    padding-left: 10px;
                    line-height: 2rem;
                    border: 1px solid #777;
                    border-radius: 4px;
                    color: #665e54;
                    font-weight: 700;

                    &:focus {
                        outline: none;
                        border: 1px solid #edd76a;
                    }
                }
                p {
                    width: 80px;
                    padding: 10px 0;
                    font-size: .8rem;
                }
            }

        }
        .submit-btn {
            width: 150px;
            margin: 24px 164px 6px;
            border: none;
            border-radius: 4rem;
            background-color: #995a25;
            font-size: 1rem;
            font-weight: 700;
            color: #fff;
            box-shadow: 0px 8px 15px #0000001a;
            transition: .3s;

            &:hover {
                background-color: #edd76a;
                color: #995a25;
                box-shadow: 0px 15px 20px #f3eabd;
                transform: translateY(-7px);
                cursor: pointer;
            }
        }
    }
</style>