<template>
  <div id="app">
    <MainLayout />
  </div>
</template>

<script>
// @ is an alias to /src
import MainLayout from "@/layouts/MainLayout.vue";
import globalAxios from "@/services/global-axios";
export default {
  name: "Home",
  created() {
    // let gestUser = localStorage.getItem("guest-id");
    this.$store.dispatch("getUserGuestId");
    this.$store.dispatch("getUserInfo")
    let userExist = localStorage.getItem("buyerUserData");
    let guestUser = localStorage.getItem("guest-id");
    if (userExist === null && guestUser === null) {
      this.checkGuest();
    } else if (userExist === null && guestUser) {
      return guestUser;
    } else if (userExist) {
      localStorage.removeItem("guest-id");
    }
    // return

    // if (localStorage.getItem("guest-id") === null) {
    //   console.log("gest not exist");
    // }else{
    //   console.log("gest exist");
    // }
    if (!localStorage.getItem("country")) {

      this.getDefaultCaounrt()
    }
  },
  components: {
    MainLayout,
  },
  methods: {
    checkGuest() {
      globalAxios
        .post(`guest/generate-token`)
        .then((res) => {
          console.log(res);
          localStorage.setItem("guest-id", res.data.items.uuid);
        })
        .catch((err) => {
          console.log(err);
        });

      // globalAxios.interceptors.request.use(
      //   (config) => {
      //     const guestId = localStorage.getItem("guest-id")
      //     if (guestId) {
      //       config.headers["guest-id"] = guestId;
      //     }
      //     return config;
      //   },
      //   (error) => Promise.reject(error)
      // );
    },
    getDefaultCaounrt() {
      globalAxios.get('site-settings/default/country').then(res => {

        // this.countries.forEach((country) => {
        //   if (country.is_default == 1) {
        //     window.localStorage.setItem("country", JSON.stringify(country));
        //     if (localStorage.getItem("currency") === null) {
        //       localStorage.setItem("currency", country.currencies[0].code);
        //     }
        //     this.myCurrencies = country.currencies;
        //   }
        // });
        window.localStorage.setItem("country", JSON.stringify(res.data.items));

        if (localStorage.getItem("currency") === null) {
          localStorage.setItem("currency", JSON.stringify(res.data.items.currencies[0].code));
        }
      })
      .then(() =>{
        setTimeout(() => {
          location.reload()
        }, 500);
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  computed: {
    guestId() {
      return this.$store.state.guestId;
    },
  },
};
</script>

<style lang="scss">
/* width */
::-webkit-scrollbar {
  width: 5px;
}

::-moz-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: transparent;
  border-radius: 10px;
}

::-moz-scrollbar-track {
  box-shadow: transparent;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #262626;
  border-radius: 10px;
}

::-moz-scrollbar-thumb {
  background: #262626;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}

::-moz-scrollbar-thumb:hover {
  background: #b30000;
}
</style>
