import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Suppliers from "../views/Suppliers.vue";
import Corporat from "../views/Corporat.vue";
import ContactUs from "../views/Contact-Us.vue"; 
import Register from "../views/auth/register.vue";
import OtaVerification from "../views/auth/OtpVerification.vue"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/suppliers",
    name: "Suppliers",
    component: Suppliers,
  },
  {
    path: "/about",
    name: "About",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/corporat",
    name: "Corporat",
    component: Corporat,
  },
  {
    path: "/contact-us",
    name: "ContactUs",
    component: ContactUs,
  },
  {
    path: "/user-register",
    name: "Register",
    component: Register,
  },
  {
    path: "/ota-verification",
    name: "OtaVerification",
    component: OtaVerification,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
