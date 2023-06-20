<script>
import axios from 'axios';
export default {
    data() {
        return {
            productName: "",
            category: "",
            price: 0,
            stock: 0,

            //環境變數API
            AddProductUrl: import.meta.env.VITE_ADD_PRODUCT,
        }
    },
    mounted() {
    },
    methods: {
        addProduct() {
            const requestData = {
                product_name: this.productName,
                category: this.category,
                price: this.price,
                stock: this.stock,
            }

            axios({
                method: 'post',
                url: this.AddProductUrl,
                data: requestData
            })
                .then((res) => {
                    console.log(res.data);

                })
                .catch(error => {
                    console.error(error);
                    console.log("錯誤!");
                });
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

        <!-- 製作新增照片的功能0620 -->

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
// @media (max-width: 600px) {
// }
</style>