<template>
  <div class="profile-menu">
    <h5 class="my-3">
      {{ $t("profile.company") }} {{ buyerUserData.company_name }}
    </h5>
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
          to: "/profile/documents",
          name: this.$t("profile.documents"),
          iconName: "file",
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
          to: "/profile/giftCardB2b",
          name: this.$t("profile.giftCard"),
          iconName: "gift",
        },
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
        
        // {
        //   to: "/profile/ResidentsB2b",
        //   name: this.$t("profile.residents"),
        //   iconName: "receipt",
        // },
        // {
        //   to: "/profile/BankNotificationsB2b",
        //   name: this.$t("profile.bankNotifications"),
        //   iconName: "money-bill-wave",
        // },
        
        // {
        //   to: "/profile/supplierRatingB2b",
        //   name: this.$t("profile.supplierRatings"),
        //   iconName: "star",
        // },
        
        {
          to: "/profile/SupplierCorrespondenceB2b",
          name: this.$t("profile.supplierCorrespondence"),
          iconName: "comments",
        },
       
      ],
    };
  },
};
</script>

<style lang="scss">
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
  }
}
</style>
