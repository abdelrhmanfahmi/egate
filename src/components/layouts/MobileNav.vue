<template>
  <div class="mobile-nav">
    <div class="branding">
      <img src="@/assets/images/logo.png" class="img-fluid" alt="logo" />
    </div>
    <ul class="drop-down">
      <li v-for="(link, index) in links" :key="index">
        <router-link class="link" :to="link.to">{{ link.name }}</router-link>
      </li>
      <li>
        <a
          :href="process.env.VUE_APP_SUPPLIER"
          class="link"
        >
          {{ $t("home.corporat") }} - {{ $t("home.suppliers") }}
        </a>
      </li>
      <li v-if="!isLoggined">
        <a v-b-toggle.login class="link">
          {{ $t("login.loginNav") }}
        </a>
      </li>
      <li v-else>
        <router-link to="/profile/categories" class="link">
          {{ $t("profile.myProfile") }}
        </router-link>
      </li>
      <li v-if="isLoggined">
        <a @click="logout()" class="link text-danger">
          {{ $t("login.logout") }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { name: this.$t("home.home"), to: "/" },
        { name: this.$t("home.suppliers"), to: "/suppliers" },
        { name: this.$t("home.about"), to: "/about" },

        { name: this.$t("home.contactUs"), to: "/contact-us" },

        { name: this.$t("home.cart"), to: "/cart" },
        {
          name: `${this.$t("home.corporat")} - ${this.$t("home.buyer")}`,
          to: "/b2b-register",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.mobile-nav {
  .branding {
    text-align: center;
    img{
      max-width: 120px;
      margin:  20px;
    }
    
  }
  .drop-down {
    li {
      a {
        line-height: 24px;
        padding: 10px 25px;
        font-size: 15px;
        font-weight: 500;
        color: #312620;
        display: block;
        text-transform: capitalize;
        border-top: 1px solid rgb(0 0 0 / 10%);
        transition: all 0.5s ease-in-out;
        &:hover {
          color: #ed2124;
        }
      }
      &:last-child a {
        border-bottom: 1px solid rgb(0 0 0 / 10%);
      }
    }
  }
}
</style>
