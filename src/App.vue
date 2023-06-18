<script>

import {defineComponent} from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  components: {Footer, Header}
})
</script>

<template>
  <div class="container">
    <Header></Header>
    <RouterView/>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>
