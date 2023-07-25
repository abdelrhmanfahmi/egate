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
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
library.add(fas, fab);
import { createMetaManager } from 'vue-meta'


loadFonts();
import "@/assets/scss/main.scss";
import "./plugins/swipper";

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


// Dot ENV
// require("dotenv").config();

const app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(i18n)
  .use(store)
  .use(vuetify)
  .use(Toast)
  .use(createMetaManager());
// .mount("#app");

router.isReady();
app.mount("#app");
