<script>
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import HeaderView from './components/Header.vue';
import FooterView from './components/Footer.vue';
import HomeBoxView from './components/HomeBox.vue';

// export default defineComponent({
//   components: { FooterView, HeaderView, HomeBoxView }
// })

export default {
  components: { 
    FooterView, 
    HeaderView, 
    HomeBoxView 
  },
  computed: {
    isLoginSignup() {
      const meta = this.$route.meta;
      // console.log(meta)
      // console.log(meta.hideHeaderFooter)
      return meta && meta.hideHeaderFooter
    }
  }
}
</script>

<template>
  <div class="container">
    <HeaderView v-if="!isLoginSignup" />
    <!-- 通過"完整路徑"作為key值，確保路由發生變化時，RouterView會重新創建和渲染 -->
    <RouterView :key="$route.fullPath" />
    <FooterView v-if="!isLoginSignup" />
    <HomeBoxView />

  </div>
</template>

<style scoped></style>
