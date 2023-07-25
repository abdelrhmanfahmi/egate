<template>
    <v-app>
      <v-container>
        <MobileActivate />
      </v-container>
    </v-app>
  </template>
  
  <script>
  import MobileActivate from "@/components/Auth/Activation/MobileActivate.vue";
  import { useMeta } from "vue-meta";
  export default {
    components: {
      MobileActivate,
    },
    setup() {
      useMeta({
        title: "MobileActivate",
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
  
  <style></style>