<script>
import { defineComponent } from "vue";
import HeaderView from './components/Header.vue';
import FooterView from './components/Footer.vue';
import HomeBoxView from './components/HomeBox.vue';

export default defineComponent({
  components: { FooterView, HeaderView, HomeBoxView }
})
</script>

<template>
  <div class="container">
    <HeaderView />
    <!-- 通過"完整路徑"作為key值，傳遞給RouterView，確保路由發生變化時，RouterView會重新創建和渲染 -->
    <RouterView :key="$route.fullPath" />
    <FooterView />
    <HomeBoxView />
  </div>
</template>

<style scoped>
body {
  /* height: 1000px; */
}
</style>
