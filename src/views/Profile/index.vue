<template>
  <div class="profile-holder bg-gray">
    <v-app class="py-3 bg-gray">
      <div class="App-wrapper">
        <v-container>
          <v-row>
            <v-col cols="12" lg="3" md="3" sm="12">
              <SideLinks />
            </v-col>
            <v-col cols="12" lg="9" md="9" sm="12">
              <div class="py-3">
                <router-view />
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-app>
  </div>
</template>

<script>
import { useMeta } from "vue-meta";
import SideLinks from "./SideLinks.vue";
export default {
  components: {
    SideLinks,
  },
  setup() {
    useMeta({
      title: "Profile Page",
      htmlAttrs: { lang: "en", amp: true },
    });
  },
  mounted(){
    this.$nextTick(() => {
      document.dispatchEvent(new Event("render-complete"));
    });
  }
};
</script>

