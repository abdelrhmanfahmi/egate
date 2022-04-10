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
  created() {
    // let gestUser = localStorage.getItem("guest-id");

    this.$store.dispatch("getUserInfo");
    let userExist = localStorage.getItem("userData");
    let guestUser = localStorage.getItem("guest-id");
    if (userExist === null && guestUser === null ) {
      this.checkGuest();
    } else if(userExist === null && guestUser) {
      return null
    }else if(userExist){
      localStorage.removeItem('guest-id')
    }
    // return

    // if (localStorage.getItem("guest-id") === null) {
    //   console.log("gest not exist");
    // }else{
    //   console.log("gest exist");
    // }
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
          alert("user not exist");
          localStorage.setItem("guest-id", res.data.items.uuid);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: transparent;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #262626;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}
</style>
