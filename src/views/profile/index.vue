<template>
  <div class="main-profile">
    <div v-if="userInfo.item.type === 'buyer'" >
      <b-container>
          yes  
     </b-container>
    </div>
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

<style>
.profile {
  padding: 3rem 0;
  background: #f9f8f5;
}
</style>