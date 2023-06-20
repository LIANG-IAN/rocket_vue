<script>
import axios from 'axios';

export default {
    data() {
        return {
            cartList: [],
            shoppingCartMap: {},
            selectedProducts: [],
        };
    },
    methods: {
        fetchCartData() {
            const cartData = {
                member: {
                    memberId: "E123456789",
                },
            };

            axios
                .post("http://localhost:8080/findMemberCart", cartData)
                .then((response) => {
                    const data = response.data;
                    this.cartList = data.cartList;
                    this.shoppingCartMap = JSON.parse(data.message);
                })
                .catch((error) => {
                    console.log("An error occurred:", error);
                });
        },
        sendOrder() {
            const requestData = {
                member: {
                    memberId: "E123456789"
                },
                productId: this.selectedProducts,
                sales: this.selectedProducts.map(
                    (productId) => this.shoppingCartMap[productId]
                ),
            };

            axios
                .post("http://localhost:8080/checkout", requestData)
                .then((response) => {
                    const data = response.data;
                    alert(data.message);
                })
                .catch((error) => {
                    console.log("An error occurred:", error);
                });
        },
    },
    mounted() {
        this.fetchCartData();
    },
};

</script>

<template>
    <div class="product">
        <div class="info">
            <div v-for="item in cartList" :key="item.productId"
                class="product_bg">
                <input type="checkbox" v-model="selectedProducts" :value="item.productId" :id="'product' + item.productId"
                    name="products">
                <div class="img">
                    <img class="product_img w-100 h-100"
                        :src="`../../public/img/productWall_img/pruductWall_${item.productId}.jpg`" alt="">
                </div>
                <div class="name">
                    <div class="d">
                        <p class="bg-white rounded-md p-1 mx-1 mb-2">名稱：<span id="product_show_name">{{ item.productName
                        }}</span></p>
                    </div>
                    <div class="quantity" name="sales" id="w">
                        <p class="bg-white rounded-md p-1 m-1 w-1/2" id="q">
                            我要買：<span id="sale{{ item.productId }}">{{ shoppingCartMap[item.productId] }}</span>個
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <button @click="sendOrder">送出訂單</button>
    </div>
</template>


<style lang="scss" scoped>
.product {
    width: 100%;
    height: auto;

    .info{
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    

    .product_bg {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 150px;
        width: auto;
        border-radius: 20px;
        margin: 5px;

        .product_img {
            width: 100px;
            height: 100px;
        }

        .rounded-md {
            border-radius: 4px;
        }
    }
}
</style>
