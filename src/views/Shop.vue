<!-- 商品首頁 -->
<script>
import axios from 'axios';

export default {
    data() {
        return {
            products: [],
            reverseProducts: [],
            images: [
                "../../public/img/carouselImg/cat_can_1.png",
                "../../public/img/carouselImg/pet_car_1.png",
                "../../public/img/carouselImg/pet_nailcut_1.png"
            ],
            currentIndex: 0,
        }
    },
    computed: {
        // 取得當前圖片的路徑
        currentImage() {
            return this.images[this.currentIndex];
        },
        // 只顯示最新的前 11 個商品
        displayedProducts() {
            return this.products.slice().reverse().slice(0, 11);
        },
    },
    mounted() {
        // 圖片輪播：每 3 秒自動切換到下一張圖片
        setInterval(this.nextSlide, 5000);

        // 取得商品數據
        this.getProducts();
    },
    methods: {
        // 圖片輪播
        previousSlide() {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        },
        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        },
        getProducts() {
            axios.get('http://localhost:8080/find_all_product')
                .then(response => {
                    // console.log(response.data.productList);
                    this.products = response.data.productList;
                    this.reverseProducts = this.displayedProducts;
                    console.log(this.reverseProducts);
                })
                .catch(error => {
                    console.error(error);
                    console.log("錯誤!");
                });
        }
    }


}
</script>

<template>
    <div class="shop_main">

        <!-- 卡片輪播 -->
        <div class="slideshow">
            <button class="prev_button" @click="previousSlide">&#10094;</button>
            <img :src="currentImage" alt="Slideshow Image" class="slide" />
            <button class="next_button" @click="nextSlide">&#10095;</button>
        </div>

        <!-- 最新商品top12 -->
        <div class="new_arrival_title">
            <h1>最新商品</h1>
        </div>
        <div class="products_list" v-if="products.length > 0">
            <div class="product_card" v-for=" product in reverseProducts" :key="product.product_id">
                <RouterLink :to="'shop_details/' + product.productId">
                    <img class=" product_img" :src="`../../public/img/productWall_img/pruductWall_${product.productId}.jpg`"
                        alt="">
                    <p class="product_Name">{{ product.productName }}</p>
                    <p class="product_price"> $ {{ product.price }}</p>
                    <!-- <button class="add_cart" type="button" :data-productid="product.productId">🛒</button> -->
                </RouterLink>
            </div>
            <RouterLink to="/shop_all" class="link">
                <div class="product_card_last">查看全部商品</div>
            </RouterLink>

        </div>
    </div>
</template>


<style lang="scss" scoped>
a {
    color: black;
}

.shop_main {
    width: 80%;
    margin: 0 auto;
    background-color: #fff;
    padding-bottom: 100px;


    //圖片輪播
    .slideshow {
        width: 100%;
        overflow: hidden;
        position: relative;

        .slide {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease-in-out;
        }

        .prev_button,
        .next_button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 24px;
            background: none;
            border: none;
            cursor: pointer;
            color: #000;

            &:hover {
                scale: 1.05;
                color: white;
            }

            &:active {
                scale: 1;
            }
        }

        .prev_button {
            left: 10px;
        }

        .next_button {
            right: 10px;
        }
    }

    .new_arrival_title {
        display: flex;
        justify-content: center;
        align-items: center;
        // width: 200px;
        border-radius: 50px;
        padding: 20px;
        margin: 50px 100px 20px 100px;
        font-size: 32px;
        background-color: #edd76a;
    }

    .products_list {
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(auto-fill, 300px);
        grid-gap: 5px;
        margin: auto;
        // flex-wrap: wrap;


        .product_card {
            width: 250px;
            height: 280px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 20px;
            align-items: center;
            border: 2px solid #cfb7a3;
            border-radius: 20px;
            box-shadow: 0px 5px 5px #f2e9c6;
            position: relative;

            .product_img {
                width: 200px;
                height: 200px;
                background-color: #979797;
            }

            .product_Name {
                font-size: 24px;
                margin: 10px;
            }

            .product_price {
                font-size: 14px;
                position: absolute;
                bottom: 10px;
                right: 10px;
                margin: 10px;

            }

            // .add_cart {
            //     border-radius: 50px;
            //     position: absolute;
            //     bottom: 20px;
            //     right: 20px;
            //     border: 2px solid #cfb7a3;
            //     background-color: #edd76a;
            // }

        }

        .product_card_last {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 250px;
            height: 280px;
            border: 2px solid #cfb7a3;
            background-color: #edd76a;
            border-radius: 20px;
            margin: 16px;
            font-weight: 500;
            font-size: 24px;
            color: #000;

            &:hover {
                scale: 1.01;
                background-color: #edd352;
                transition: 0.3s;
            }
        }


    }
}
</style>
