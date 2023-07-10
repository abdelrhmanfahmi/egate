<template>
  <div>
    <v-app>
      <v-container>
        <Register />
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Register from "@/components/Auth/Register.vue";
import { useMeta } from "vue-meta";
export default {
  components: {
    Register,
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  setup() {
    useMeta({
      title: "Register",
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