<template>
  <div class="main-layout">
    <TopHeader />
    <Nav />
    <b-alert variant="danger" show v-if="massgeOfVerify">
      <b-container>
        {{ massgeOfVerify }}
      </b-container>
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