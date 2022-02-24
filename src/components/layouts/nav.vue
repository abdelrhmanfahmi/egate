<template>
  <header :class="{ 'scrolled-nav': scrollPosition }" class="main-nav">
    <b-container>
      <nav>
        <!-- Main Header -->
        <div class="d-flex">
          <div class="branding">
            <img src="@/assets/images/logo.png" class="img-fluid" alt="logo" />
          </div>
          <ul v-if="!mobile" class="navigation">
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

        <!-- Right Side have user login and search   -->
        <div class="right-side d-flex">
                  <!-- Search Icon -->
                <div class="search-icon" v-if="!mobile">
                  <b-button v-b-modal.modal-1 class="icon-search" size="md">
                    <font-awesome-icon v-b-toggle.sidebar-1 icon="fa-solid fa-search" />
                  </b-button>
                  <b-modal id="modal-1" class="search">
                    <!-- Using slots -->
                    <b-input-group class="mt-3">
                      <template #append>
                        <b-input-group-text>
                          <strong>
                            <font-awesome-icon
                              v-b-toggle.sidebar-1
                              icon="fa-solid fa-search" /></strong
                        ></b-input-group-text>
                      </template>
                      <b-form-input placeholder="Search"></b-form-input>
                    </b-input-group>
                  </b-modal>
                </div>
                <!-- user sign in -->
                <div class="login" v-if="!mobile && !isLoggined">
                  <font-awesome-icon
                    icon="fa-solid fa-user"
                    v-b-toggle.login
                    size="2x"
                  />
                  <h5>
                    <small>{{ $t("login.login") }}</small>
                  </h5>
                </div>
                <!-- user Profile and name when login -->
                <Login v-if="isLoggined" />
        </div>

        <!--Start Mbile Nav -->
        <div class="icon" v-if="mobile">
          <font-awesome-icon
            v-b-toggle.sidebar-1
            @click="toggleMobileNav"
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
    padding-top: 12px;
    transition: 0.5s all ease-in-out;
    margin: 0 auto;
    .branding {
      text-align: center;
    }
    ul li {
      text-transform: uppercase;
      padding: 10px;
      position: relative;
      .link {
        text-decoration: none;
        transition: 0.5s all ease-in-out;
        padding: 0 10px 10px;
        border-bottom: 1px solid transparent;
        color: $text-color;
        font-weight: 700;
        font-size: 16px;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 80%;
          transform: translateY(-50%);
          height: 1px;
          width: 0%;
          margin: 0 auto;
          transition: 0.3s linear;
          background: #ed2124;
          width: 0%;
        }
      }
      &:hover {
        .link::before {
          width: 70%;
        }
      }
    }

    .navigation {
      display: flex;
      align-items: center;
    }



    .right-side{
      align-items: center;
      .login {
          padding: 0 0 0 15px;
          text-align: center;
        }
      .search-icon {
        .modal-header {
          display: none;
        }
        .icon-search {
          color: #212529;
          background-color: transparent;
          border-color: transparent;
          &:focus {
            box-shadow: 0 0 0 0;
          }
        }
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
}
.submenu {
  opacity: 0;
}
.corporat-dropdown:hover .submenu {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}


</style>
