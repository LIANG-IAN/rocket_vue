<script>
import axios from "axios";

import SearchBar from "../components/SearchBar.vue"

export default {
    components: {
        SearchBar,
    },
    data() {
        return {
            products: [],
        }
    },
    mounted() {
        this.getProducts();
    },
    computed: {
        displayedProducts() {
            // 只顯示前N個
            return this.products.slice(0, 5);
        },
    },
    methods: {
        getProducts() {
            axios.get('http://localhost:8080/find_all')
                .then(response => {
                    this.products = response.data;
                    console.log(this.products)
                })
                .catch(error => {
                    console.error(error);
                    console.log("錯誤!")
                });
        }
    }
}
</script>

<template>
    <div class="product_main">
        <h1>商品首頁(後台)</h1>
        <!-- 搜尋欄 -->
        <SearchBar />

    </div>
</template>


<style lang="scss" scoped>
.product_main {
    background-color: #f2e9c6;
}
</style>