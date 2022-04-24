<template>
  <div class="main-layout">
    <TopHeader />
    <Nav />
    <b-alert variant="danger" show v-if="massgeOfVerify">
      <b-container>
        {{ massgeOfVerify }}
      </b-container>
    </b-alert>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
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
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
