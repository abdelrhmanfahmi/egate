<template>
  <div class="main-layout">
    <TopHeader />
    <Nav />
    <b-alert variant="danger" show v-if="massgeOfVerify">
      {{ massgeOfVerify }}
    </b-alert>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import TopHeader from "@/components/layouts/TopHeader";
import Nav from "@/components/layouts/nav";
import Footer from "@/components/layouts/footer";

export default {
  components: {
    TopHeader,
    Nav,
    Footer,
  },
};
</script>