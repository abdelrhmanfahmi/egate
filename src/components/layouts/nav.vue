<template>
  <header :class="{ 'scrolled-nav': scrollPosition }" class="main-nav">
    <nav>
      <div class="branding">
        <img src="@/assets/images/logo.png" class="img-fluid" alt="logo" />
      </div>
      <ul v-show="!mobile" class="navigation">
        <li v-for="(link, index) in links" :key="index">
          <router-link class="link" :to="link.to">{{ link.name }}</router-link>
        </li>
      </ul>
      <div class="icon">
        <font-awesome-icon
          @click="toggleMobileNav"
          v-show="mobile"
          icon="fa-solid fa-bars"
          :class="{ 'icon-nav': mobileNav }"
        />
      </div>
      <transition name="mobile-nav">
        <ul class="drop-down" v-show="mobileNav">
          <li v-for="(link, index) in links" :key="index">
            <router-link class="link" :to="link.to">{{
              link.name
            }}</router-link>
          </li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      scrollPosition: "",
      mobile: "",
      mobileNav: "",
      links: [
        { name: "home", to: "/" },
        { name: "suppliers", to: "/suppliers" },
        { name: "about", to: "/about" },
        { name: "corporat", to: "/corporat" },
        { name: "contact us", to: "/contact-us" },
      ],
    };
  },
  methods: {
    toggleMobileNav() {
      console.log("test");
    },
  },
};
</script>

<style lang="scss" scoped>
.main-nav {
  width: 100%;
  transition: 0.5 all ease-in-out;
  color: #565656;
  nav {
    display: flex;
    flex: row;
    padding: 12px 0;
    transition: 0.5 all ease-in-out;
    width: 90%;
    margin: 0 auto;
    @media(min-width) {
        
    }
  }
}
</style>
