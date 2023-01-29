<template>
  <!-- app page that contain all pages  -->
  <div id="app">
    <!-- import main layout that hold all pages  -->
    <MainLayout />
  </div>
</template>

<script>
/**
 * app page .
 */

import MainLayout from "@/layouts/MainLayout.vue";
// import globalAxios from "@/services/global-axios";
import auth from "@/services/auth";
export default {
  name: "Home",
  created() {
    // let gestUser = localStorage.getItem("guest-id");

    /**
     * dispatch user data if exist || check guest.
     */

    // this.$store.dispatch("getUserGuestId");
    this.$store.dispatch("getUserInfo");
    let userExist = localStorage.getItem("buyerUserData");
    let guestUser = localStorage.getItem("guest-id");
    if (userExist === null && guestUser === null) {
      this.$store.dispatch("getUserGuestId");
    } else if (userExist === null && guestUser) {
      return guestUser;
    } else if (userExist) {
      localStorage.removeItem("guest-id");
    }
    // return

    this.checkCartValidity();
  },
  components: {
    MainLayout,
  },
  methods: {
    /**
    * @vuese
    * this function used to check Cart Validity (cart ,  rfq available or not )
    */
    checkCartValidity() {
      auth
        .checkCartValidity()
        .then((res) => {
          let response = res.data.items;
          response.forEach((element) => {
            if (element.key === "open_cart") {
              if (element.status == 1) {
                localStorage.setItem("cartAvailable", "available");
              } else {
                localStorage.setItem("cartAvailable", "notAvailable");
              }
            }
            if (element.key === "open_rfq") {
              if (element.status == 1) {
                localStorage.setItem("RfqAvailable", "available");
              } else {
                localStorage.setItem("RfqAvailable", "notAvailable");
              }
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
    * @vuese
    * logout Dynamically , use this function if you want to logout user according to the expiration_time comes from backend
    */
    logoutDynamically() {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'));
      let totalTime = userInfo.expires_in;
      console.log('totalTime', totalTime);
      let myInterval =  setInterval(() => {
          totalTime -= 1
          localStorage.setItem('logOutTime', totalTime)
          if(totalTime  == 0){
            clearInterval(myInterval)
            this.logout()
          }
        }, 1);


    }
  },
  computed: {
    guestId() {
      return this.$store.state.guestId;
    },
  },
  mounted() {
    // window.addEventListener('beforeunload', function (e) {
    //   alert('you closed the app')
    //   e.preventDefault();
    //   e.returnValue = '';
    // });
    this.checkCartValidity();
    // console.log("%c Hold Up!", "color: #7289DA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;");
    // console.log("%cHold-Up! %cWelcome To Using HumHum!" ,"color: #7289DA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;" ,  "color: red; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;");
    // console.log("%cWelcome To Using HumHum!" ,"color: red; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;");
    // this.logoutDynamically()
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
