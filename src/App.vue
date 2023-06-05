<template>
  <!-- app page that contain all pages  -->
  <div id="app">
    <LoadingScreen v-if="isLoading"></LoadingScreen>
    <!-- import main layout that hold all pages  -->
    <div class="" v-if="checkLayout == 'B2B'">
      <ProfileB2BLayout />
    </div>
    <div class="" v-else>
      <MainLayout />
    </div>
  </div>
</template>

<script>
/**
 * app page .
 */

import MainLayout from "@/layouts/MainLayout.vue";
import ProfileB2BLayout from "@/layouts/ProfileB2BLayout.vue";
import auth from "@/services/auth";
import checkApiControls from "@/services/apiControls";
import LoadingScreen from "@/components/global/LoadingScreen.vue";
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
    ProfileB2BLayout,
    LoadingScreen,
  },
  methods: {
    /**
     * @vuese
     * check Api Controls
     */
    checkApiControlsFunction() {
      checkApiControls
        .checkApiControls()
        .then((res) => {
          let result = res.data.items;
          for (let index = 0; index < result.length; index++) {
            if (result[index].portal === "client") {
              const element = result[index];

              if (element.status == 1) {
                localStorage.setItem(element.api_name, "available");
              } else {
                localStorage.setItem(element.api_name, "notAvailable");
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

              // setting theming

              // main_color
              if (element.key == "main_color") {
                if (
                  element.value && 
                  element.value !== null &&
                  element.value !== "null" && 
                  element.value.trim() !== ""
                ) {
                  document.documentElement.style.setProperty('--main-color', element.value)
                } else {
                  document.documentElement.style.setProperty('--main-color', '#EF4923')
                }
              }
              // text_color
              if (element.key == "text_color") {
                if (
                  element.value && 
                  element.value !== null &&
                  element.value !== "null" && 
                  element.value.trim() !== ""
                ) {
                  document.documentElement.style.setProperty('--text-color', element.value)
                } else {
                  document.documentElement.style.setProperty('--text-color', '#040303')
                }
              }
              // header_color
              if (element.key == "header_color") {
                if (
                  element.value && 
                  element.value !== null &&
                  element.value !== "null" && 
                  element.value.trim() !== ""
                ) {
                  document.documentElement.style.setProperty('--header-color', element.value)
                } else {
                  document.documentElement.style.setProperty('--header-color', '#312620')
                }
              }
              // tabs_color
              if (element.key == "tabs_color") {
                if (
                  element.value && 
                  element.value !== null &&
                  element.value !== "null" && 
                  element.value.trim() !== ""
                ) {
                  document.documentElement.style.setProperty('--tabs-color', element.value)
                } else {
                  document.documentElement.style.setProperty('--tabs-color', '#6e6a67')
                }
              }
              // gray_color
              if (element.key == "gray_color") {
                if (
                  element.value && 
                  element.value !== null &&
                  element.value !== "null" && 
                  element.value.trim() !== ""
                ) {
                  document.documentElement.style.setProperty('--gray', element.value)
                } else {
                  document.documentElement.style.setProperty('--gray', '#ADACAB')
                }
              }
              // body_color
              if (element.key == "body_color") {
                if (
                  element.value && 
                  element.value !== null &&
                  element.value !== "null" && 
                  element.value.trim() !== ""
                ) {
                  document.documentElement.style.setProperty('--body-text-color', element.value)
                } else {
                  document.documentElement.style.setProperty('--body-text-color', '#000')
                }
              }
              // background_color
              if (element.key == "background_color") {
                if (
                  element.value && 
                  element.value !== null &&
                  element.value !== "null" && 
                  element.value.trim() !== ""
                ) {
                  document.documentElement.style.setProperty('--body-background', element.value)
                } else {
                  document.documentElement.style.setProperty('--body-background', '#fff')
                }
              }
              // top_header_color
              if (element.key == "top_header_color") {
                if (
                  element.value && 
                  element.value !== null &&
                  element.value !== "null" && 
                  element.value.trim() !== ""
                ) {
                  document.documentElement.style.setProperty('--top-header-color', element.value)
                } else {
                  document.documentElement.style.setProperty('--top-header-color', '#f0f0f0')
                }
              }
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
    checkLayout() {
      return (this.$route.path.includes("profile") &&
        this.buyerUserData.type == "buyer") ||
        (this.$route.path.includes("profile") &&
          this.buyerUserData.type == "supplier" &&
          this.buyerUserData.is_buyer == 1)
        ? "B2B"
        : "B2C";
    },
    checkProfile(){
      return this.$route.path.includes("profile") && !this.buyerUserData ? true : false
    }
  },
  mounted() {
    this.getSiteImages();
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
    this.checkApiControlsFunction();
    if(document.location.href.includes("force_login")){
      if(document.location.href.force_login){
        this.logout()
      }
    }
    if(this.checkProfile == true){
      this.logout()
    }
  },
  data() {
    return {
      siteLogo: "@/assets/images/logo.png",
      siteTitle: "humhum",
      siteIcon: "@/src/assets/images/ab.png",
      isLoading: true,
    };
  },
  watch: {
    $route() {
      let currencyTrim = document
        .querySelector("#myCurrency-code")
        .innerText.trim();
      setTimeout(() => {
        if (currencyTrim == "") {
          let currency = document.querySelector("#myCurrency-code");
          if (!localStorage.getItem("currency")) {
            currency.innerText = JSON.parse(
              this.selectedCountry
            ).currencies[0].code;
          } else {
            currency.innerText = localStorage.getItem("currency");
          }
        }
      }, 5000);
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
