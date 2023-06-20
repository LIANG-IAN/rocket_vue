<!-- 前台商品頁 -->
<script>
import Checkout from "./Checkout.vue";
import axios from 'axios';
import SearchBar from '../components/SearchBar.vue';
export default {
    data() {
        return {

            // 下拉式選單
            dropdownOptions: [
                { label: '狗🐶', value: '狗' },
                { label: '貓🐱', value: '貓' },
                { label: '全部', value: '' },
            ],
            dropdownOptions2: [
                { label: '日用', value: '日用' },
                { label: '食品', value: '食品' },
                { label: '戶外', value: '戶外' },
                { label: '全部', value: '' },
            ],

            // 商品顯示
            products: [],
            currentPage: 1,          // 目前所在的頁碼
            itemsPerPage: 9,         // 每頁顯示的商品數量
            totalPages: 0,           // 總頁數
            currentSlide: 1,         // 當前的分頁索引

            //搜尋關鍵字
            strName: "",
            strCate1: "全部",
            strCate2: "全部",
            //搜尋結果
            searchResults: [],       // 顯示的商品列表
            count: 0,

            //環境變數
            findAllProductUrl: import.meta.env.VITE_FIND_ALL_PRODUCT,
            searchProductUrl: import.meta.env.VITE_SEARCH_PRODUCT,
        }

    },
    components: {
        SearchBar,
    },
    methods: {
        //取得全部商品
        getProducts() {
            axios.get(this.findAllProductUrl)
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
            this.searchResults = this.products.slice(startIndex, endIndex);
            // console.log(this.displayedProducts.length);
            this.count = this.searchResults.length;
        },
        //輪播
        setCurrentSlide(slideIndex) {
            this.currentSlide = slideIndex;
            this.updateDisplayedProducts();
        },
        //搜尋欄
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
                url: this.searchProductUrl,
                data: requestData
            })
                .then((res) => {
                    console.log(res.data.productList);
                    //恭喜我終於抓到資料了嗚嗚嗚
                    try {
                        this.searchResults = res.data.productList;
                        console.log("查詢中...");
                        this.count = this.searchResults.length;
                    } catch {
                        console.log("查詢有誤，或沒有結果!")
                    }

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

        <Checkout />

        <div class="all_title">
            <h1>商品列表</h1>
        </div>
        <div v-if="searchResults && searchResults.length > 0">
            <div class="result_count">
                <span>已顯示出 <span v-text="count"></span> 筆結果：</span>
            </div>
            <div class="products_list">
                <div class="product_card" v-for="result in searchResults">
                    <RouterLink :to="'shop_details/' + result.productId">
                        <img class=" product_img" :src="`../../public/img/productWall_img/${result.productId}-1.jpg`"
                            alt="">
                        <p class="product_Name">{{ result.productName }}</p>
                        <p class="product_price">$ {{ result.price }}</p>
                    </RouterLink>
                </div>
            </div>
            <div class="pages">
                <button v-for="index in totalPages" :key="index" @click="setCurrentSlide(index)">
                    {{ index }}
                </button>
            </div>
        </div>
        <div class="products_list" v-else>
            <span class="no_result">查無結果</span>
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

    .no_result {
        width: 200%;
        text-align: center;
        margin: auto;
        font-size: 20px;
        color: red;
    }

    .result_count {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

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
            width: 250px;
            height: 310px;
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
            margin: 16px;
            border: 2px solid #cfb7a3;
            border-radius: 20px;
            box-shadow: 0px 5px 5px #f2e9c6;
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