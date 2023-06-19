<script>




// 加入購物車
const addCart = document.querySelector('#add_cart');
const quantity1DOM = document.querySelector("#quantity1")
addCart.addEventListener('click', function () {
  const memberId = sessionStorage.getItem("member_id");
  const products = {};

  products[productId] = quantity1DOM.value;

  const requestData = {
    member: {
      memberId: memberId
    },
    products,
  };
  console.log(requestData)
  fetch("http://localhost:8080/addCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData)
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      alert(data.message);
    })
    .catch(function (error) {
      console.log("An error occurred:", error);
    });
});
</script>

<template>
  <div id="app">
    <div class="right-side w-4/5 bg-white flex justify-center items-center">
      <div id="show_detail_area" class="h-5/6 w-5/6 m-5 bg-pri-green flex">
        <img :src="productImg" class="w-1/2 m-5" alt="">
        <div class="m-5 w-1/2 bg-pri-light p-3 relative">
          <h1 class="text-5xl m-5">{{ productName }}</h1>
          <h3 class="text-2xl m-5">{{ productCategory }}</h3>
          <p class="text-xl m-5">{{ productPrice }}</p>
          <p class="text-lg m-5">{{ productStock }}</p>
          <input v-model="quantity1" type="number" class="size-sm right-10 top-20 absolute" name="quantity1" id="quantity1" style="order: -1; width: 75px; height: 20px;border: 1px solid #000;">
          <button @click="addToCart" class="bg-pri-green w-48 absolute bottom-5 right-5" type="button" style="margin-top: -1.5rem;">加入購物車 🛒</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>