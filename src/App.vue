<script>
import HeaderView from './components/Header.vue';
// import RouterView from './components/Router.vue';
import FooterView from './components/Footer.vue';
import HomeBoxView from './components/HomeBox.vue';
export default {
  components: {
    HeaderView,
    // RouterView,
    FooterView,
    HomeBoxView,
  },
}
</script>

<template>
  <!-- 首頁 -->
  <HeaderView />
  <!-- <RouterView /> -->
  <FooterView />
  <HomeBoxView />

</template>

<style scoped>
body{
height: 1000px;
}
</style>
