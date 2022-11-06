<template>
  <div class="profile-menu">
    <h2>{{ $t("profile.myProfile") }}</h2>
    <h5 class="my-3">{{ buyerUserData.first_name }} {{ buyerUserData.last_name }}</h5>

    <div class="my-2" v-if="buyerUserData.profile_percentage !== 100">
      <h5>{{ $t("profile.completeRate") }}</h5>
      <b-progress class="progress-rate" :class="{'mr-2':i18n.locale =='en' , 'ml-2':i18n.locale =='ar'}" :value="buyerUserData.profile_percentage" max="100" show-progress animated
        variant="danger"></b-progress>
    </div>

    <ul v-if="!buyerLinks">
      <li v-for="(link, index) in buyerLinks" :key="index"
        :class="{ 'd-none': link.name === 'Subscribe to the newsletter' && buyerUserData.register_mailing_list }">
        <router-link :to="link.to">
          <font-awesome-icon :icon="`fa-solid fa-${link.iconName}`" />
          <span>{{ link.name }}</span>
        </router-link>
      </li>
    </ul>
    <ul v-else>
      <li v-for="(link, index) in socialLinks" :key="index"
        :class="{ 'd-none': link.name === 'Subscribe to the newsletter' && buyerUserData.register_mailing_list }">
        <router-link :to="link.to">
          <font-awesome-icon :icon="`fa-solid fa-${link.iconName}`" />
          <span>{{ link.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // links: [
      //   {
      //     to: "/profile/categories",
      //     name: this.$t("profile.shop"),
      //     iconName: "shop",
      //   },
      //   {
      //     to: "/profile/shopping-cart",
      //     name: this.$t("profile.shoppingCart"),
      //     iconName: "cart-shopping",
      //   },
      //   {
      //     to: "/profile/account-information",
      //     name: this.$t("profile.accountInformation"),
      //     iconName: "circle-info",
      //   },
      //   // {
      //   //   to: "/profile/documents",
      //   //   name: this.$t("profile.documents"),
      //   //   iconName: "file"
      //   // },
      //   {
      //     to: "/profile/adress-book",
      //     name: this.$t("profile.addressBook"),
      //     iconName: "location-dot",
      //   },
      //   {
      //     to: "/profile/subscribe-newsletter",
      //     name: this.$t("profile.subscribeNewsletter"),
      //     iconName: "newspaper",
      //   },
      //   {
      //     to: "/profile/favorite",
      //     name: this.$t("profile.favorite"),
      //     iconName: "heart",
      //   },
      // ],
      buyerLinks: [
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
          to: "/profile/ordersListsB2b",
          name: this.$t("profile.ordersLists"),
          iconName: "clipboard-list",
        },
        {
          to: "/profile/ReturnRequests",
          name: this.$t("profile.returnRequests"),
          iconName: "arrow-rotate-left",
        },
        {
          to: "/profile/Wallet",
          name: this.$t("profile.wallet"),
          iconName: "wallet",
        },
        {
          to: "/profile/account-information-b2b",
          name: this.$t("profile.accountInformation"),
          iconName: "circle-info",
        },
        {
          to: "/profile/change-password",
          name: this.$t("profile.changePassword"),
          iconName: "key",
        },
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
        {
          to: "/profile/StandingOrders",
          name: this.$t("profile.b2bFav"),
          iconName: "bag-shopping",
        },
        // {
        //   to: "/profile/giftCardB2b",
        //   name: this.$t("profile.giftCard"),
        //   iconName: "gift",
        // },
        {
          to: "/profile/QuotationsB2b",
          name: this.$t("profile.quotations"),
          iconName: "list-ol",
        },
        {
          to: "/profile/product-reviews-b2b",
          name: this.$t("profile.productReviews"),
          iconName: "cubes",
        },
        {
          to: "/profile/SupplierCorrespondenceB2b",
          name: this.$t("profile.supplierCorrespondence"),
          iconName: "comments",
        },
      ],
      socialLinks: [
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
          to: "/profile/ordersListsB2b",
          name: this.$t("profile.ordersLists"),
          iconName: "clipboard-list",
        },
        {
          to: "/profile/ReturnRequests",
          name: this.$t("profile.returnRequests"),
          iconName: "arrow-rotate-left",
        },
        {
          to: "/profile/Wallet",
          name: this.$t("profile.wallet"),
          iconName: "wallet",
        },
        {
          to: "/profile/account-information-b2b",
          name: this.$t("profile.accountInformation"),
          iconName: "circle-info",
        },
        {
          to: "/profile/change-password",
          name: this.$t("profile.changePassword"),
          iconName: "key",
        },
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
        {
          to: "/profile/StandingOrders",
          name: this.$t("profile.b2bFav"),
          iconName: "bag-shopping",
        },
        // {
        //   to: "/profile/giftCardB2b",
        //   name: this.$t("profile.giftCard"),
        //   iconName: "gift",
        // },
        {
          to: "/profile/QuotationsB2b",
          name: this.$t("profile.quotations"),
          iconName: "list-ol",
        },
        {
          to: "/profile/product-reviews-b2b",
          name: this.$t("profile.productReviews"),
          iconName: "cubes",
        },
        {
          to: "/profile/SupplierCorrespondenceB2b",
          name: this.$t("profile.supplierCorrespondence"),
          iconName: "comments",
        },
        {
          to: "/profile/Notifications",
          name: this.$t("profile.Notifications"),
          iconName: "bell",
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
