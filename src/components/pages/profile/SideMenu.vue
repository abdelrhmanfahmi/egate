<template>
  <div class="profile-menu">
    <h2>My profile</h2>
    <h5 class="my-3">Beshoy Maowed</h5>
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <router-link :to="link.to">
          <font-awesome-icon :icon="`fa-solid fa-${link.iconName}`" />
          <span>{{ link.name }}</span></router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          to: "/profile/categories",
          name: this.$t("profile.shop"),
          iconName: "shop",
        },
        {
          to: "/profile/shopping-cart",
          name: this.$t("profile.shoppingCart"),
          iconName: "cart-shopping",
        },
        {
          to: "/profile/account-information",
          name: this.$t("profile.accountInformation"),
          iconName: "circle-info",
        },
        {
          to: "/profile/change-password",
          name: "change Password",
          iconName: "star",
        },
        { to: "/profile/categories", name: "shop", iconName: "shop" },
        { to: "/profile/categories", name: "change", iconName: "star" },
      ],
    };
  },
};
</script>

<style lang="scss">
.profile-menu {
  padding: 60px 45px;
  background-color: #303030;
  color: #fff;
  ul {
    li {
      padding: 10px 0;
      a {
        display: inline-block;
        color: #fff;
        &:hover {
          color: red;
        }
        span {
          padding: 0 10px;
          text-transform: capitalize;
        }
      }
    }
  }
}

// style arabic
html:lang(ar) {
  .profile-menu {
    text-align: right;
  }
}
</style>