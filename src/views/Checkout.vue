<script>
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
                    memberId: sessionStorage.getItem("member_id"),
                },
            };

            fetch("http://localhost:8080/findMemberCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cartData),
            })
                .then((response) => response.json())
                .then((data) => {
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
                    memberId: sessionStorage.getItem("member_id"),
                },
                productId: this.selectedProducts,
                sales: this.selectedProducts.map((productId) => this.shoppingCartMap[productId]),
            };

            fetch("http://localhost:8080/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            })
                .then((response) => response.json())
                .then((data) => {
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
    <div id="show_detail_area">
        <div v-for="item in cartList" :key="item.productId"
            class="product_bg flex justify-center items-center h-48 w-auto bg-pri-green rounded-xl m-5">
            <input type="checkbox" v-model="selectedProducts" :value="item.productId" :id="'product' + item.productId"
                name="products">
            <div class="w-1/4">
                <img :src="`@/assets/img/productWall_img/${item.productId}-1.png`" id="product_img" style="width: 50px;">

            </div>
            <div class="w-1/2">
                <div class="d">
                    <p class="bg-white rounded-md p-1 mx-1 mb-2">名稱：<span id="product_show_name">{{ item.productName
                    }}</span></p>
                </div>
                <div class="d flex" name="sales" id="w">
                    <p class="bg-white rounded-md p-1 m-1 w-1/2" id="q">我要買：<span id="sale{{ item.productId }}">{{
                        shoppingCartMap[item.productId] }}</span>個</p>
                </div>
            </div>
        </div>
        <button @click="sendOrder">送出訂單</button>
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
    box-shadow: 0px 5px 5px #f2e9c6;
    position: relative;

    .product_bg {
        background-color: white;
    }

    .order_button {
        height: 48px;
        width: 150px;
        margin: 10px;
        border-radius: 10px;
        font-size: 18px;
        border: none;
        background-color: #995a25;
        color: white;
    }

    .order_button:hover {
        scale: 1.01;
        background-color: #b86c2e;
    }
}
</style>
  