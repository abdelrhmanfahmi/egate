<template>
  <div class="main-layout">
    <!-- top haeder that contain languages and countries  -->
    <TopHeader />
    <!-- nav bar  -->
    <Nav />
    <!-- alert div if user dosnt activate his account  -->
    <b-alert variant="danger" show v-if="massgeOfVerify">
      <b-container>
        {{ massgeOfVerify }}
      </b-container>
    </b-alert>

    <!-- router that contain pages  -->
    <transition name="slide-fade">
      <router-view class="view"></router-view>
    </transition>

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
    <Footer />
  </div>
</template>

<script>
import TopHeader from "@/components/layouts/TopHeader";
import Nav from "@/components/layouts/nav";
import Footer from "@/components/layouts/footer";

import { getMessaging, onMessage } from "firebase/messaging";
// import {messaging} from "@/plugins/firebase"

export default {
  components: {
    TopHeader,
    Nav,
    Footer,
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
  },
  data() {
    return {
      scTimer: 0,
      scY: 0,
      visible: false,
    };
  },
  mounted() {
    /**
     * start handle scroll function with window scroll
     * */
    window.addEventListener("scroll", this.handleScroll);

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
};
</script>
<style lang="scss" scoped>
/**
*layout style
*/
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.top-btn {
  position: fixed;
  right: 110px;
  bottom: 50px;
  padding: 0;
  background: transparent;
  color: #fff;
  border: none;
  margin: 0;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  border-radius: 50%;
  border: 1px solid #d4d5d8;
  z-index: 999999;
}

.view {
  min-height: 50vh;
}
</style>
