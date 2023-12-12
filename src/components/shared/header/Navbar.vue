<template>
  <div>
    <!-- header start -->
    <header class="header">
      <v-container fluid>
        <v-row class="row v-center">
          <div class="header-item item-left">
            <div class="logo">
              <router-link to="/">
                <v-img width="100" src="@/assets/images/logo.png" class="styleImgLogo"></v-img>
              </router-link>
            </div>
          </div>
          <!-- menu start here -->
          <div class="header-item item-center">
            <v-row class="aligned-row">
              <!-- <v-col cols="1">
                <span
                  class="cursor-pointer"
                  @click.prevent="showSearchBar = !showSearchBar"
                  v-if="showSearchBar"
                  ><v-icon icon="mdi-close"></v-icon
                ></span>
              </v-col> -->
              <v-col cols="12">
                <span class="header-search" :class="{
                  enableLargeSearch: showSearchBar,
                  disableLargeSearch: !showSearchBar,
                }">
                  <HeaderSearch />
                </span>
              </v-col>
            </v-row>
            <NavLinks />
            <div class="menu-overlay"></div>
          </div>
          <!-- menu end here -->
          <div class="header-item item-right">
            <!-- <span
              class="iconHolder seachIcon cursor-pointer"
              @click.prevent="openLargeSearchBar"
              v-if="!showSearchBar && !mobileView"
            >
              <v-icon icon="mdi-magnify"></v-icon
            ></span> -->
            <span class="iconHolder seachIcon cursor-pointer" v-if="!showSearchBar && mobileView">
              <searchModal />
            </span>

            <!-- compare  -->
            <!-- <span class="iconHolder" role="button">
              <font-awesome-icon icon="fa-solid fa-code-compare" />
            </span> -->

            <!-- languages  -->
            <span role="button" class="iconHolder language iconHolder" @click="switchLang()" v-if="lang == 'en'"
              id="arLang" ref="arLang">
              <span class="hold-land">
                <img :src="require('@/assets/images/header/egypt.png')" />
                <span class="px-2">AR</span>
              </span>
            </span>
            <span role="button" class="iconHolder language iconHolder" @click="switchLang()" v-if="lang == 'ar'"
              id="enLang" ref="enLang">

              <span class="hold-land">
                <img :src="require('@/assets/images/header/united-states.png')" />
                <span class="px-2">En</span>
              </span>


            </span>
            |

            <!-- wishlists  -->

            <span class="iconHolder">
              <router-link to="/profile/wallet">
                <v-icon icon="mdi-wallet-outline" class="styleWalletImg"></v-icon>
              </router-link>
            </span>
            |
            <span class="iconHolder">
              <router-link to="/profile/wishlist">
                <v-badge :content="wishlistItemsCount" color="error styleBadge">
                  <v-icon icon="mdi-heart-outline" class="styleHeartImg"></v-icon>
                </v-badge>
              </router-link>
            </span>
            
            <span v-if="isLoggedIn">
              <router-link to="/profile/account" class="iconHolder profile"><v-icon
                  icon="mdi-account-outline"></v-icon></router-link>
            </span>
            <span v-else class="iconHolder profile">
              <AccountPop />
            </span>
            
            <!-- cart  -->
            <cartPop />
            <!-- <theme-button /> -->

            <!-- mobile menu trigger -->
            <div class="mobile-menu-trigger iconHolder">
              <span></span>
            </div>
          </div>
        </v-row>
      </v-container>
    </header>
    <!-- header end -->
  </div>
</template>

<script>
import cartPop from "@/components/shared/header/CartSideBar.vue";
import AccountPop from "@/components/shared/header/AccountPop.vue";
import HeaderSearch from "./HeaderSearch";
import searchModal from "../SearchModal.vue";
// import ThemeButton from "@/components/shared/ThemeButton.vue";
// import myMixin from '@/mixins.js'
import { mapGetters } from "vuex";

import NavLinks from "./NavLinks.vue";
export default {
  // mixins:[myMixin],
  mounted() {
    const menu = document.querySelector(".menu");
    const menuMain = menu.querySelector(".menu-main");
    const goBack = menu.querySelector(".go-back");
    const menuTrigger = document.querySelector(".mobile-menu-trigger");
    const closeMenu = menu.querySelector(".mobile-menu-close");
    let subMenu;
    menuMain.addEventListener("click", (e) => {
      if (!menu.classList.contains("active")) {
        return;
      }
      if (e.target.closest(".menu-item-has-children")) {
        const hasChildren = e.target.closest(".menu-item-has-children");
        // showSubMenu(hasChildren);
        document.querySelector('.mobile-menu-close').click()
      }
    });
    goBack.addEventListener("click", () => {
      hideSubMenu();
    });
    menuTrigger.addEventListener("click", () => {
      toggleMenu();
    });
    closeMenu.addEventListener("click", () => {
      toggleMenu();
    });
    document.querySelector(".menu-overlay").addEventListener("click", () => {
      toggleMenu();
    });
    function toggleMenu() {
      menu.classList.toggle("active");
      document.querySelector(".menu-overlay").classList.toggle("active");
    }
    function showSubMenu(hasChildren) {
      subMenu = hasChildren.querySelector(".sub-menu");
      subMenu.classList.add("active");
      subMenu.style.animation = "slideLeft 0.5s ease forwards";
      const menuTitle =
        // hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
        hasChildren
          .querySelector("i")
          .parentNode.querySelector("span").textContent;

      console.log("menuTitle", menuTitle);
      menu.querySelector(".current-menu-title").innerHTML = menuTitle;
      menu.querySelector(".mobile-menu-head").classList.add("active");
    }

    function hideSubMenu() {
      subMenu.style.animation = "slideRight 0.5s ease forwards";
      setTimeout(() => {
        subMenu.classList.remove("active");
      }, 300);
      menu.querySelector(".current-menu-title").innerHTML = "";
      menu.querySelector(".mobile-menu-head").classList.remove("active");
    }

    window.onresize = function () {
      if (this.innerWidth > 991) {
        if (menu.classList.contains("active")) {
          toggleMenu();
        }
      }
    };
    window.addEventListener("load", this.checkMobile);
    window.addEventListener("scroll", this.makeHeaderSticky);
    window.addEventListener("resize", this.checkMobile);

    this.checkCartData();
  },
  methods: {
    checkCartData() {
      this.$store.dispatch('cart/getCartProducts');
    },
    openLargeSearchBar(e) {
      this.showSearchBar = true;
      e.preventDefault();
    },
    closeLargeSearchBar(e) {
      this.showSearchBar = false;
      e.preventDefault();
    },
    switchLang() {
      if (this.lang === "en") {
        this.lang = "ar";
      } else {
        this.lang = "en";
      }
      localStorage.setItem("lang", this.lang);

      window.location.reload();
    },
    checkMobile() {
      this.screenSize = window.innerWidth;
      if (this.screenSize <= 991) {
        this.mobileView = true;
        return;
      }
      this.screenSize = null;
      this.mobileView = null;
      return;
    },
    makeHeaderSticky() {
      const header = document.querySelector(".header");
      const toggleClass = "is-sticky";

      window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        const windowWidth = window.innerWidth
        if (currentScroll > 150 && windowWidth > 767) {
          header.classList.add(toggleClass);
        } else {
          header.classList.remove(toggleClass);
        }
      });
    },
  },
  data() {
    return {
      showSearchBar: true,
      lang: localStorage.getItem("lang") || "en",
      mobileView: null,
      screenSize: null,
    };
  },
  components: {
    HeaderSearch,
    cartPop,
    AccountPop,
    searchModal,
    NavLinks,
    // ThemeButton
  },
  computed: {
    ...mapGetters({ wishlistItemsCount: "wishlist/wishlistItemCount" }),
    categories() {
      return this.$store.getters['categories/categories'];
    },
    isLoggedIn() {
      return this.$store.getters['Auth/isAuthenticated'];
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background: $header-back;
  color: #fff;

  a {
    &:hover {
      color: #fff !important;
    }
  }
}

.seachIcon {
  background: $main-color;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  border: none;
  font-weight: 400;
  text-align: center;
  width: 30px;
  line-height: 30px;
  padding: 0;
  z-index: 9;
  padding: 2px 5px !important;
}

.iconHolder {
  width: auto;
  line-height: 30px;
  padding: 0;

  &:hover {
    color: #fff;
  }
}

.enableLargeSearch {
  opacity: 1;
  transform: translateX(0);
  display: block;
  transition: all 0.5s ease-in-out;
}

.disableLargeSearch {
  opacity: 0;
  transform: translateX(-50%);
  display: none;
  transition: all 0.5s ease-in-out;
}

.header-search {
  z-index: 99;

  @media (max-width: 992px) {
    margin-top: 20px;
  }
}

.profile {
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
  padding: 0;
  text-align: center;
}

.header.is-sticky {
  position: fixed;
  animation: slideDown 0.35s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}

.hold-land {
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 25px;
    height: 25px
  }
}

@media screen and (max-width: 500px) {
  .styleImgLogo{
    width: 65% !important;
  }
  .styleWalletImg{
    font-size: 20px;
  }
  .styleHeartImg{
    font-size: 20px;
    position: relative;
    top: 3px;
  }
}
</style>
