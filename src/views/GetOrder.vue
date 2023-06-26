
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        orderList: [],
        cartList: [],
        shoppingCartMap: {},
        selectedProducts: [],
        imageBaseUrl: '@/assets/img/productWall_img/',
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
      getOrderProduct() {
        const memberId = sessionStorage.getItem("member_id");
        const requestData = {
          member: {
            memberId: memberId
          }
        };
        axios.post('http://localhost:8080/getOrderProduct', requestData)
          .then(response => {
            this.orderList = response.data.orderItemList;
          })
          .catch(error => {
            console.log('An error occurred:', error);
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
    <div>
      <button @click="getOrderProduct">Get Order Product</button>
      <div id="show_detail_area">
        <div v-for="item in cartList" :key="item.productId" class="product-bg flex justify-center items-center h-48 w-auto bg-pri-green rounded-xl m-5">
          <input type="checkbox" v-model="selectedProducts" :value="item.productId" :id="'product' + item.productId" name="products">
          <div class="w-1/4">
            <img :src="`../../public/img/productWall_img/${result.productId}-1.png`" id="product_img" style="width: 50px;">
          </div>
          <div class="w-1/2">
            <div class="d">
              <p class="bg-white rounded-md p-1 mx-1 mb-2">名稱：<span id="product_show_name">{{ item.productName }}</span></p>
            </div>
            <div class="d flex" name="sales" id="w">
              <p class="bg-white rounded-md p-1 m-1 w-1/2" id="q">我要買：<span id="sale{{ item.productId }}">{{ shoppingCartMap[item.productId] }}</span>個</p>
            </div>
          </div>
        </div>
      </div>
  
      <div v-for="(orderItem, index) in orderList" :key="index" class="order-item">
        <div v-for="product in orderItem.products" :key="product.productId" class="product-item">
          <span>{{ product.productName }}</span>
          <span>Price: {{ product.price }}</span>
          <span>Quantity: {{ orderItem.quantities[product.productId] }}</span>
        </div>
        <div class="total-price">Total Price: {{ orderItem.totalPrice }}</div>
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
    box-shadow: 0px 5px 5px #f2e9c6;
    position: relative;
  
    .product-bg {
      background-color: white;
    }
  
    .order-button {
      height: 48px;
      width: 150px;
      margin: 10px;
      border-radius: 10px;
      font-size: 18px;
      border: none;
      background-color: #995a25;
      color: white;
    }
  
    .order-button:hover {
      scale: 1.01;
      background-color: #b86c2e;
    }
  }
  
  .order-item {
    margin-bottom: 10px;
  }
  
  .product-item {
    display: flex;
    justify-content: space-between;
  }
  
  .total-price {
    font-weight: bold;
  }
  </style>
  