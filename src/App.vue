<script>
export default {
  methods: {
    showAlert() {
      // Use sweetalert2
      this.$swal('Hello Vue world!!!');
    },
  },
};
</script>

<template>
  <h1>111</h1>
  <button @click="showAlert">Hello world</button>
</template>

<style scoped>

</style>
