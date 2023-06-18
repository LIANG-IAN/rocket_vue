<script>
import axios from "axios";

export default {
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
            return this.products.slice(0, 3);
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
    <div>
        <h1>商品首頁(後台)</h1>
        <!-- 卡片輪播 -->

        <!-- 最新商品top5 -->
        <div v-for="product in products" :key="product.product_id">{{ product }}</div>
    </div>
</template>


<style lang="scss" scoped></style>