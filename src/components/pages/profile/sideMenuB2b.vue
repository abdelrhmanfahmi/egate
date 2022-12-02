<template>
  <div class="profile-menu">
    <h5 class="my-3">
      {{ buyerUserData.company_name }}
    </h5>

    <div
      class="my-2"
      v-if="buyerUserData && buyerUserData.profile_percentage !== 100"
    >
      <h5>{{ $t("profile.completeRate") }}</h5>
      <b-progress
        class="progress-rate"
        :class="{ 'mr-2': $i18n.locale == 'en', 'ml-2': $i18n.locale == 'ar' }"
        :value="buyerUserData.profile_percentage"
        max="100"
        show-progress
        animated
        variant="danger"
      ></b-progress>
    </div>

    <!-- <h5 class="my-3">
      {{ $t("profile.company") }} {{ buyerUserData.company_name }}
    </h5> -->
    <ul v-if="!socialLogin">
      <li
        v-for="(link, index) in buyerLinks"
        :key="index"
        :class="{
          'd-none':
            link.name === 'Subscribe to the newsletter' &&
            buyerUserData.register_mailing_list,
        }"
      >
        <router-link :to="link.to">
          <font-awesome-icon :icon="`fa-solid fa-${link.iconName}`" />
          <span>{{ link.name }}</span>
          <span
            class="bg-danger border border-light rounded-circle"
            v-if="link.name === 'My Orders' || link.name === 'طلباتى'"
            >{{ userBades.orders }}</span
          >
          <span
            class="bg-danger border border-light rounded-circle"
            v-if="
              link.name === 'Return Requests' || link.name === 'طلبات الاسترجاع'
            "
            >{{ userBades.returns }}</span
          >
          <span
            class="bg-danger border border-light rounded-circle"
            v-if="
              link.name === 'Supplier Messages' ||
              link.name === 'مراسلات المورد'
            "
            >{{ userBades.client_messages }}</span
          >
          <span
            class="bg-danger border border-light rounded-circle"
            v-if="link.name === 'Quotations' || link.name === 'عروض الاسعار'"
            >{{ userBades.rfqs }}</span
          >
        </router-link>
      </li>
    </ul>
    <ul v-else>
      <li
        v-for="(link, index) in SocialLinks"
        :key="index"
        :class="{
          'd-none':
            link.name === 'Subscribe to the newsletter' &&
            buyerUserData.register_mailing_list,
        }"
      >
        <router-link :to="link.to">
          <font-awesome-icon :icon="`fa-solid fa-${link.iconName}`" />
          <span>{{ link.name }}</span>
          <span
            class="bg-danger border border-light rounded-circle"
            v-if="link.name === 'My Orders' || link.name === 'طلباتى'"
            >{{ userBades.orders }}</span
          >
          <span
            class="bg-danger border border-light rounded-circle"
            v-if="
              link.name === 'Return Requests' || link.name === 'طلبات الاسترجاع'
            "
            >{{ userBades.returns }}</span
          >
          <span
            class="bg-danger border border-light rounded-circle"
            v-if="
              link.name === 'Supplier Messages' ||
              link.name === 'مراسلات المورد'
            "
            >{{ userBades.client_messages }}</span
          >
          <span
            class="bg-danger border border-light rounded-circle"
            v-if="link.name === 'Quotations' || link.name === 'عروض الاسعار'"
            >{{ userBades.rfqs }}</span
          >
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          // name: this.$t("profile.b2bFav"),
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
        {
          to: "/profile/Notifications",
          name: this.$t("profile.Notifications"),
          iconName: "bell",
        },
      ],
      SocialLinks: [
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
        // {
        //   to: "/profile/change-password",
        //   name: this.$t("profile.changePassword"),
        //   iconName: "key",
        // },
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
        {
          to: "/profile/Notifications",
          name: this.$t("profile.Notifications"),
          iconName: "bell",
        },
      ],
    };
  },
  props: ["userBades"],
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
