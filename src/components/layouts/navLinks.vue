<template>
  <div class="links-wrapper">
    <!-- <ul v-if="!mobile" class="navigation"> -->
    <ul class="navigation">
      <li>
        <router-link class="link" to="/">{{ $t("home.home") }}</router-link>
      </li>
      <li>
        <router-link class="link" to="/about">{{
          $t("home.about")
        }}</router-link>
      </li>
      <li>
        <router-link class="link" to="/contact-us">{{
          $t("home.contactUs")
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  created() {
    /**
     * @vuese
     * check Screen size
     */
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
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
  },
  destroyed() {
    window.history.pushState({}, document.title, window.location.pathname);
  },
  watch: {
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

.cart-number {
  background: $main-color;
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

.navigation {
  li {
    margin: 0 20px !important;
    &:first-of-type {
      margin-left: 30px !important;
    }
  }
}
</style>
