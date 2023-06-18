<script>
import MemberInfoView from "./views/Member_Info.vue"
import Login_Signup from "./views/Login_Signup.vue";
export default {
  components: {
    MemberInfoView,
    Login_Signup
},
}

</script>

<template>
  <div class="container">
    <!-- <RouterView/> -->
    <Login_Signup />
    <!-- <MemberInfoView /> -->
  </div>
</template>

<style scoped>

</style>
