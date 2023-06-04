<template>
  <!-- main profile page   -->
  <div class="profile-body">
    <!-- products  progress  -->
    <!-- <ProgressSlider /> -->
    <b-container v-if="
      userInfo.item.type === 'buyer' ||
      (userInfo.item.type === 'supplier' && userInfo.item.is_buyer == 1)
    ">
      <div class="row profile-header" v-if="buyerUserData && buyerUserData.profile_percentage !== 100">
        <div class="col-12 col-sm-8 continue-registration">
          <h5>{{ $t("profile.completeAccount") }}</h5>
          <p>
            {{ $t("profile.completeMessage") }}
            <router-link :to="redirectUrl">{{ $t("profile.completeLink") }}</router-link>
          </p>
        </div>
      </div>

      <div class="v-else my-1 py-1"></div>
    </b-container>
    <div class="profile">
      <b-container>
        <b-row>
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

import profile from "@/services/profile";
export default {
  methods: {
    /**
     * ge tProfile Budges function
     * @vuese
     */
    getProfileBudges() {
      this.$store.dispatch("getUserBadges");
    },
    checkUserCompleteProfileData() {
      if (this.buyerUserData) {
        if (
          this.buyerUserData.first_name &&
          this.buyerUserData.last_name &&
          this.buyerUserData.email &&
          this.buyerUserData.mobile_number &&
          this.buyerUserData.job_title &&
          this.buyerUserData.company_name_en &&
          this.buyerUserData.job_title
        ) {
          if (this.addressesExist == false) {
            this.redirectUrl = "/profile/adress-book";
          } else {
            this.redirectUrl = "/profile/documents";
          }
        } else {
          this.redirectUrl = "/profile/account-information-b2b";
        }
      }
    },
    /**
     * get All Adresses function
     * @vuese
     */
    getAllAdresses() {
      profile
        .getAllAdresses()
        .then((res) => {
          if (res.data.items.length > 0) {
            this.addressesExist = true;
          } else {
            this.addressesExist = false;
          }
        })
        .then(() => {
          this.checkUserCompleteProfileData();
        });
    },
  },
  mounted() {
    if (this.buyerUserData) {
      this.getProfileBudges();
    } else {
      this.$router.push("/b2b-login");
    }
    this.getAllAdresses();
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
  data() {
    return {
      redirectUrl: "/profile/account-information-b2b",
      addressesExist: false,
    };
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
