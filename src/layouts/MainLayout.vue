<template>
  <div class="main-layout">
    <TopHeader />
    <Nav />
    <router-view></router-view>
  </div>
</template>

<script>
import TopHeader from "@/components/layouts/TopHeader";
import Nav from "@/components/layouts/nav";

export default {
  components: {
    TopHeader,
    Nav,
  },
};
</script>