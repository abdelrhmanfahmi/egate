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
          v-b-toggle.sidebar-1
          @click="toggleMobileNav"
          v-show="mobile"
          icon="fa-solid fa-bars"
          :class="{ 'icon-active': mobileNav }"
        />
      </div>
      <transition name="mobile-nav">
        <b-sidebar
          v-if="mobileNav"
          lazy
          @hidden="closeSideBar"
          id="sidebar-1"
          backdrop
          width="300px"
          shadow
        >
          <ul class="drop-down">
            <li v-for="(link, index) in links" :key="index">
              <router-link class="link" :to="link.to">{{
                link.name
              }}</router-link>
            </li>
          </ul>
        </b-sidebar>
      </transition>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      scrollPosition: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      links: [
        { name: "home", to: "/" },
        { name: "suppliers", to: "/suppliers" },
        { name: "about", to: "/about" },
        { name: "corporat", to: "/corporat" },
        { name: "contact us", to: "/contact-us" },
      ],
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    closeSideBar() {
      this.mobileNav = null;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 991) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.main-nav {
  width: 100%;
  transition: 0.5s all ease-in-out;
  color: #565656;
  nav {
    position: relative;
    display: flex;
    flex: row;
    padding: 12px 0;
    transition: 0.5s all ease-in-out;
    width: 90%;
    margin: 0 auto;
    // @media (min-width: 1140px) {
    //   max-width: 1140px;
    // }

    ul li {
      text-transform: uppercase;
      padding: 12px;
      .link {
        text-decoration: none;
        transition: 0.5s all ease-in-out;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        &:hover {
          color: #000;
          border-color: red;
        }
      }
    }
    .branding {
      display: flex;
      align-items: center;
    }
    .navigation {
      display: flex;
      align-items: center;
    }
    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      height: 100%;
      right: 24px;
      svg {
        cursor: pointer;
        transition: 0.8s all ease-in-out;
        font-size: 25px;
      }
    }
    .icon-active {
      transform: rotate(180deg);
    }
  }
}
</style>
