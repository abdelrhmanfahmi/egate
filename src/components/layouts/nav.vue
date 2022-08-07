<template>
  <header :class="{ 'scrolled-nav': scrollPosition }" class="main-nav">
    <b-container>
      <nav :class="$i18n.locale">
        <!-- Main Header -->
        <div class="d-flex">
          <div class="branding">
            <img
              src="@/assets/images/logo.png"
              class="img-fluid"
              alt="logo"
              @click="goToHome()"
            />
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
            <li class="humhum-dropdown">
              <a class="link">
                {{ $t("home.corporat") }}
                <ul class="submenu">
                  <li>
                    <a
                      href="https://supplier.humhum.work/"
                      target="_blank"
                      >{{ $t("home.suppliers") }}</a
                    >
                  </li>
                  <li>
                    <router-link to="/b2b-login">{{
                      $t("home.buyer")
                    }}</router-link>
                  </li>
                </ul>
              </a>
            </li>
            <li>
              <router-link class="link" to="/contact-us">{{
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
              <font-awesome-icon
                v-b-toggle.sidebar-1
                icon="fa-solid fa-search"
              />
            </b-button>
            <b-modal id="modal-1" class="search">
              <!-- Using slots -->
              <b-input-group class="mt-3">
                <template #append>
                  <b-input-group-text>
                    <strong @click="search" class="search-eye">
                      <font-awesome-icon
                        v-b-toggle.sidebar-1
                        icon="fa-solid fa-search" /></strong
                  ></b-input-group-text>
                </template>
                <b-form @submit.prevent="search">
                  <b-form-input
                    :placeholder="$t('cart.search')"
                    v-model="keyword"
                  ></b-form-input>
                </b-form>
              </b-input-group>
            </b-modal>
          </div>
          <div v-if="!mobile" class="cart">
            <span class="cart-icon">
              <b-icon-minecart-loaded></b-icon-minecart-loaded>
            </span>
            <span class="cartLength" v-if="cartItems && cartLength">
              {{ cartLength }}
            </span>
            <Cart class="cart-body"></Cart>
          </div>
          <div v-if="!mobile && buyerUserData" class="cart notify-holder">
            <span class="cart-icon">
              <font-awesome-icon icon="fa-solid fa-bell" />
            </span>
            <span class="cartLength"> {{notificationsLength > 0 ? notificationsLength : 0}} </span>
            <Notify class="notify-body" :notifications="notifications" />
          </div>
          <!-- <div v-if="!mobile" class="cart">
            <span class="cart-icon">
              <font-awesome-icon icon="fa-solid fa-heart" />
            </span>
            <span class="cartLength" v-if="wishlistItems">
              {{ wishlistLength }}
            </span>
            <Cart class="cart-body"></Cart>
          </div> -->

          <!-- user sign in -->
          <div class="login" v-if="!mobile && !isLoggined" v-b-toggle.login>
            <font-awesome-icon icon="fa-solid fa-user" size="2x" />
            <h5>
              <small>{{ $t("login.login") }}</small>
            </h5>
          </div>
          <div v-if="!mobile && isLoggined">
            <div class="user-profile">
              <b-dropdown id="dropdown-1">
                <template #button-content>
                  <span>
                    <font-awesome-icon icon="fa-solid fa-user" size="2x" />
                    <p v-if="buyerUserData.is_verified">
                      {{ $t("login.welcome") }} ,
                      <span v-if="buyerUserData.type === 'buyer'">
                        {{ userInfo.item.company_name }}
                      </span>
                      <span v-else>
                        {{ userInfo.item.first_name }}
                      </span>
                    </p>
                    <p v-else>
                      {{ $t("login.welcome") }} ,
                      <span v-if="buyerUserData.type === 'buyer'">
                        {{ userInfo.item.company_name }}
                      </span>
                      <span v-else>
                        {{ userInfo.item.first_name }}
                      </span>
                    </p>
                  </span>
                </template>
                <b-dropdown-item
                  v-if="userInfo.item.is_verified || buyerUserData.is_verified"
                >
                  <router-link to="/profile/categories">{{
                    $t("profile.myProfile")
                  }}</router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <a class="logout" @click="logout()">
                    {{ $t("login.logout") }}
                  </a>
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
          <!-- user Profile and name when login -->
          <Login v-if="!isLoggined" />
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
import Cart from "../cart/Cart.vue";
import Notify from "../notifications.vue";
import globalAxios from "@/services/global-axios";

import { BIconMinecartLoaded } from "bootstrap-vue";

export default {
  data() {
    return {
      scrollPosition: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      cartItemsLength: 0,
      cartWishlistLength: 0,
      wishlistItems: null,
      wishlistLength: 0,
      keyword: "",
    };
  },
  components: {
    Cart,
    BIconMinecartLoaded,
    Login,
    MobileNav,
    Notify,
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
    this.getCartProducts();
    this.getWishlistProducts();
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
    goToHome() {
      this.$router.push("/");
    },
    getCartProducts() {
      return globalAxios.post("/cart").then((res) => {
        // console.log("cart res", res);
        this.cartItemsLength = res.data.items.cart_total_products_count;
      });
    },
    getWishlistProducts() {
      return globalAxios.get("members/profile/favorite").then((res) => {
        // console.log("cart res", res);
        this.wishlistItems = res.data.items.data;
        this.wishlistLength = res.data.items.data.length;
      });
    },
    search() {
      document.querySelector(".modal").click();
      this.$router.push({
        path: "/SearchResults",
        query: { keyword: this.keyword },
      });
      location.reload();
    },
    loginNow() {
      document.$refs["b2cLogin"].show();
      document.querySelector(".login").click();
      if (document.querySelector(".login")) {
        alert("exist");
      }
      this.$router.push({
        path: this.$router.path,
        query: { force_login: "false" },
      });
    },
  },
  computed: {
    cartItems() {
      return this.$store.state.cart.cartItems;
    },
    cartLength() {
      return this.$store.state.cart.cartLength;
    },
    notifications(){
      return this.$store.state.notifications
    },
    notificationsLength(){
      return this.$store.state.notificationsLength
    },
  },
  mounted() {
    if (this.$route.query.force_login == "true") {
      if (document.querySelector(".login")) {
        setTimeout(() => {
          document.querySelector(".login").click();
        }, 0);
        var newURL = location.href.split("?")[0];
        window.history.pushState("object", document.title, newURL);
        console.log(newURL);
      }
    }
  },
  destroyed() {
    window.history.pushState({}, document.title, window.location.pathname);
  },
};
</script>

<style lang="scss" scoped>
.main-nav {
  width: 100%;
  transition: 0.5s all ease-in-out;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: #fff;
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
    .cart {
      padding: 0 1rem;
      position: relative;
      .cart-icon {
        color: #000000;
        font-size: 12pt;
        cursor: pointer;
      }
      .cart-body {
        right: 0;
        background: #fff;
        opacity: 0;
        padding: 1.5rem;
        position: absolute;
        top: 2rem;
        transition: all 0.5s ease 0s;
        z-index: 9;
        box-shadow: 0px 12px 24px 0px rgb(120 120 120 / 30%);
        visibility: hidden;
        transform: translateY(10px);
        width: 23rem;
      }
      &:hover {
        .cart-body {
          opacity: 1;
          visibility: visible;
          transform: translateY(0px);
          z-index: 9;
        }
      }
    }
    .branding {
      text-align: center;
      img {
        width: 100px;
        padding: 11px 12px 13px 5px;
        cursor: pointer;
      }
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
    .right-side {
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
    }
  }
}

html:lang(ar) {
  .main-nav {
    .cart-body , .notify-body {
      right: auto;
      left: 0;
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

  .icon-active {
    transform: rotate(180deg);
  }
}
.cartLength {
  position: absolute;
  top: -11px;
  right: 4px;
  background: $main_color;
  color: #fff;
  min-width: 20px;
  min-height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
  padding: 0px 4px;
}
.ar {
  .icon {
    left: 24px;
    right: auto;
  }
}
.search-eye {
  cursor: pointer;
}

.notify-holder {
  transition: all 0.3s ease-in-out;
  &:hover {
    .notifications {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
