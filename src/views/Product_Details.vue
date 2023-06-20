<script>
import axios from 'axios';
export default {
    data() {
        return {
            productId: null,
            productName: null,
            category: null,
            price: 0,
            stock: 0,


            //環境變數API
            findOneProductUrl: import.meta.env.VITE_FIND_ONE_PRODUCT,
            updateProductNameUrl: import.meta.env.VITE_UPDATE_PRODUCT_NAME,
            updateProductCategoryUrl: import.meta.env.VITE_UPDATE_PRODUCT_CATEGORY,
            updateProductPriceUrl: import.meta.env.VITE_UPDATE_PRODUCT_PRICE,
            updateProductStockUrl: import.meta.env.VITE_UPDATE_PRODUCT_STOCK,
        }
    },
    mounted() {
        // 獲取動態路由參數的值
        this.productId = this.$route.params.productId;
        // console.log(this.productId); // 確認是否正確顯示商品 ID

        // 根據商品ID進行相應的操作或發送請求
        this.findProducts();
    },
    methods: {
        findProducts() {
            // console.log(this.productId)
            axios.post(this.findOneProductUrl, this.productId, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    this.productId = data.product.productId;
                    this.productName = data.product.productName;
                    this.category = data.product.category;
                    this.price = data.product.price;
                    this.stock = data.product.stock;
                })
                .catch(error => {
                    // 報錯時要做的事情
                    console.error('錯誤:', error);
                });
        },
        changeProductName() {
            this.$swal({
                title: '修改品名',
                html: `原品名：${this.productName}`,
                input: 'text',
                inputPlaceholder: '請輸入新品名',
                showCloseButton: true,
                showDenyButton: true,
                showConfirmButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    const inputtext = this.$swal.getInput().value;
                    const requestData = {
                        product_id: this.productId,
                        product_name: inputtext,
                    }
                    // console.log(requestData);
                    axios({
                        method: 'post',
                        url: this.updateProductNameUrl,
                        data: requestData
                    })
                        .then((res) => {
                            console.log(res.data);

                        })
                        .catch(error => {
                            console.error(error);
                            console.log("錯誤!");
                        });
                    //刷新頁面用
                    this.$router.go(0);
                } else if (result.isDenied) {
                    this.$swal('無變更', '', 'error')
                }
            })
        },
        changeCategory() {
            this.$swal({
                title: '修改分類',
                html: `原分類：${this.category}`,
                input: 'text',
                inputPlaceholder: '請輸入新分類，用","分隔，無空格',
                showCloseButton: true,
                showDenyButton: true,
                showConfirmButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    const inputtext = this.$swal.getInput().value;
                    const requestData = {
                        product_id: this.productId,
                        category: inputtext,
                    }
                    // console.log(requestData);
                    axios({
                        method: 'post',
                        url: this.updateProductCategoryUrl,
                        data: requestData
                    })
                        .then((res) => {
                            console.log(res.data);

                        })
                        .catch(error => {
                            console.error(error);
                            console.log("錯誤!");
                        });
                    //刷新頁面用
                    this.$router.go(0);
                } else if (result.isDenied) {
                    this.$swal('無變更', '', 'error')
                }
            })
        },
        changePrice() {
            this.$swal({
                title: '修改價格',
                html: `原價格：${this.price}`,
                input: 'number',
                inputPlaceholder: '不可為零或負數',
                showCloseButton: true,
                showDenyButton: true,
                showConfirmButton: true,
                inputAttributes: {
                    min: 1,
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const inputtext = this.$swal.getInput().value;
                    const requestData = {
                        product_id: this.productId,
                        price: inputtext,
                    }
                    // console.log(requestData);
                    axios({
                        method: 'post',
                        url: this.updateProductPriceUrl,
                        data: requestData
                    })
                        .then((res) => {
                            console.log(res.data);

                        })
                        .catch(error => {
                            console.error(error);
                            console.log("錯誤!");
                        });
                    //刷新頁面用
                    this.$router.go(0);
                } else if (result.isDenied) {
                    this.$swal('無變更', '', 'error')
                }
            })
        },
        changeStock() {
            this.$swal({
                title: '修改庫存',
                html: `原庫存：${this.stock}`,
                input: 'number',
                inputPlaceholder: '不可為負數',
                showCloseButton: true,
                showDenyButton: true,
                showConfirmButton: true,
                inputAttributes: {
                    min: 0,
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const inputtext = this.$swal.getInput().value;
                    const requestData = {
                        product_id: this.productId,
                        stock: inputtext,
                    }
                    // console.log(requestData);
                    axios({
                        method: 'post',
                        url: this.updateProductStockUrl,
                        data: requestData
                    })
                        .then((res) => {
                            console.log(res.data);

                        })
                        .catch(error => {
                            console.error(error);
                            console.log("錯誤!");
                        });
                    //刷新頁面用
                    this.$router.go(0);
                } else if (result.isDenied) {
                    this.$swal('無變更', '', 'error')
                }
            })
        },
    },
}
</script>
<template>
    <div id="show_detail_area">
        <button class="back" @click="$router.go(-1)">
            <font-awesome-icon :icon="['fas', 'square-caret-left']" size="lg" style="color: #935743;" />
            <span> 回商品總覽 </span>
        </button>
        <img id="product_img" :src="`../../public/img/productWall_img/${productId}-1.jpg`" alt="">
        <div id="details">
            <font-awesome-icon :icon="['fas', 'pen-to-square']" size="lg" style="color: #995a25;"
                @click="changeProductName" />
            <span id="product_name">品名：{{ productName }}</span>
            <hr>
            <font-awesome-icon :icon="['fas', 'pen-to-square']" size="lg" style="color: #995a25;" @click="changeCategory" />
            <span id="product_category">分類：{{ category }}</span>
            <hr>
            <font-awesome-icon :icon="['fas', 'pen-to-square']" size="lg" style="color: #995a25;" @click="changePrice" />
            <span id="product_price">售價：$ {{ price }}</span>
            <hr>
            <font-awesome-icon :icon="['fas', 'pen-to-square']" size="lg" style="color: #995a25;" @click="changeStock" />
            <span id="product_stock">目前庫存：{{ stock }}</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
hr {
    border-top: 2px dashed #cfb7a3;
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

    #product_img {
        margin: 20px;
        height: 40%;
        width: 40%;
        border: 2px dashed #cfb7a3;
    }

    #details {
        margin: 20px;
        width: 50%;
        line-height: 50px;

        #product_name,
        #product_category,
        #product_price,
        #product_stock {
            font-size: 20px;
            margin: 20px 20px;
        }
    }
}

//響應式
@media (max-width: 600px) {
    #show_detail_area {
        display: block;
        /* 或者其他適當的 display 屬性值 */

        #product_img {
            margin: 20px;
            height: 80%;
            width: 80%;
            border: 2px dashed #cfb7a3;
        }

        #details {
            margin: 20px;
            width: 80%;
        }
    }
}
</style>