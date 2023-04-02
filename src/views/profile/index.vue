<template>
  <!-- main profile page   -->
  <div class="profile-body">
    <!-- products  progress  -->
    <!-- <ProgressSlider /> -->
    <b-container
      v-if="
        userInfo.item.type === 'buyer' ||
        (userInfo.item.type === 'supplier' && userInfo.item.is_buyer == 1)
      "
    >
      <div
        class="row profile-header"
        v-if="buyerUserData && buyerUserData.profile_percentage !== 100"
      >
        <div class="col-12 col-sm-8 continue-registration">
          <h5>{{ $t("profile.completeAccount") }}</h5>
          <p>
            {{ $t("profile.completeMessage") }}
            <router-link to="/profile/account-information-b2b">{{
              $t("profile.completeLink")
            }}</router-link>
          </p>
        </div>
      </div>

      <div class="v-else my-1 py-1"></div>
    </b-container>
    <div class="profile">
      <b-container>
        <b-row>
          <!-- <b-col lg="3" md="5">
            side menu if user is b2c 
            <SideMenu
              v-if="userInfo.item.type === 'b2c'"
              :userBades="userBades"
            />
            side menu if user is b2b (buyer) 
            <SideMenuB2b :userBades="userBades" v-else />
          </b-col> -->
          <!-- <b-col lg="9" md="7"> -->
          <b-col sm="12">
            <router-view></router-view>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
/**
 *  main profile page
 * @displayName  main profile page
 */
// import SideMenu from "@/components/pages/profile/SideMenu.vue";
// import SideMenuB2b from "@/components/pages/profile/sideMenuB2b.vue";
// import ProgressSlider from "@/components/pages/home/ProgressSlider";
export default {
  components: {
    // SideMenu,
    // SideMenuB2b,
    // ProgressSlider,
  },
  methods: {
    /**
     * ge tProfile Budges function
     * @vuese
     */
    getProfileBudges() {
      this.$store.dispatch("getUserBadges");
    },
  },
  mounted() {
    if (this.buyerUserData) {
      this.getProfileBudges();
    }
  },
  computed: {
    /**
     * @vuese
     * get user Bades for sidebar from store
     */
    userBades() {
      return this.$store.getters.userBadges; // this represent user profile side menu states
    },
  },
};
</script>
<style lang="scss">
.profile-header {
  padding: 4rem 0 0 0;
  text-align: start;
  .continue-registration {
    color: #000;
    h5 {
      color: #312620;
      font-weight: 600;
      font-size: 18pt;
      margin-bottom: 0.6rem;
    }
    p {
      font-size: 11pt;
      color: #676565;
      margin-bottom: 1rem;
      a {
        color: #1696e7;
      }
    }
  }
  .rate {
    h5 {
      color: #312620;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }
    .progress-rate {
      height: 1.6rem;
    }
  }
}
.profile {
  padding: 3rem 0;
  //background: #f9f8f5;
}
</style>
