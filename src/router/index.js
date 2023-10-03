import { createRouter, createWebHistory } from "vue-router";

// const Home = defineAsyncComponent(() =>
//   import('../views/Home.vue')
// );

import Home from '../views/Home.vue';

import auth from "./auth/index";
import profile from "./profile";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/faq",
    name: "faq",
    component: () => import("../views/Faq.vue"),
  },
  {
    path: "/privacyPolicy",
    name: "privacyPolicy",
    component: () => import("../views/PrivacyPolicy.vue"),
  },
  {
    path: "/productPage/:id",
    name: "productPage",
    props: true,
    component: () => import("../views/ProductPage.vue"),
  },
  {
    path: "/categoryPage/:id",
    name: "categoryPage",
    props: true,
    component: () => import("../views/CategoryPage.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("../views/Categories/categoryIndex.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../views/Checkout/index.vue"),
  },
  {
    path: "/checkoutConfirmation",
    name: "checkoutConfirmation",
    component: () => import("../views/Checkout/CheckoutConfirmation.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    name: "not-found",
    component: () => import("../views/404.vue"),
  },
  ...profile,
  ...auth,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});

export default router;
