<script>
export default {
    data() {
        return {
            validText: "",
            verifyAlert: "",

            // isValid: false,

            // 驗證碼建構
            options: {
                canvasId: "authCode",/**canvas的id*/
                txt: "",/**傳入驗證碼內容*/
                height: 50,/**驗證碼高度 */
                width: 200,/**驗證碼寬度 */
                fontColor1: 0,/**隨機生成字型顏色*/
                fontColor2: 50,
                bgColor1: 180,/**這個範圍的顏色作背景看起來清晰一些*/
                bgColor2: 255,
                fontStyle: "24px SimHei",
            },
            helper: "",
        }
    },
    methods: {
        changePicBtn() {
            this.options.txt = this.randomNum(1000, 9999).toString();
            this.helper = this.writeAuthCode(this.options);
            this.validText = "";
            this.verifyAlert = "";

            this.$emit("picToParent", this.options.txt)
        },
        verifyInputToParent() {
            this.$emit("verifyInputToParent", this.validText)
        },
        writeAuthCode(options) {
            this.options = options;
            let canvas = document.getElementById(options.canvasId);
            canvas.width = options.width || 300;
            canvas.height = options.height || 150;
            let ctx = canvas.getContext("2d");/**建立一個canvas物件*/
            ctx.textBaseline = "middle";
            ctx.fillStyle = this.randomColor(options.bgColor1, options.bgColor2);
            ctx.fillRect(0, 0, options.width, options.height);

            for (let i = 0; i < options.txt.length; i++) {
                let txt = options.txt.charAt(i);/**讓每個字不一樣*/
                ctx.font = options.fontStyle;
                ctx.fillStyle = this.randomColor(options.fontColor1, options.fontColor2);
                ctx.shadowOffsetY = this.randomNum(-3, 3);
                ctx.shadowBlur = this.randomNum(-3, 3);
                ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
                let x = (options.width / (options.txt.length + 1)) * (i + 1);
                let y = options.height / 2;
                let deg = this.randomNum(-30, 30);
                /**設定旋轉角度和座標原點*/
                ctx.translate(x, y);
                ctx.rotate(deg * Math.PI / 180);
                ctx.fillText(txt, 0, 0);
                /**恢復旋轉角度和座標原點*/
                ctx.rotate(-deg * Math.PI / 180);
                ctx.translate(-x, -y);
            }

            /**1~4條隨機干擾線隨機出現*/
            for (let j = 0; j < this.randomNum(1, 4); j++) {
                ctx.strokeStyle = this.randomColor(40, 180);
                ctx.beginPath();
                ctx.moveTo(this.randomNum(0, options.width), this.randomNum(0, options.height));
                ctx.lineTo(this.randomNum(0, options.width), this.randomNum(0, options.height));
                ctx.stroke();
            }
            /**繪製干擾點*/
            for (let k = 0; k < this.options.width / 6; k++) {
                ctx.fillStyle = this.randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(this.randomNum(0, options.width), this.randomNum(0, options.height), 1, 0, 2 * Math.PI);
                ctx.fill();
            }
            this.validate = function(code) {
                return this.options.txt === code;
            };
        },
        /**隨機數字**/
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        /**隨機顏色**/
        randomColor(min, max) {
            let r = this.randomNum(min, max);
            let g = this.randomNum(min, max);
            let b = this.randomNum(min, max);
            return "rgb(" + r + "," + g + "," + b + ")";
        },
    },
    mounted() {
        this.changePicBtn()
    }
}
</script>

<template>
    <div class="input-block">
        <div class="verify-pic">
            <canvas class="verify-canva" :id="options.canvasId"></canvas>
            <button type="button" class="verify-btn" @click="changePicBtn">換圖</button>
        </div>
        <div class="verify-input">
            <input v-model="validText" @blur="verifyInputToParent" type="text" placeholder="請輸入驗證碼" />
            <p>{{ verifyAlert }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
</style>