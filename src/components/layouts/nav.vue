<template>
  <header :class="{ 'scrolled-nav': scrollPosition }" class="main-nav">
    <!-- navbar component  -->
    <div
      :class="{
        container: searchClicked == false,
        'container-fluid': searchClicked == true,
      }"
    >
      <nav :class="$i18n.locale" class="text-center">
        <!-- Main Header -->
        <!-- top nav  -->
        <div class="row justify-content-center align-items-center">
          <div
            class="col-lg-4 col-md-4 col-sm-7 d-flex justify-content-center align-items-center"
          >
            <div
              class="lang-currency-country d-flex justify-content-between align-items-center"
            >
              <TopHeader />
            </div>
          </div>
          <div
            class="col-lg-4 col-md-4 col-sm-5 d-flex justify-content-center align-items-center"
          >
            <div class="middle">
              <!-- logo is centered  -->
              <div class="d-flex">
                <div class="branding">
                  <img
                    :src="logoEnv"
                    v-if="logoEnv"
                    class="img-fluid"
                    alt="logo"
                    @click="goToHome()"
                  />
                  <img
                    src="@/assets/images/logo.png"
                    v-else
                    class="img-fluid"
                    alt="logo"
                    @click="goToHome()"
                  />
                </div>
                <!-- <navLinks /> -->
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-0 col-sm-0">
            <div class="toggleMenu">
              <!-- Right Side have user login and search   -->
              <!-- Right Side have user login and search   -->
              <div class="right-side d-flex">
                <!-- Search Icon -->
                <div class="search-icon" v-if="!mobile">
                  <b-button
                    class="icon-search"
                    size="md"
                    v-if="searchClicked == true"
                    @click="closeSearch"
                  >
                    <font-awesome-icon icon="fa-solid fa-times" />
                  </b-button>
                  <span class="" v-if="searchClicked">
                    <div class="form-holder">
                      <b-form @submit.prevent="search" @keyup="search">
                        <b-form-input
                          :placeholder="$t('cart.search')"
                          class="search-input"
                          v-model="keyword"
                          ref="searchIcon"
                        ></b-form-input>
                        <div
                          class="floating-btn"
                          @click="searchBtn"
                          v-if="suggestionsExist == false && keyword.length"
                        >
                          <button>
                            <font-awesome-icon icon="fa-solid fa-arrow-right" />
                          </button>
                        </div>
                      </b-form>
                      <ul class="search-suggestions" v-if="suggestionsExist">
                        <span class="meaning-span">{{
                          $t("home.didMean")
                        }}</span>
                        <li
                          v-for="(suggest, index) in suggestions"
                          :key="index"
                          role="button"
                          @click="searchSuggestion(suggest)"
                        >
                          {{ suggest }}
                        </li>
                      </ul>
                    </div>
                  </span>

                  <!-- <b-button
                    v-b-modal.modal-1
                    class="icon-search"
                    size="md"
                    v-if="searchClicked == false"
                    @click="searchClicked = !searchClicked"
                  >
                    <font-awesome-icon
                      v-b-toggle.sidebar-1
                      icon="fa-solid fa-search"
                    />
                  </b-button> -->
                </div>
                <div
                  class="d-flex justify-content-between align-items-center"
                  v-if="!mobile"
                >
                  <router-link
                    to="/b2b-login"
                    class="border-main color-main br-5 p-2"
                    v-if="!buyerUserData || buyerUserData.type == 'b2c'"
                  >
                    <b>{{ $t("home.corporat") }}</b>
                  </router-link>
                </div>
                <div
                  v-if="!mobile"
                  class="cart d-flex justify-content-between align-items-center"
                >
                  <span
                    class="cartLength cart-number"
                    v-if="cartItems && cartLength"
                  >
                    {{ cartLength }}
                  </span>
                  <span class="cart-icon">
                    <!-- <b-icon-minecart-loaded></b-icon-minecart-loaded> -->
                    <!-- <font-awesome-icon icon="fa-solid fa-cart-shopping" size="xl" /> -->
                    <BIconCartDash width="25" height="25" />
                  </span>

                  <Cart class="cart-body"></Cart>
                </div>

                <div v-if="!mobile && buyerUserData" class="cart notify-holder">
                  <span class="cart-icon">
                    <!-- <font-awesome-icon icon="fa-solid fa-bell" /> -->
                    <BIconBell width="25" height="25" />
                  </span>
                  <span class="cartLength" v-if="notificationsLength > 0">
                    {{ notificationsLength > 0 ? notificationsLength : 0 }}
                  </span>
                  <Notify class="notify-body" :notifications="notifications" />
                </div>
                <!-- user sign in -->
                <div
                  class="login"
                  v-if="!mobile && !isLoggined"
                  v-b-toggle.login
                >
                  <!-- <font-awesome-icon icon="fa-solid fa-user" size="2x" /> -->
                  <BIconPerson width="25" height="25" />
                  <!-- <h5>
                    <small>{{ $t("login.login") }}</small>
                  </h5> -->
                </div>
                <div v-if="!mobile && isLoggined">
                  <div class="user-profile">
                    <b-dropdown id="dropdown-1">
                      <template #button-content>
                        <span>
                          <!-- <font-awesome-icon icon="fa-solid fa-user" size="2x" /> -->
                          <BIconPerson width="25" height="25" />
                          <!-- <p v-if="buyerUserData.is_verified">
                            {{ $t("login.welcome") }} ,
                            <span v-if="buyerUserData.type === 'buyer'">
                              <span v-if="$i18n.locale == 'en'">{{
                                userInfo.item.company_name_en
                              }}</span>
                              <span
                                v-else-if="
                                  $i18n.locale == 'ar' && userInfo.item.company_name_ar
                                "
                                >{{ userInfo.item.company_name_ar }}</span
                              >
                              <span v-else>{{ userInfo.item.company_name_en }}</span>
                            </span>
                            <span v-else>
                              {{ userInfo.item.first_name }}
                            </span>
                          </p>
                          <p v-else>
                            {{ $t("login.welcome") }} ,
                            <span v-if="buyerUserData.type === 'buyer'">
                              <span v-if="$i18n.locale == 'en'">{{
                                userInfo.item.company_name_en
                              }}</span>
                              <span
                                v-else-if="
                                  $i18n.locale == 'ar' && userInfo.item.company_name_ar
                                "
                                >{{ userInfo.item.company_name_ar }}</span
                              >
                              <span v-else>{{ userInfo.item.company_name_en }}</span>
                            </span>
                            <span v-else>
                              {{ userInfo.item.first_name }}
                            </span>
                          </p> -->
                        </span>
                      </template>
                      <b-dropdown-item
                        v-if="
                          userInfo.item.is_verified || buyerUserData.is_verified
                        "
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
              <div class="icon right-side" v-if="mobile">
                <div
                  class="row justify-content-center align-items-center search-icon"
                  v-if="mobile"
                >
                  <!-- <div class="col-12"> -->
                  <!-- <div class="search-icon"> -->
                  <!-- <b-button v-b-modal.modal-1 class="icon-search" size="md">
                        <font-awesome-icon
                          v-b-toggle.sidebar-1
                          icon="fa-solid fa-search"
                          class="mobile-search-icon"
                        />
                      </b-button> -->
                  <!-- <b-modal id="modal-1" class="search">
                        Using slots
                        <b-input-group class="mt-3">
                          <template #append>
                            <b-input-group-text class="floating-btn">
                              <strong @click="searchBtn" class="search-eye">
                                <font-awesome-icon
                                  v-b-toggle.sidebar-1
                                  icon="fa-chevron-right"
                                />
                              </strong>
                            </b-input-group-text>
                          </template>
                          <b-form @submit.prevent="search" @keyup="search">
                            <div class="form-holder">
                              <b-form-input
                                :placeholder="$t('cart.search')"
                                v-model="keyword"
                              ></b-form-input>
                              <div class="floating-btn" @click="searchBtn" v-if="suggestionsExist == false && keyword.length">
                  <button>
                    <font-awesome-icon icon="fa-solid fa-arrow-right" />
                  </button>
                </div>
                              <ul class="search-suggestions" v-if="suggestionsExist">
                                <span class="meaning-span">{{ $t("home.didMean") }}</span>
                                <li
                                  v-for="(suggest, index) in suggestions"
                                  :key="index"
                                  role="button"
                                  @click="searchSuggestion(suggest)"
                                >
                                  {{ suggest }}
                                </li>
                              </ul>
                            </div>
                          </b-form>
                        </b-input-group>
                      </b-modal> -->
                  <!-- </div> -->
                  <!-- </div> -->
                </div>

                <font-awesome-icon
                  v-b-toggle.sidebar-1
                  @click="toggleMobileNav"
                  icon="fa-solid fa-bars"
                  :class="{ 'icon-active': mobileNav }"
                  class="bar-icon"
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
            </div>
          </div>
        </div>

        <!--End Mbile Nav -->
      </nav>
    </div>
    <div class="botton-nav">
      <BottomHeader />
    </div>
  </header>
</template>

<script>
// nav component
import MobileNav from "./MobileNav.vue";
import Cart from "../cart/Cart.vue";
import Notify from "../notifications.vue";
import globalAxios from "@/services/global-axios";
import Login from "./login.vue";
import categories from "@/services/categories";

// import navLinks from "./navLinks.vue"
import TopHeader from "@/components/layouts/TopHeader";
import BottomHeader from "@/components/layouts/BottomHeader";

import { BIconBell, BIconCartDash, BIconPerson } from "bootstrap-vue";

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
      searchClicked: false,
      suggestionsExist: false,
    };
  },
  components: {
    Cart,
    MobileNav,
    Notify,
    Login,
    // navLinks,
    TopHeader,
    BottomHeader,
    BIconCartDash,
    BIconPerson,
    BIconBell,
  },
  created() {
    /**
     * @vuese
     * check Screen size
     */
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
    this.getCartProducts();
    if (this.buyerUserData) {
      this.getWishlistProducts();
    }
  },
  methods: {
    /**
     * @vuese
     * close SideBar function
     */
    closeSideBar() {
      this.mobileNav = null;
    },
    /**
     * @vuese
     * toggle Mobile Nav function
     */
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    /**
     * @vuese
     * check Screen function
     */
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 1199) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    /**
     * @vuese
     * go To Home function
     */
    goToHome() {
      this.$router.push("/");
    },
    /**
     * @vuese
     * get Cart Products function
     */
    getCartProducts() {
      return globalAxios.post("/cart").then((res) => {
        this.cartItemsLength = res.data.items.cart_total_products_count;
      });
    },
    /**
     * @vuese
     * get favorite Products function
     */
    getWishlistProducts() {
      return globalAxios.get("members/profile/favorite").then((res) => {
        this.wishlistItems = res.data.items.data;
        this.wishlistLength = res.data.items.data.length;
      });
    },
    /**
     * @vuese
     * search function
     */
    search() {
      // this.$router.push({
      //   path: "/SearchResults",
      //   query: { keyword: this.keyword },
      // });
      // setTimeout(() => {
      //   location.reload()
      // }, 1200);
      let data = {
        keyword: this.keyword,
      };
      categories
        .searchResult(data)
        .then((resp) => {
          if (
            resp.data.items.suggestions &&
            resp.data.items.suggestions.length
          ) {
            this.suggestionsExist = true;
            this.suggestions = resp.data.items.suggestions;
          } else {
            this.suggestionsExist = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // let r = this.$router.resolve({
      //   name: "SearchResults", // put your route information in
      //   query: { keyword: this.keyword }, // put your route information in
      // });
      // window.location.assign(r.href);
    },
    searchSuggestion(word) {
      let r = this.$router.resolve({
        name: "SearchResults", // put your route information in
        query: { keyword: word }, // put your route information in
      });
      window.location.assign(r.href);
    },
    searchBtn() {
      if (this.keyword.length > 1) {
        let r = this.$router.resolve({
          name: "SearchResults", // put your route information in
          query: { keyword: this.keyword }, // put your route information in
        });
        window.location.assign(r.href);
      }
    },
    /**
     * @vuese
     * close search function
     */
    closeSearch() {
      this.searchClicked = false;
      this.keyword = "";
    },
    /**
     * @vuese
     * login Now function if not logged in
     */
    loginNow() {
      if (document.$refs.b2cLogin) {
        document.$refs.b2cLogin.show();
      }
      document.querySelector(".login").click();
      this.$router.push({
        path: this.$router.path,
        query: { force_login: "false" },
      });
    },
  },
  computed: {
    /**
     * @vuese
     * get cart items function
     */
    cartItems() {
      return this.$store.state.cart.cartItems;
    },
    /**
     * @vuese
     * get cart items length function
     */
    cartLength() {
      return this.$store.state.cart.cartLength;
    },
    /**
     * @vuese
     * get notifications function
     */
    notifications() {
      return this.$store.state.notifications;
    },
    /**
     * @vuese
     * get notifications length function
     */
    notificationsLength() {
      return this.$store.state.notificationsLength;
    },
    /**
     * @vuese
     * check logged in or not function
     */
    page() {
      return this.$route.query.force_login == "true";
    },
  },
  mounted() {
    const loc = document.location;
    if (
      (this.$route.query.force_login &&
        this.$route.query.force_login == "true") ||
      loc.href.includes("force_login")
    ) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("buyerUserData");
      this.loginNow();
    }
    window.onscroll = function () {
      myFunction();
    };

    // var header = document.querySelector(".main-nav");
    // var headerToggle = document.querySelector("#navigator");
    // var sticky = header.offsetTop;

    var header = document.querySelector(".right-side");
    var sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky + 300) {
        header.classList.add("fixed-toggle-menu");
        // headerToggle.classList.add("fixedSideToggle");
      } else {
        header.classList.remove("fixed-toggle-menu");
        // headerToggle.classList.remove("fixedSideToggle");
      }
    }
  },
  destroyed() {
    window.history.pushState({}, document.title, window.location.pathname);
  },
  watch: {
    page() {
      if (this.$route.query.force_login == "true") {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("buyerUserData");
        if (document.querySelector(".login")) {
          setTimeout(() => {
            document.querySelector(".login").click();
          }, 0);
          setTimeout(() => {
            var newURL = location.href.split("?")[0];
            window.history.pushState("object", document.title, newURL);
            console.log(newURL);
          }, 500);
        }
      }
    },
    searchClicked() {
      setTimeout(() => {
        if (this.searchClicked && this.$refs.searchIcon) {
          this.$refs.searchIcon.focus();
        }
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
/**
    * component style
*/
.main-nav {
  width: 100%;
  transition: 0.5s all ease-in-out;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  // background: #fff;
  background: $top-header-color;

  nav {
    // align-items: center;
    font-size: 14px;
    // position: relative;
    // display: flex;
    // flex: row;
    // justify-content: space-between;
    padding-top: 12px;
    transition: 0.5s all ease-in-out;
    margin: 0 auto;

    .cart {
      padding: 0 0.7rem;
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
        width: 27rem;
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

        @media (min-width: 1200px) and (max-width: 1400px) {
          padding: 0 5px 0;
        }

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
          background: $main-color;
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
    .cart-body,
    .notify-body {
      right: auto;
      left: 0;
    }
  }
}

.icon {
  display: flex;
  align-items: center;
  position: absolute;
  top: 20px;
  height: 100%;
  right: 24px;
  @media(max-width:500px){
    top: 60px;
    right:10px
  }

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
  // position: absolute;
  // top: -11px;
  // right: 4px;
  background: $main_color;
  color: #fff;
  min-width: 40px;
  min-height: 25px;
  line-height: 25px;
  text-align: center;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  padding: 0px 10px;
  margin: 0 10px;
}

.cart-number {
  background: $main-color;
}

.ar {
  .icon {
    //left: 24px;
    //right: auto;
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

.mobile-search-icon {
  font-size: 20px !important;
}

@media (max-width: 992px) {
  #modal-1 .input-group-text {
    font-size: 25px;
  }

  #modal-1 .form-control {
    font-size: 30px;
    width: 285px;
  }
}

.search-input {
  border-radius: 20px;
  width: 300px;
  transition: all 0.3s ease-in-out;

  @media (max-width: 992px) {
    max-width: 170px;
  }

  @media (min-width: 1200px) and(max-width:1400px) {
    width: 200px;
  }
}

.bar-icon {
  z-index: 1;
}

.form-holder {
  position: relative;

  .search-suggestions {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 300px;
    overflow: scroll;
    background: #fff;
    box-shadow: 0px 12px 24px 0px rgb(120 120 120 / 30%);
    padding: 15px;
    z-index: 99;

    li {
      border-bottom: 1px solid #ccc;
    }
  }

  .meaning-span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
  }
}

.floating-btn {
  button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    outline: none;
    box-shadow: none;
    background: $main-color;
    color: #fff;
    padding: 5px 10px;
    border-radius: 10px;
  }
}

.middle {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;

  @media (max-width: 992px) {
    justify-content: inherit;
  }
}

.toggleMenu {
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 766.98px) {
    top: 2%;
    right: 2%;
    position: fixed;
    //background: $top-header-color;
    width: 14%;
  }

  @media (min-width: 767px) and (max-width: 1200px) {
    position: fixed;
    top: 2%;
    right: 2%;
  }
}

.companies-router {
  border: 2px solid $main-color;
  padding: 6px 15px;
  border-radius: 5px;
  color: $main-color;

  a {
    color: inherit;
    font-weight: 500;
  }
}
.fixed-toggle-menu {
  @media (max-width: 992px) {
    top: 2rem;
    right: 2rem;
    //position: fixed !important;
    transition: position 1s linear;
  }
}
.main-nav {
  transition: position 0.7s, left 0.7s;
}
</style>
