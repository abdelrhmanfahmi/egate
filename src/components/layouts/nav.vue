<template>
  <header :class="{ 'scrolled-nav': scrollPosition }" class="main-nav">
    <b-container>
      <nav>
        <div class="d-flex">
          <div class="branding">
            <img src="@/assets/images/logo.png" class="img-fluid" alt="logo" />
          </div>
          <ul v-show="!mobile" class="navigation">
            <li>
              <router-link class="link" to="/">{{
                $t("home.home")
              }}</router-link>
            </li>
            <li>
              <router-link class="link" to="/suppliers">{{
                $t("home.suppliers")
              }}</router-link>
            </li>
            <li>
              <router-link class="link" to="/about">{{
                $t("home.about")
              }}</router-link>
            </li>
            <li>
              <router-link class="link corporat-dropdown" to="/b2b-register">{{
                $t("home.corporat")
              }}</router-link>
            </li>
            <li>
              <router-link class="link" to="/contactUs">{{
                $t("home.contactUs")
              }}</router-link>
            </li>
          </ul>
        </div>

        <div class="login" v-show="!mobile && !isLoggined">
          <font-awesome-icon
            icon="fa-solid fa-user"
            v-b-toggle.login
            size="2x"
          />
          <p>{{ $t("login.login") }}</p>
        </div>
        <Login />
        <!--Start Mbile Nav -->
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
            :right="getDir === 'rtl'"
            v-if="mobileNav"
            @hidden="closeSideBar"
            id="sidebar-1"
            backdrop
            width="300px"
            shadow
            z-index="3"
          >
            <MobileNav />
          </b-sidebar>
        </transition>
        <!--End Mbile Nav -->
      </nav>
    </b-container>
  </header>
</template>

<script>
import Login from "./login.vue";
import MobileNav from "./MobileNav.vue";

export default {
  data() {
    return {
      scrollPosition: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      // links: [
      //   { name: this.$t("home.home"), to: "/" },
      //   { name: this.$t("home.suppliers"), to: "/suppliers" },
      //   { name: this.$t("home.about"), to: "/about" },
      //   { name: this.$t("home.corporat"), to: "/corporat" },
      //   { name: this.$t("home.contactUs"), to: "/contact-us" },
      // ],
    };
  },
  components: {
    Login,
    MobileNav,
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
  nav {
    align-items: center;
    font-size: 14px;
    position: relative;
    display: flex;
    flex: row;
    justify-content: space-between;
    padding-top: 12px ;
    transition: 0.5s all ease-in-out;
    margin: 0 auto;
    .branding {
      text-align: center;
    }
    ul li {
      text-transform: uppercase;
      padding: 10px;
      .link {
        text-decoration: none;
        transition: 0.5s all ease-in-out;
        padding: 0 10px 10px;
        border-bottom: 1px solid transparent;
        color: $text-color;
        &:hover {
          color: $main-color;
          border-color: $main-color;
        }
      }
    }

    .navigation {
      display: flex;
      align-items: center;
    }
    .login {
      padding: 0 15px;
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
.submenu {
  opacity: 0;
}
.corporat-dropdown:hover .submenu {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}

// style arabic
html:lang(ar) {
  .main-nav {
    .icon {
      left: 24px;
      right: auto;
    }
  }
}
</style>
