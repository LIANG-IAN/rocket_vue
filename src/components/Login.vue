<script>
import Verifycode from "./Verifycode.vue"
export default {
    components: {
        Verifycode
    },
    data() {
        return {
            memberId: "",
            pwd: "",

            idAlertText: "",
            pwdAlertText: "",

            idPattern: "^[A-Z][1-2]\\d{8}$",
            pwdPattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\S]{8,12}$",

            validText: "",
            verifyPic: ""
        }
    },
    methods: {
        // 帳號欄位檢查
        checkMemberId() {
            if (this.memberId === null || this.memberId === "") {
                this.idAlertText = "*帳號欄位未填寫";
            }
            else if (!this.memberId.match(this.idPattern)) {
                this.idAlertText = "*帳號格式錯誤";
            }
            else {
                this.idAlertText = "";
            }
        },
        // 密碼欄位檢查
        checkPwd() {
            if (this.pwd === null || this.pwd === "") {
                this.pwdAlertText = "*密碼欄位未填寫";
            }
            else if (!this.pwd.match(this.pwdPattern)) {
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
                    .then(() => {
                        // window.history.go(-1);
                        this.$router.push("/")
                    });
                }
                if (data.message === "資料不正確") {
                    this.$swal(data.message, "輸入錯誤", "error");
                }
                if (data.message === "尚未註冊會員或資料錯誤或尚未生效會員") {
                    this.$swal(data.message, "資訊錯誤", "error")
                    .then(() => {
                        location.reload();
                    });
                }
            })
        },
        picFromChild(pic) {
            this.verifyPic = pic;
        },
        inputFromChild(inputCode) {
            this.validText = inputCode;
        },
        loginBtn() {
            this.picFromChild(this.verifyPic);
            this.inputFromChild(this.validText);

            // console.log(this.verifyPic)
            // console.log(this.validText)

            // 若有欄位是空
            if (this.memberId.trim() === "" 
                || this.pwd.trim() === ""
                || this.validText.trim() === "") {
                return this.$swal("注意!", "有欄位未填寫", "error");
            }

            // 驗證碼錯誤
            if (this.validText !== this.verifyPic) {
                return this.$swal("驗證碼錯誤", "請重新輸入", "error")
                .then(() => {
                    location.reload();
                }) 
            }

            // 前端檢查欄位沒問題
            if(this.idAlertText === "" &&
                this.pwdAlertText === "" ) {

                this.fetchLogin();
            }
        }
    },
    mounted() {
        
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

            <Verifycode @picToParent="picFromChild" 
            @verifyInputToParent="inputFromChild"
            />

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
        .submit-btn {
            width: 150px;
            margin: 24px 164px 6px;
            padding: 5px;
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