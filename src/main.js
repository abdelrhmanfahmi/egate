import { createApp } from "vue";

/* add fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* add some free styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// forLang
import i18n from "./i18n/i18n";
// forLang
let lang = null;
lang = localStorage.getItem("lang") || "en";
document.documentElement.lang = lang;
if (lang === "ar") {
  document.documentElement.dir = "rtl";
}

import App from "./App.vue";
import router from "./router";
import store from "./store";
import flatpickr from "flatpickr";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

library.add(fas, fab);
import { createMetaManager } from "vue-meta";

loadFonts();
import "@/assets/scss/main.scss";
import "./plugins/swipper";

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import { myMixin } from "./mixins.js";


import { messaging } from "@/firebaseInit.js";
import { getToken, onMessage } from "firebase/messaging";

// Request user's permission
async function requestUserPermission() {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BGue9-PAXF0yP_nkXACcvTI07TCDZ6DyJOdjmIRGLlyZUhZkyZTV6FjgsDe1tKUrSFiUF-S9ir3R3869qlGQFQ8",
    });
    console.log("User has granted permission!");
    localStorage.setItem("firebaseToken", token);
  } catch (error) {
    console.log("Failed to get permission or token:", error);
  }
}

requestUserPermission();

// Handle incoming messages
onMessage(messaging, (payload) => {
  console.log("Message received:", payload);
  // Handle the notification (e.g., display a browser notification)

  // For example, display using the native Notification API
  const iconUrl = process.env.VUE_APP_BASE_URL + 'favicon.png';

  if (Notification.permission === "granted") {
    new Notification(payload.notification.title, {
      body: payload.notification.body,
      // icon: payload.notification.icon ? payload.notification.icon : iconUrl,
      icon: '@/src/assets/logo.png',
    });
  }
  store.dispatch('notification/getNotifications')

});


// Dot ENV
// require("dotenv").config();

const app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(i18n)
  .use(store)
  .use(flatpickr)
  .use(vuetify)
  .use(Toast)
  .use(createMetaManager());
// .mount("#app");

app.mixin(myMixin);

router.isReady();
app.mount("#app");
