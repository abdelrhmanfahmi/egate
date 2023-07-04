import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import auth from "./auth/index"
import profile from "./profile"
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
    path: "/productPage/:id",
    name: "productPage",
    props: true,
    component: () => import("../views/ProductPage.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("../views/Categories/index.vue"),
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
