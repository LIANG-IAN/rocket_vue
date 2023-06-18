<script>
import { defineComponent } from 'vue'
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "Header"
})
</script>

<template>
  <div class="links">
    <RouterLink to="/shop" class="link">商城</RouterLink>
    <RouterLink to="/product" class="link">商品管理</RouterLink>
  </div>
</template>

<style scoped></style>