<!-- 前台商品頁 -->
<script>
import axios from 'axios';
import SearchBar from '../components/SearchBar.vue';
export default {
    data() {
        return {
            // 下拉式選單
            dropdownOptions: [
                { label: '狗🐶', value: '狗' },
                { label: '貓🐱', value: '貓' },
            ],
            dropdownOptions2: [
                { label: '日用', value: '日用' },
                { label: '食品', value: '食品' },
                { label: '戶外', value: '戶外' },
            ],
            // 商品顯示
            products: [],
            currentPage: 1,          // 目前所在的頁碼
            itemsPerPage: 9,         // 每頁顯示的商品數量
            totalPages: 0,           // 總頁數
            displayedProducts: [],   // 顯示的商品列表
            currentSlide: 1,         // 當前的輪播分頁索引
            //搜尋關鍵字
            strName: null,
            strCate1: null,
            strCate2: null,
        }

    },
    components: {
        SearchBar,
    },
    methods: {
        //取得全部商品
        getProducts() {
            axios.get('http://localhost:8080/find_all_product')
                .then(response => {
                    this.products = response.data.productList.reverse();
                    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
                    this.updateDisplayedProducts();
                })
                .catch(error => {
                    console.error(error);
                    console.log("錯誤!");
                });
        },
        // 更新顯示的商品
        updateDisplayedProducts() {
            const startIndex = (this.currentSlide - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            this.displayedProducts = this.products.slice(startIndex, endIndex);
        },
        setCurrentSlide(slideIndex) {
            this.currentSlide = slideIndex;
            this.updateDisplayedProducts();
        },
        searchPushResult(searchData) {
            // console.dir(searchData)
            this.strName = searchData.searchInput;
            this.strCate1 = searchData.searchCate1;
            this.strCate2 = searchData.searchCate2;
            console.log(this.strName);
            console.log(this.strCate1);
            console.log(this.strCate2);

            const requestData = {
                strName: this.strName,
                strCate: this.strCate1,
                strCate2: this.strCate2
            }

            axios({
                method: 'post',
                url: 'http://localhost:8080/search_by_name_and_categories',
                data: requestData
            })
                .then((res) => {
                    console.log(res.data.productList);
                    //恭喜我終於抓到資料了嗚嗚嗚
                })
                .catch(error => {
                    console.error(error);
                    console.log("錯誤!");
                });

        }
    },
    mounted() {
        // 取得商品數據
        this.getProducts();

        // 更新顯示的商品
        this.updateDisplayedProducts();
    },
    watch: {
        // 頁碼改變時，呼叫方法更新顯示的商品
        currentPage(newPage) {
            // 確保頁碼在有效範圍內
            if (newPage < 1) {
                this.currentPage = 1;
            } else if (newPage > this.totalPages) {
                this.currentPage = this.totalPages;
            } else {
                this.updateDisplayedProducts();
            }
        },
    },
}
</script>

<template>
    <div class="shop_all_main">
        <!-- 搜尋欄 -->
        <SearchBar :dropdownOptions="dropdownOptions" :dropdownOptions2="dropdownOptions2" @pushResult="searchPushResult" />


        <div class="all_title">
            <h1>所有商品</h1>
        </div>

        <div class="products_list" v-if="products.length > 0">
            <div class="product_card" v-for="product in displayedProducts" :key="product.product_id">
                <RouterLink :to="'shop_details/' + product.productId">
                    <img class=" product_img" :src="`../../public/img/productWall_img/pruductWall_${product.productId}.jpg`"
                        alt="">
                    <p class="product_Name">{{ product.productName }}</p>
                    <p class="product_price">$ {{ product.price }}</p>
                    <!-- <button class="add_cart" type="button" :data-productid="product.productId"><font-awesome-icon
                            :icon="['fas', 'info']" size="xl" style="color: #995a25;" /></button> -->
                </RouterLink>
            </div>
        </div>

        <div class="pages">
            <button v-for="index in totalPages" :key="index" @click="setCurrentSlide(index)">
                {{ index }}
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
a {
    color: black;
}

.shop_all_main {
    width: 80%;
    margin: 0 auto;
    background-color: #fff;
    padding-bottom: 100px;

    .all_title {
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
        grid-template-columns: repeat(auto-fill, 285px);
        grid-gap: 10px;
        // flex-wrap: wrap;


        .product_card {
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
            width: 250px;
            height: 280px;
            border: 2px solid #cfb7a3;
            border-radius: 20px;
            margin: 16px;
            position: relative;

            .product_img {
                width: 200px;
                height: 200px;
                margin: 20px;
                border-radius: 10px;
                background-color: #979797;
            }

            .product_Name {
                font-size: 20px;
                margin: 0 20px;
            }

            .product_price {
                font-size: 14px;
                position: absolute;
                bottom: 10px;
                right: 20px;
                margin: 10px;

            }

            // .add_cart {
            //     height: 40px;
            //     width: 40px;
            //     border-radius: 50px;
            //     position: absolute;
            //     bottom: 20px;
            //     right: 20px;
            //     border: 2px solid #cfb7a3;
            //     background-color: #edd76a;
            // }

        }
    }

    .pages {
        display: flex;
        justify-content: center;
        align-items: center;

        button {
            height: 50px;
            width: 50px;
            margin: 10px;
            background-color: #edd76a;
            text-align: center;
            border: 2px solid #cfb7a3;

            &:hover {
                background-color: #ffe873;
            }
        }
    }
}
</style>