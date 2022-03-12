<template>
  <div id="app">
    <MainLayout />
  </div>
</template>


<script>
// @ is an alias to /src
import MainLayout from "@/layouts/MainLayout.vue";
export default {
  name: "Home",
  mounted() {
    
    this.$store.dispatch("getUserInfo");
  },
  components: {
    MainLayout,
  },
};
</script>

<style lang="scss">
</style>
