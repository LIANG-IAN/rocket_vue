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
        }
    }
}
</script>
<template>
    <div id="show_detail_area">
        <button class="back" @click="$router.go(-1)">
            <font-awesome-icon :icon="['fas', 'square-caret-left']" size="lg" style="color: #935743;" />
            <span> 回商品列表 </span>
        </button>
        <img id="product_img" :src="`../../public/img/productWall_img/${productId}-1.jpg`" alt="">
        <div id="details">
            <h1 id="product_name">{{ productName }}</h1>
            <hr class="hrr">
            <h3 id="product_category">商品分類：{{ category }}</h3>
            <p id="product_price">$ {{ price }}</p>
            <hr class="hrr">
            數量：<input id="quantity" type="number">
            <button id="add_cart" type="button">加入購物車 <font-awesome-icon :icon="['fas', 'cart-arrow-down']" size="lg"
                    style="color: #ffffff;" />
            </button>
            <p id="product_stock">目前庫存：{{ stock }}</p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
hr {
    border-top: 2px dashed #cfb7a3;
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
        // border: 2px solid #cfb7a3;
        // border-radius: 20px;
    }

    #details {
        margin: 20px;
        width: 40%;

        #product_name {
            font-size: 30px;
            margin: 20px 0;
        }

        #product_category,
        #product_price {
            font-size: 20px;
            margin: 20px 0;
        }

        #product_stock {
            margin: 10px 0;
        }

        #quantity {
            height: 20px;
            width: 60px;
            margin: 20px;
            transform: scale(1.5);
        }

        #add_cart {

            height: 48px;
            width: 150px;
            margin: 10px;
            border-radius: 10px;
            font-size: 18px;
            border: none;
            background-color: #995a25;
            color: white;

            &:hover {
                scale: 1.01;
                background-color: #b86c2e;
            }
        }
    }
}


@media (max-width: 600px) {
    #show_detail_area {
        display: block;

        #product_img {
            margin: 20px;
            height: 60%;
            width: 80%;
            // border: 2px solid #cfb7a3;
            // border-radius: 20px;
        }

        #details {
            margin: 20px;
            width: 80%;
        }
    }
}
</style>