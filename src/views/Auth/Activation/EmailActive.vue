<template>
    <v-app>
      <v-container>
        <EmailActive />
      </v-container>
    </v-app>
  </template>
  
  <script>
  import EmailActive from "@/components/Auth/Activation/EmailActive.vue";
  import { useMeta } from "vue-meta";
  export default {
    components: {
      EmailActive,
    },
    setup() {
      useMeta({
        title: "EmailActive",
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