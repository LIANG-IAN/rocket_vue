<script>
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
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
    <RouterView />
    <FooterView />
    <HomeBoxView />

  </div>
</template>

<style scoped></style>
