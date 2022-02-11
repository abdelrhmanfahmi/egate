import Vue from "vue";
import App from "./App.vue";
// Dot ENV
require('dotenv').config()

import router from "./router";
import store from "./store";

//------ BootstrapVue -------------------
import { BootstrapVue } from "bootstrap-vue";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
