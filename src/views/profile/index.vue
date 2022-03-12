<template>
  <div class="profile-body">
    <b-container v-if="userInfo.item.type === 'buyer'">
      <div class="row profile-header">
        <div class="col-12 col-sm-8 continue-registration">
          <h5>{{ $t("profile.completeAccount") }}</h5>
          <p>
            {{ $t("profile.completeMessage") }}
            <a href="#">{{ $t("profile.completeLink") }}</a>
          </p>
        </div>
        <div class="rate col-12 col-sm-4">
          <h5>{{ $t("profile.completeRate") }}</h5>
          <b-progress
            class="progress-rate"
            :value="userData.profile_percentage"
            max="100"
            show-progress
            animated
            variant="danger"
          ></b-progress>
        </div>
      </div>
    </b-container>
    <div class="profile">
      <b-container>
        <b-row>
          <b-col lg="3" md="5">
            <SideMenu v-if="userInfo.item.type === 'b2c'" />
            <sideMenuB2b v-else />
          </b-col>
          <b-col lg="9" md="7">
            <router-view></router-view>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import SideMenu from "@/components/pages/profile/SideMenu.vue";
import sideMenuB2b from "@/components/pages/profile/sideMenuB2b.vue";

export default {
  components: {
    SideMenu,
    sideMenuB2b,
  },
};
</script>
<style lang="scss">
.profile-header {
  padding: 4rem 0;
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
  background: #f9f8f5;
}
</style>
