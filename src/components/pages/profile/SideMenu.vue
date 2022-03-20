<template>
  <div class="profile-menu">
    <h2>{{ $t("profile.myProfile") }}</h2>
    <h5 class="my-3">{{ userData.first_name }} {{ userData.last_name }}</h5>
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <router-link :to="link.to">
          <font-awesome-icon :icon="`fa-solid fa-${link.iconName}`" />
          <span>{{ link.name }}</span></router-link
        >
      </li>
      <li v-if="!userInfo.item.is_social_account">
        <router-link to="/profile/change-password">
          <font-awesome-icon :icon="`fa-solid fa-star`" />
          <span>{{ $t("profile.changePassword"), }}</span></router-link
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
        // {
        //   to: "/profile/documents",
        //   name: this.$t("profile.documents"),
        //   iconName: "file"
        // },
        {
          to: "/profile/adress-book",
          name: this.$t("profile.addressBook"),
          iconName: "location-dot",
        },
        {
          to: "/profile/subscribe-newsletter",
          name: this.$t("profile.subscribeNewsletter"),
          iconName: "newspaper",
        },
        {
          to: "/profile/favorite",
          name: this.$t("profile.favorite"),
          iconName: "heart",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.profile-menu {
  padding: 60px 0px 60px 25px;
  background-color: #303030;
  color: #fff;
  ul {
    li {
      padding: 10px 0;
      .router-link-exact-active {
        color: red;
      }
      a {
        display: inline-block;
        color: #fff;
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
    padding: 60px 60px 60px 0px;
    text-align: right;
    ul {
      text-align: right;
    }
  }
}
</style>