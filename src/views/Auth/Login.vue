<template>
  <v-app>
    <v-container>
      <Login />
    </v-container>
  </v-app>
</template>

<script>
import Login from "@/components/Auth/Login.vue";
import { useMeta } from "vue-meta";
export default {
  components: {
    Login,
  },
  setup() {
    useMeta({
      title: "Login",
      htmlAttrs: { lang: "en", amp: true },
    });
  },
};
</script>

<style></style>