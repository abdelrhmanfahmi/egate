<template>
  <div class="profile">
    <b-container>
      <b-row>
        <b-col lg="3" md="5">
          <SideMenu />
        </b-col>
        <b-col lg="9"  md="7">
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import SideMenu from "@/components/pages/profile/SideMenu.vue";
export default {
  components: {
    SideMenu,
  },
};
</script>

<style>
.profile {

  padding: 3rem 0;
  background: #f9f8f5;
}
</style>