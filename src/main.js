import Vue from "vue";
import App from "./App.vue";

// Dot ENV
require("dotenv").config();

// i18n
import i18n from "./i18n/i18n";

// router
import router from "./router";

// store
import store from "./store";

// forLang
let lang = null;
lang = localStorage.getItem("lang") || "en";
document.documentElement.lang = lang;
if (lang === "ar") {
  document.documentElement.dir = "rtl";
}

/* add fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* add some free styles */
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas, fab);
Vue.component("font-awesome-icon", FontAwesomeIcon);

//------ BootstrapVue -------------------
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);

import VueEllipseProgress from "vue-ellipse-progress";

Vue.use(VueEllipseProgress);

import vmodal from "vue-js-modal";
Vue.use(vmodal);

  
import VueSocialChat from 'vue-social-chat'

Vue.use(VueSocialChat)

import "./mixins";
import "./filters"

// Import the component
import VueSkeletonLoader from "skeleton-loader-vue";

// Register the component globally
Vue.component("vue-skeleton-loader", VueSkeletonLoader);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
// Styles: SCSS
import "./assets/scss/main.scss";
