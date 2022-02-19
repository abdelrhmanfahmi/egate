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



// fortawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

//------ BootstrapVue -------------------
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

import './mixins'

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
// Styles: SCSS
import "./assets/scss/main.scss";
