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
            axios.post('http://localhost:8080/find_one', this.productId, {
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
        <img id="product_img" :src="`../../public/img/productWall_img/pruductWall_${productId}.jpg`" alt="">
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
#show_detail_area {
    width: 80%;
    margin: 50px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #cfb7a3;
    border-radius: 20px;
    background-color: #fff;

    #product_img {
        margin: 20px;
        height: 360px;
        width: 360px;
        // border: 2px solid #cfb7a3;
        // border-radius: 20px;
    }

    #details {
        margin: 20px;

        .hrr {
            border: none;
            /* 移除預設的邊框 */
            height: 2px;
            /* 設置分隔線的高度 */
            background-color: #cfb7a3;
        }

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
</style>