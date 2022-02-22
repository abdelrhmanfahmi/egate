<template>
  <div>
    <b-container>
      <b-row>
        <b-col lg="3">
          <SideMenu />
        </b-col>
        <b-col lg="9">
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
.texst {
  display: block;
}
</style>