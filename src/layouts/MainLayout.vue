<template>
  <div class="profile-layout b2cLayout" :class="$i18n.locale">
    <div id="allTheNav">
      <nav
        id="navigator"
        class="navbar"
        :class="{ navbaropen: opened }"
        title="open menu"
        v-if="buyerUserData && ProfileLayout == true"
      >
        <span class="open-slide" v-if="!opened">
          <a @click.prevent="opened = !opened">
            <div>
              <div class="bar" :class="{ topopen: opened }"></div>
              <div class="bar" :class="{ midopen: opened }"></div>
              <div class="bar" :class="{ botopen: opened }"></div>
            </div>
          </a>
        </span>
        <ul class="navbar-nav">
          <!-- top nav -->
        </ul>
      </nav>
      <div
        class="holder"
        :class="{
          sideB2cOpen: opened && buyerUserData.type == 'b2c',
          sideB2cClosed: !opened && buyerUserData.type == 'b2c',
        }"
      >
        <div
          id="side-menu"
          class="side-nav"
          :class="{ sidenavopen: opened }"
          v-if="ProfileLayout == true && buyerUserData.type == 'b2c'"
        >
          <div
            @click.prevent="opened = !opened"
            class="d-flex align-items-center toggle-menu"
          >
            <span
              ><font-awesome-icon icon="fa-solid fa-bars-staggered" size="3x"
            /></span>
            <span class="mx-2 h4">{{ $t("profile.hideMenu") }}</span>
          </div>
          <!-- side menu if user is b2c  -->
          <div class="" v-if="buyerUserData">
            <SideMenu
              v-if="userInfo.item.type === 'b2c'"
              :userBades="userBades"
              @closeSideMenu="opened = false"
              :opened="opened"
            />
            <!-- side menu if user is b2b (buyer)  -->
            <SideMenuB2b
              :userBades="userBades"
              v-else
              @closeSideMenu="opened = false"
              :opened="opened"
            />
          </div>
        </div>
        <div
          id="main"
          :class="{
            mainopen: ProfileLayout && opened == true,
            mainClose: ProfileLayout && opened == false,
          }"
        >
          <!-- nav bar  -->
          <Nav />
          <!-- alert div if user dosnt activate his account  -->
          <b-alert variant="danger" show v-if="massgeOfVerify">
            <b-container>
              <router-link to="/otp-verification" class="otp-link text-danger">
                {{ massgeOfVerify }}
                <font-awesome-icon icon="fa-solid fa-right-long" />
              </router-link>
            </b-container>
          </b-alert>

          <!-- router that contain pages  -->
          <div class="router-holder">
            <transition name="slide-fade">
              <router-view class="view"></router-view>
            </transition>
          </div>

          <!-- button to scroll to top  -->
          <div class="top-btn" @click="goTop" v-if="visible">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4a5568"
              stroke-width="1"
              stroke-linecap="square"
              stroke-linejoin="arcs"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </div>
          <cookizComponent />
          <NewFooter />
          <!-- <Footer /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/layouts/nav";
// import Footer from "@/components/layouts/footer";
import NewFooter from "@/components/layouts/NewFooter";

import { getMessaging, onMessage } from "firebase/messaging";
// import {messaging} from "@/plugins/firebase"
import cookizComponent from "@/components/global/cookizComponent.vue";
/**
 *  main profile page
 * @displayName  main profile page
 */
import SideMenu from "@/components/pages/profile/SideMenu.vue";
import SideMenuB2b from "@/components/pages/profile/sideMenuB2b.vue";

export default {
  components: {
    Nav,
    // Footer,
    NewFooter,
    cookizComponent,
    SideMenu,
    SideMenuB2b,
  },
  methods: {
    /**
     * got to top function
     * */
    goTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    /**
     * handle scroll to top function
     * */
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
      if (window.scrollY > 500) {
        this.visible = true;
      } else {
        this.visible = false;
      }
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    /**
     * check notifications
     * */
    notifyMe({ notification: notific, ...data }) {
      let notification;
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        notification = new Notification(notific.title, {
          body: notific.body,
          icon: "@/assets/images/logo.png",
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            notification = new Notification(notific.title, {
              body: notific.body,
              icon: "@/assets/images/logo.png",
            });
          }
        });
      }
      /**
       * notification click function
       * */
      notification.addEventListener("click", function (event) {
        console.log(event, data);
        if (data.type && data.type_id) {
          let url = "/";
          switch (data.type) {
            case "order":
              url = `/viewOrderDetails?id=${data.type_id}`;
              break;
            case "product":
              url = `/product/details/${data.type_id}`;
              break;
            // case "quote":
            //   url = `/quotes/quote-details/${data.id}`;
            //   break;
            case "return":
              url = `/ReturnedRequest?UUID=${data.type_id}`;
              break;
            // case "financials":
            //   url = `/financials/transactions`;
            //   break;
            default:
              url = "/";
          }

          this.$router.push(url);
        }
      });
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 992) {
        this.mobile = true;
        this.opened = false;
        return;
      }
      this.mobile = false;
      this.opened = true;
      return;
    },
  },
  data() {
    return {
      scTimer: 0,
      scY: 0,
      visible: false,
      opened: true,
      windowWidth: null,
      mobile: null,
    };
  },
  mounted() {
    /**
     * start handle scroll function with window scroll
     * */
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();

    const messaging = getMessaging();

    /**
     * onMessage function that belongs to notification function
     * */

    onMessage(messaging, (payload) => {
      // console.log("forground", payload);
      const { data } = payload;
      this.notifyMe(data);

      if (this.buyerUserData) {
        this.$store.dispatch("getNotifications");
      }
    });

    // if (this.newsletterShow) {

    if (this.buyerUserData.is_verified) {
      localStorage.removeItem("massege");
    }
  },
  created() {
    /**
     * generate Firebase Token function
     * */
    this.$store.dispatch("generateFirebaseToken");

    /**
     * get Notifications function if buyer
     * */

    if (this.buyerUserData) {
      this.$store.dispatch("getNotifications");
    }
  },
  computed: {
    /**
     * @vuese
     * get user Bades for sidebar from store
     */
    userBades() {
      return this.$store.getters.userBadges; // this represent user profile side menu states
    },
    ProfileLayout() {
      return this.$route.path.includes("profile") ? true : false;
    },
  },
};
</script>
<style lang="scss" scoped>
.router-holder {
  min-height: 70vh;
}
@import "../assets/scss/new-design-files/_navbar.scss";
.toggle-menu {
  cursor: pointer;
  padding: 20px;
}
</style>
