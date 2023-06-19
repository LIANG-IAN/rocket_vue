<script>
export default {
    components: {
    },
    data() {
        return {
            memberId: "",
            pwd: "",
            memberName: "",
            phone: "",
            birth: "",

            idAlertText: "",
            pwdAlertText: "",
            nameAlertText: "",
            phoneAlertText: "",
            birthAlertText: "",

            idPattern: "^[A-Z][1-2]\\d{8}$",
            pwdPattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\S]{8,12}$",
            phonePattern: "^09\\d{8}$",

            today: new Date(),
            maxDate: new Date().toISOString().split('T')[0],
            date: "",

            signupBody: null
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
        // 姓名欄位檢查
        checkMemberName() {
            if(this.memberName === null || this.memberName === "") {
                this.nameAlertText = "*姓名欄位未填寫";
            }
            else {
                this.nameAlertText = "";
            }   
        },
        // 手機欄位檢查
        checkPhone() {
        if(this.phone === null || this.phone === "") {
            this.phoneAlertText = "*手機欄位未填寫";
        }
        else if (!this.phone.match(this.phonePattern)) {
            this.phoneAlertText = "*手機格式錯誤";
        }
        else {
            this.phoneAlertText = "";
        }
        },
        // 生日欄位檢查
        checkBirthday() {
            // 解析日期字串為日期物件
            this.date = new Date(this.birth);
            
            if (this.date.getFullYear() < 1900 
            || this.date.getFullYear() > this.today.getFullYear()) {
                this.birthAlertText = "*生日無效";
            }
            else if(this.birth === null || this.birth === "") {
                this.birthAlertText = "*生日欄位未填寫";
            }
            else {
                this.birthAlertText = "";
            }
        },
        fetchSignup() {
            this.signupBody = {
                member_id: this.memberId,
                password: this.pwd,
                member_name: this.memberName,
                phone: this.phone,
                birthday: this.birth
            }
            fetch("http://localhost:8080/sign_up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(this.signupBody),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                // 跳出提醒視窗
                if (data.message === "註冊成功") {
                    this.$swal(data.message, "註冊成功", "success")
                    .then(() => {
                        this.$router.push("/loginSignup/login")
                    });
                }
                else if (data.message === "已註冊會員") {
                    this.$swal(data.message, "已註冊會員，請直接登入", "error")
                    .then(() => {
                        this.$router.push("/loginSignup/login")
                    });
                }
                else if (data.message === "資料不正確") {
                    this.$swal(data.message, "輸入錯誤", "error");
                }
            })
        },
        signupBtn() {
            // 若有欄位是空
            if (this.memberId.trim() === "" 
                || this.pwd.trim() === ""
                || this.memberName.trim() === ""
                || this.phone.trim() === ""
                || this.birth.trim() === "") {
                return this.$swal("注意!", "有欄位未填寫", "error");
            }
            // 前端檢查欄位沒問題
            if(this.idAlertText === "" &&
                this.pwdAlertText === "" &&
                this.nameAlertText === "" &&
                this.phoneAlertText === "" &&
                this.birthAlertText === "") {

                this.fetchSignup();
            }
        }
    },
    mounted() {
        
    }
}
</script>

<template>
    <div class="signup-wrap">
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
                <p class="alert-text" >{{ pwdAlertText }}</p>
            </div>
            <div class="form-item">
                <div class="input-box">
                    <label for="memberName">姓名</label>
                    <input v-model="memberName" @blur="checkMemberName" autocomplete="off" type="text" placeholder="請輸入真實姓名" pattern="" required>
                </div>
                <p class="alert-text">{{ nameAlertText }}</p>
            </div>
            <div class="form-item">
                <div class="input-box">
                    <label for="phone">手機</label>
                    <input v-model="phone" @blur="checkPhone" autocomplete="off" type="tel" placeholder="0912345678" pattern="^09\\d{8}$" required>
                </div>
                <p class="alert-text">{{ phoneAlertText }}</p>
            </div>
            <div class="form-item">
                <div class="input-box">
                    <label for="birth">生日</label>
                    <input v-model="birth" @blur="checkBirthday" autocomplete="off" type="date" min="1900-01-01" :max="maxDate" placeholder="yyyy/mm/dd" required>
                </div>   
                <p class="alert-text">{{ birthAlertText }}</p>
            </div>  
            <button @click="signupBtn" type="button" class="submit-btn" id="signupBtn">註冊</button>              
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