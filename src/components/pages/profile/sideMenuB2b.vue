<template>
  <div class="profile-menu">
    <!-- side bar for b2b or buyer user  -->
    <div class="d-flex justify-content-center align-items-center flex-column">
      <img :src="buyerUserData.image_path" alt="" srcset="" />
      <h5 class="my-3" v-if="buyerUserData.company_name_en">
        {{ buyerUserData.company_name_en }}
      </h5>
      <h5 class="my-3" v-else-if="buyerUserData.company_name_ar">
        {{ buyerUserData.company_name_ar }}
      </h5>
      <h5 class="my-3" v-else>
        {{ buyerUserData.company_name_en }}
      </h5>
    </div>

    <div class="my-2" v-if="buyerUserData && buyerUserData.profile_percentage !== 100">
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
    <ul v-if="!socialLogin">
      <li
        v-for="(link, index) in buyerLinks"
        :key="index"
        :class="{
          'd-none':
            link.name.trim() === 'Subscribe to the newsletter' &&
            buyerUserData.register_mailing_list,
        }"
      >
        <router-link :to="link.to">
          <img
            src="@/assets/images/new-design/standing-order-sign.png"
            v-if="link.name == $t('profile.b2bFav')"
            class="standing-order-sign"
            alt="standing-order-sign"
          />
          <font-awesome-icon v-else :icon="`fa-solid fa-${link.iconName}`" size="1x" />
          <span>{{ link.name }}</span>
          <span
            class="side-number"
            v-if="
              userBades &&
              userBades.orders &&
              link.name.trim() == $t('profile.ordersLists')
            "
            >{{ userBades.orders }}</span
          >
          <span
            class="side-number"
            v-if="
              userBades &&
              userBades.returns &&
              link.name.trim() === $t('profile.returnRequests')
            "
            >{{ userBades.returns }}</span
          >
          <span
            class="side-number"
            v-if="
              userBades &&
              userBades.client_messages &&
              link.name.trim() === $t('profile.supplierCorrespondence')
            "
            >{{ userBades.client_messages }}</span
          >
          <span
            class="side-number"
            v-if="
              userBades && userBades.rfqs && link.name.trim() === $t('profile.quotations')
            "
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
            link.name.trim() === 'Subscribe to the newsletter' &&
            buyerUserData.register_mailing_list,
        }"
      >
        <router-link :to="link.to">
          <img
            src="@/assets/images/new-design/standing-order-sign.png"
            v-if="link.name == $t('profile.b2bFav')"
            class="standing-order-sign"
            alt="standing-order-sign"
          />
          <font-awesome-icon :icon="`fa-solid fa-${link.iconName}`" v-else />
          <span>{{ link.name }}</span>
          <span
            class="side-number"
            v-if="
              userBades &&
              userBades.orders &&
              link.name.trim() == $t('profile.ordersLists')
            "
            >{{ userBades.orders }}</span
          >
          <span
            class="side-number"
            v-if="
              userBades &&
              userBades.returns &&
              link.name.trim() === $t('profile.returnRequests')
            "
            >{{ userBades.returns }}</span
          >
          <span
            class="side-number"
            v-if="
              userBades &&
              userBades.client_messages &&
              link.name.trim() === $t('profile.supplierCorrespondence')
            "
            >{{ userBades.client_messages }}</span
          >
          <span
            class="side-number"
            v-if="
              userBades && userBades.rfqs && link.name.trim() === $t('profile.quotations')
            "
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
      /**
       * @vuese
       *  if logged in with email and pass
       */
      buyerLinks: [
        {
          to: "/profile/categories",
          name: this.$t("profile.categories"),
          iconName: "border-all",
        },
        {
          to: "/profile/dashboard",
          name: this.$t("profile.dashboard"),
          iconName: "dashboard",
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
          to: "/profile/StandingOrders",
          name: this.$t("profile.b2bFav"),
          iconName: "bag-shopping",
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
        {
          to: "/profile/NotificationSettings",
          name: this.$t("profile.NotificationSettings"),
          iconName: "sliders",
        },
      ],
      /**
       * @vuese
       *  if logged in socially
       */
      SocialLinks: [
        {
          to: "/profile/categories",
          name: this.$t("profile.shop"),
          iconName: "shop",
        },
        {
          to: "/profile/dashboard",
          name: this.$t("profile.dashboard"),
          iconName: "dashboard",
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
        {
          to: "/profile/NotificationSettings",
          name: this.$t("profile.NotificationSettings"),
          iconName: "sliders",
        },
      ],
    };
  },
  /**
   *  props
   */
  props: {
    userBades: {
      // userBades prop
      type: Object,
      required: false,
    },
  },
};
</script>

<style lang="scss">
/**
      *  component style
    */
.profile-menu {
  //padding: 60px 0px 60px 25px;
  //background-color: #303030;
  background-color: #1f1f1f;
  color: #fff;
  font-size: 16px;
  ul {
    li {
      padding: 10px 20px;
      border-bottom: 2px solid #4d4d4d;
      &:first-of-type {
        border-top: 2px solid #4d4d4d;
      }
      .router-link-exact-active {
        color: $main-color;
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
    //padding: 60px 60px 60px 0px;
    text-align: right;
  }
}
</style>
