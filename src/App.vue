<template>
  <div id="app">
    <MainLayout />
  </div>
</template>

<script>
// @ is an alias to /src
import MainLayout from "@/layouts/MainLayout.vue";
import { baseURL } from "@/apis/Api";
import axios from "axios";
export default {
  name: "Home",
  mounted() {
    // let gestUser = localStorage.getItem("guest-id");

    this.$store.dispatch("getUserInfo");
    let userExist = localStorage.getItem("userData");
    if (!userExist) {
      this.checkGuest();
    } else {
      localStorage.removeItem("guest-id");
    }
  },
  components: {
    MainLayout,
  },
  methods: {
    checkGuest() {
      axios
        .post(`${baseURL}guest/generate-token`)
        .then((res) => {
          console.log(res);
          localStorage.setItem("guest-id", res.data.items.uuid);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss"></style>
