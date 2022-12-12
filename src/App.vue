<template>
  <div id="app">
    <MainLayout />
  </div>
</template>

<script>
// @ is an alias to /src
import MainLayout from "@/layouts/MainLayout.vue";
import globalAxios from "@/services/global-axios";
import auth from "@/services/auth"
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

    this.checkCartValidity()


  },
  components: {
    MainLayout,
  },
  methods: {
    checkGuest() {
      globalAxios
        .post(`guest/generate-token`)
        .then((res) => {
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
    checkCartValidity() {
      auth.checkCartValidity().then(res => {
        let response = res.data.items
        response.forEach(element => {
          if (element.key === 'open_cart') {
            if (element.status == 1) {
              localStorage.setItem('cartAvailable', 'available')
            } else {
              localStorage.setItem('cartAvailable', 'notAvailable')

            }
          }
          if (element.key === 'open_rfq') {
            if (element.status == 1) {
              localStorage.setItem('RfqAvailable', 'available')
            } else {
              localStorage.setItem('RfqAvailable', 'notAvailable')

            }
          }
        });
      }).catch(err => {
        console.log(err);
      })
    }

  },
  computed: {
    guestId() {
      return this.$store.state.guestId;
    },
  },
  // mounted() {
  //   window.addEventListener('beforeunload', function (e) {
  //     alert('you closed the app')
  //     e.preventDefault();
  //     e.returnValue = '';
  //   });
  // }
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
