<template>
  <metainfo>
    <template v-slot:title="{ content }">{{
      content ? `${content} | E-Gate` : `E-Gate`
    }}</template>
  </metainfo>
  <Navbar />
  <div class="App-wrapper">
    <transition
      name="router-animation"
      mode="out-in"
      enter-active-class="animate__animated animate__fadeInRight fast"
      leave-active-class="animate__animated animate__fadeInRight faster"
    >
      <router-view />
    </transition>
  </div>
  <actionsComp v-show="screenStatus == true" />
  <Footer />
</template>

<script>
// import MainLayout from "../"
import Navbar from "@/components/shared/header/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import actionsComp from "@/components/shared/actionsComp";
export default {
  components: {
    Navbar,
    Footer,
    actionsComp,
  },
  name: "App",
  props: {
    working: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  watch: {
    $route: function () {
      this.$emit("working");
      // console.log("this.working", this.working);
    },
  },
  methods: {
    checkLoadingScreen(event) {
      console.log("event", event);
    },
  },
  computed: {
    screenStatus() {
      return this.$store.getters.loadingScreen;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
/**
*layout style
*/
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
