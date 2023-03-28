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
import checkApiControls from "@/services/apiControls";
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
  },
  components: {
    MainLayout,
  },
  methods: {
    /**
     * @vuese
     * this function used to check Cart Validity (cart ,  rfq available or not )
     */
    // checkCartValidity() {
    //   auth
    //     .checkCartValidity()
    //     .then((res) => {
    //       let response = res.data.items;
    //       response.forEach((element) => {
    //         if (element.key === "open_cart") {
    //           if (element.status == 1) {
    //             localStorage.setItem("add_to_cart", "available");
    //           } else {
    //             localStorage.setItem("add_to_cart", "notAvailable");
    //           }
    //         }
    //         if (element.key === "open_rfq") {
    //           if (element.status == 1) {
    //             localStorage.setItem("RFQ", "available");
    //           } else {
    //             localStorage.setItem("RFQ", "notAvailable");
    //           }
    //         }
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    /**
     * @vuese
     * check Api Controls
     */
    checkApiControlsFunction() {
      checkApiControls
        .checkApiControls()
        .then((res) => {
          console.log("controls", res);
          console.log(res);
          let result = res.data.items;
          // for (const key in result) {
          //   if (result.hasOwnProperty.call(result, key)) {
          //     let element = result[key];
          //     if (element.portal === "client") {
          //     }
          //   }
          // }
          for (let index = 0; index < result.length; index++) {
            if (result[index].portal === 'client') {
              const element = result[index];
             
              if(element.status == 1){
                localStorage.setItem(element.api_name , 'available')
              }else{
                localStorage.setItem(element.api_name , 'notAvailable')
              }

            }
          }
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
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let totalTime = userInfo.expires_in;
      console.log("totalTime", totalTime);
      let myInterval = setInterval(() => {
        totalTime -= 1;
        localStorage.setItem("logOutTime", totalTime);
        if (totalTime == 0) {
          clearInterval(myInterval);
          this.logout();
        }
      }, 1);
    },
    getSiteImages() {
      auth
        .getSiteImages()
        .then((res) => {
          let result = res.data.items;
          // result.forEach(element => {
          //   if(element.key == 'Website Portal Logo' && element.key !== "null"  && element.key !== null){
          //     this.siteLogo = element.value
          //   }

          // });
          for (const key in result) {
            if (result.hasOwnProperty.call(result, key)) {
              let element = result[key];
              if (element.key == "Website Portal Logo") {
                if (
                  element.type == "image" &&
                  element.value !== null &&
                  element.value !== "null"
                ) {
                  this.siteLogo = element.value;
                  localStorage.setItem("siteLogo", this.siteLogo);
                } else {
                  let currentLogo = document.getElementById("siteLogo");
                  localStorage.setItem("siteLogo", currentLogo.src);
                }
              }
              if (element.key == "Admin Portal Logo") {
                if (
                  element.type == "image" &&
                  element.value !== null &&
                  element.value !== "null"
                ) {
                  localStorage.setItem("adminLogo", element.value);
                } else {
                  let currentLogo = document.getElementById("adminLogo");
                  localStorage.setItem("adminLogo", currentLogo.src);
                }
              }
              if (element.key == "Website Portal Title") {
                let siteTitle = document.getElementById("siteTitle");
                let siteTitleText =
                  document.getElementById("siteTitle").textContent;
                if (
                  element.type == "text" &&
                  element.value !== null &&
                  element.value !== "null"
                ) {
                  this.siteTitle = element.value;
                  siteTitle.textContent = element.value;
                } else {
                  siteTitle.textContent = siteTitleText;
                }
              }
              if (element.key == "Website Portal Icon") {
                let favicon = document.getElementById("favicon");
                let faviconHref = document.getElementById("favicon").href;
                if (
                  element.type == "icon" &&
                  element.value !== null &&
                  element.value !== "null"
                ) {
                  favicon.href =
                    process.env.VUE_APP_FOR_IMAGES +
                    "storage/site_settings_image/" +
                    element.value;
                } else {
                  favicon.href = faviconHref;
                }
              }

              if (element.key == "arabic_status") {
                let availability = localStorage.getItem("arabic");
                if (
                  (availability &&
                    availability == "yes" &&
                    element.value == 1) ||
                  (availability &&
                    availability == "yes" &&
                    element.value == "1")
                ) {
                  localStorage.setItem("arabic", "yes");
                } else if (
                  (availability &&
                    availability == "yes" &&
                    element.value == 0) ||
                  (availability &&
                    availability == "yes" &&
                    element.value == "0")
                ) {
                  localStorage.setItem("arabic", "no");
                  localStorage.setItem("lang", "en");
                  setTimeout(() => {
                    location.reload();
                  }, 250);
                } else if (
                  (availability &&
                    availability == "no" &&
                    element.value == 1) ||
                  (availability && availability == "no" && element.value == "1")
                ) {
                  localStorage.setItem("arabic", "yes");
                  setTimeout(() => {
                    location.reload();
                  }, 250);
                } else if (
                  (availability &&
                    availability == "no" &&
                    element.value == 0) ||
                  (availability && availability == "no" && element.value == "0")
                ) {
                  localStorage.setItem("arabic", "no");
                }
                if (!availability) {
                  if (element.value == 1 || element.value == "1") {
                    localStorage.setItem("arabic", "yes");
                    setTimeout(() => {
                      location.reload();
                    }, 250);
                  } else if (element.value == 0 || element.value == "0") {
                    localStorage.setItem("arabic", "no");
                    setTimeout(() => {
                      this.getSiteImages();
                    }, 250);
                  }
                }
              }

              // const favicon = document.getElementById("favicon");
              // favicon.href = "https://www.google.com/favicon.ico";

              // const siteTitle = document.getElementById("siteTitle");
              // siteTitle.textContent = "Reda site";
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
    // this.checkCartValidity();
    this.getSiteImages();
    // console.log("%c Hold Up!", "color: #7289DA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;");
    // console.log("%cHold-Up! %cWelcome To Using HumHum!" ,"color: #7289DA; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;" ,  "color: red; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;");
    // console.log("%cWelcome To Using HumHum!" ,"color: red; -webkit-text-stroke: 2px black; font-size: 72px; font-weight: bold;");
    // this.logoutDynamically()
    this.checkApiControlsFunction();
  },
  data() {
    return {
      siteLogo: "@/assets/images/logo.png",
      siteTitle: "humhum",
      siteIcon: "@/src/assets/images/ab.png",
    };
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
