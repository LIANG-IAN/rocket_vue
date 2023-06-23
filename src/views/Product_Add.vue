<script>
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            //新增商品資料
            newProductName: "",
            category: [],
            newCategory: "",
            newPrice: 0,
            newStock: 0,
            newImgUrl: "",
            newProductId: 0,
            base64Body: [],

            //環境變數API
            AddProductUrl: import.meta.env.VITE_ADD_PRODUCT,
            UploadImgUrl: import.meta.env.VITE_UPLOAD_IMG,
        }
    },
    methods: {
        addProductAndUploadPhoto() {
            console.log("點了新增商品及上傳照片按鈕!");
            this.newCategory = this.category.join(",")
            console.log(this.newCategory)

            const requestData = {
                "product_name": this.newProductName,
                "category": this.newCategory,
                "price": this.newPrice,
                "stock": this.newStock,
            }
            // 新增檔案
            axios({
                method: 'post',
                url: this.AddProductUrl,
                data: requestData
            })
                .then((res) => {
                    console.log(res);
                    this.newProductId = res.data.product.productId;

                    //存下圖片
                    const uploadImgData = {
                        imgBase64: this.newImgUrl.split(",")[1],
                        sort: "s",
                        id: this.newProductId,
                    };

                    //呼叫後端!
                    console.log(uploadImgData);
                    axios({
                        method: 'post',
                        url: this.UploadImgUrl,
                        data: uploadImgData
                    }).then((res) => {
                        console.log(res);
                        console.log("相片新增成功，請確認資料夾!");
                    })

                    //跳出成功訊息
                    this.$swal({
                        icon: 'success',
                        title: '商品新增成功!',
                        imageUrl: this.newImgUrl,
                        imageHeight: 300,
                        imageAlt: '商品圖片',
                        html: `   
                            <hr style="border-top: 2px dashed #cfb7a3;margin: 20px 0;">    
                            <h2 class="show_result" style="font-size: 30px;">【商品資訊】</h2>
                            <div style="margin:20px;">
                                <h2 >商品編號：<span>${this.newProductId}</span></h2>
                                <h2>商品名稱：<span>${this.newProductName}</span></h2>
                                <h2>商品分類：<span>${this.newCategory}</span></h2>
                                <h2>商品價格：<span>${this.newPrice}</span></h2>
                                <h2>目前庫存：<span>${this.newStock}</span></h2>
                            </div>
                        `,
                        showCancelButton: true,
                        cancelButtonText: '新增下一個商品',
                        showConfirmButton: true,
                        cancelButtonColor: '#d1a700',
                        confirmButtonText: '檢視新增的資訊',
                        confirmButtonColor: '#995a25',
                        customClass: {
                            cancelButton: 'swal_cancelbutton',
                        },

                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.$router.push('/product_details/' + this.newProductId);
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                            // 新增下一個商品(刷新頁面)
                            this.$router.go(0);
                        }
                    });
                })
                .catch(error => {
                    console.error(error);
                    console.log("錯誤!");
                    this.$swal({
                        icon: 'error',
                        title: '新增失敗，請確認商品資訊!',
                        showConfirmButton: true,
                    })
                });
        },
        uploadPhoto() {
            console.log("按下了選擇圖片~")
            const fileInput = document.getElementById('fileInput');
            const selectedFile = fileInput.files[0];

            if (!selectedFile) {
                console.error("請選擇一個文件");
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);

            const vm = this; // 將this保存到vm變量中

            reader.onload = function (e) {
                vm.newImgUrl = e.target.result; // 使用vm設置newImgUrl的值
                console.log("圖片的Base64編碼:", vm.newImgUrl);
            }

        },
        // 上傳圖片
        // uploadPhoto(element) {
        //     const img = element.target.files[0];
        //     const reader = new FileReader();
        //     reader.readAsDataURL(img);
        //     const vm = this;
        //     reader.onload = function (e) {
        //         const imgDataUrl = e.target.result;
        //         const base64 = {
        //             imgBase64: imgDataUrl.split(",")[1],
        //             sort: "a",
        //             id: vm.filesPic,
        //         };
        //         vm.base64Body.push(base64);
        //     };
        // },
        // // 送出照片資料至後端
        // sendPhoto(photos) {
        //     for (const e of photos) {
        //         axios.post(this.UploadImgUrl, e).then(() => console.log("照片送出成功"))
        //     }
        // },
    }
}
</script>
<template>
    <div id="show_detail_area">
        <button class="back" @click="$router.go(-1)">
            <font-awesome-icon :icon="['fas', 'square-caret-left']" size="lg" style="color: #935743;" />
            <span> 回上一頁 </span>
        </button>

        <button class="confirmAddProduct" @click="addProductAndUploadPhoto">
            <span> 確認新增商品 </span>
            <font-awesome-icon :icon="['fas', 'square-plus']" size="lg" style="color: #995a25;" />
        </button>


        <!-- 記得製作新增照片的功能/0620 -->
        <div class="img_area">
            <label class="upload_img_lab">
                <input type="file" id="fileInput" name="upload_img" accept="image/png, image/jpeg" />
            </label>
            <button id="confirmUpload" type="button" @click="uploadPhoto">顯示圖片</button>
            <img :src="newImgUrl" id="show_img" alt="上傳圖片">
        </div>

        <div class="details">
            <h3>請輸入新商品名稱：<span class="notice">※請勿空白</span></h3>
            <input type="text" placeholder="新商品名" v-model="newProductName">
            <hr>
            <div class="categories">
                <h3>適用動物：</h3>
                <input type="checkbox" id="dog" value="貓" v-model="category" />
                <label for="dog">
                    <h3>貓🐱</h3>
                </label>
                <input type="checkbox" id="cat" value="狗" v-model="category" />
                <label for="cat">
                    <h3>狗🐶</h3>
                </label>
            </div>
            <div class="categories">
                <h4>分類：</h4>
                <input type="checkbox" id="daily" value="日用" v-model="category" />
                <label for="daily">
                    <h3>日用</h3>
                </label>

                <input type="checkbox" id="food" value="食品" v-model="category" />
                <label for="food">
                    <h3>食品</h3>
                </label>

                <input type="checkbox" id="outdoor" value="戶外" v-model="category" />
                <label for="outdoor">
                    <h3>戶外</h3>
                </label>
            </div>
            <hr>
            <h3>請輸入新價格：<span class="notice">※價格請勿輸入0或負數</span></h3>
            <input type="number" placeholder="價格" min="1" step="1" v-model="newPrice">
            <hr>
            <h3>請輸入目前庫存：<span class="notice">※庫存請勿輸入負數</span></h3>
            <input type="number" placeholder="目前庫存" min="0" step="1" v-model="newStock" id="stock_input">
        </div>
    </div>
</template>
<style lang="scss" scoped>
hr {
    border-top: 2px dashed #cfb7a3;
    margin: 20px 0;
}

a {
    color: black;
}

#show_detail_area {
    width: 80%;
    margin: 50px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #cfb7a3;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0px 5px 5px #f2e9c6;
    position: relative;

    .back {
        background-color: transparent;
        font-size: 24px;
        margin: 30px;
        position: absolute;
        top: -70px;
        left: 0;
        border: none;
    }

    .confirmAddProduct {
        background-color: transparent;
        font-size: 24px;
        margin: 30px;
        position: absolute;
        top: -70px;
        right: 0;
        border: none;
    }

    // <div class="img_area">
    //    <img :src="newImgUrl" id="show_img" alt="上傳圖片">
    //    <label class="upload_img_lab">
    //       <input type="file" id="fileInput" name="upload_img" accept="image/png, image/jpeg" />
    //    </label>
    //    <button id="confirmUpload" type="button" @click="uploadPhoto">顯示圖片</button>
    // </div>
    .img_area {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 50%;

        .upload_img_lab,
        #confirmUpload {
            font-size: 16px;
            margin: 10px 0;
        }

        #show_img {
            margin: 20px;
            height: 70%;
            width: 70%;
            background-color: #fbddc5;
            border: 2px dashed #cfb7a3;
        }

    }

    .details {
        line-height: 25px;
        margin: 20px;
        width: 50%;
        font-size: 18px;

        input {
            line-height: 30px;
        }

        input[type='checkbox'] {
            font-size: 30px;
            width: 20px;
            margin-left: 20px;
        }

        input[type='text'],
        input[type='number'] {
            width: 80%;
            padding-left: 10px;
        }

        .categories {
            display: flex;

            label {
                margin-right: 0px 20px;
            }
        }

        #product_name,
        #product_category,
        #product_price,
        #product_stock {
            font-size: 20px;
            line-height: 50px;
            margin: 20px 10px;
        }

        #selectorr {
            option {
                font-size: 16px;
                width: 250px;
                padding: 10px;
                text-align: center;
            }
        }
    }

    .notice {
        font-size: 14px;
        margin-left: 10px;
        color: #995a25;
    }

    #stock_input {
        margin-bottom: 50px;
    }
}

// 響應式
@media (max-width: 600px) {

    hr {
        width: 90%;
    }

    #show_detail_area {
        display: block;

        .img_area {
            flex-direction: column;
            width: 100%;
        }

        .details {
            width: 100%;
        }
    }


}
</style>