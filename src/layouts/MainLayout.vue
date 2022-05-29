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
      <router-view class="view"></router-view>
    </transition>
    <div class="top-btn" @click="goTop" v-if="visible">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4a5568"
        stroke-width="1"
        stroke-linecap="square"
        stroke-linejoin="arcs"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </div>
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
  methods: {
    goTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
      if (window.scrollY > 500) {
        this.visible = true;
      } else {
        this.visible = false;
      }
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  data() {
    return {
      scTimer: 0,
      scY: 0,
      visible: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
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
.top-btn {
  position: fixed;
  right: 20px;
  bottom: 50px;
  padding: 0;
  background: transparent;
  color: #fff;
  border: none;
  margin: 0;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  border-radius: 50%;
  border: 1px solid #d4d5d8;
}
.view{
  min-height: 50vh;
}
</style>
