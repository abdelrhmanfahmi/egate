<template>
    <div class="profile-layout">
        <div id="allTheNav">
            <nav id="navigator" class="navbar" :class="{ navbaropen: opened }">
                <span class="open-slide">
                    <a @click.prevent="opened = !opened">
                        <div>
                            <div class="bar" :class="{ topopen: opened }"></div>
                            <div class="bar" :class="{ midopen: opened }"></div>
                            <div class="bar" :class="{ botopen: opened }"></div>
                        </div>
                    </a>
                </span>
                <ul class="navbar-nav">
                    top nav
                </ul>
            </nav>
            <div id="side-menu" class="side-nav" :class="{ sidenavopen: opened }">
                <span @click.prevent="opened = !opened">hide menu</span>
                <!-- side menu if user is b2c  -->
                <SideMenu v-if="userInfo.item.type === 'b2c'" :userBades="userBades" />
                <!-- side menu if user is b2b (buyer)  -->
                <SideMenuB2b :userBades="userBades" v-else />
            </div>
            <div id="main" :class="{ mainopen: opened }">

                <!-- nav bar  -->
                <Nav />
                <!-- alert div if user dosnt activate his account  -->
                <b-alert variant="danger" show v-if="massgeOfVerify">
                    <b-container>
                        <router-link to="/otp-verification" class="otp-link text-danger">
                            {{ massgeOfVerify }} <font-awesome-icon icon="fa-solid fa-right-long" />
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                        stroke="#4a5568" stroke-width="1" stroke-linecap="square" stroke-linejoin="arcs">
                        <path d="M18 15l-6-6-6 6" />
                    </svg>
                </div>
                <cookizComponent />
                <Footer />
            </div>
        </div>

    </div>
</template>
  
<script>

import Nav from "@/components/layouts/nav";
import Footer from "@/components/layouts/footer";

import { getMessaging, onMessage } from "firebase/messaging";
// import {messaging} from "@/plugins/firebase"
import cookizComponent from "@/components/global/cookizComponent.vue"
/**
 *  main profile page
 * @displayName  main profile page
 */
import SideMenu from "@/components/pages/profile/SideMenu.vue";
import SideMenuB2b from "@/components/pages/profile/sideMenuB2b.vue";

export default {
    components: {
        Nav,
        Footer,
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
    },
    data() {
        return {
            scTimer: 0,
            scY: 0,
            visible: false,
            opened: false
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
    computed: {
        /**
         * @vuese
         * get user Bades for sidebar from store
         */
        userBades() {
            return this.$store.getters.userBadges; // this represent user profile side menu states
        },
    },
};
</script>
<style lang="scss" scoped>
.router-holder {
  min-height: 70vh;
}
@import '../assets/scss/new-design-files/_navbar.scss';
</style>
  