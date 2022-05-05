import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Suppliers from "../views/Suppliers.vue";
import Supplier from "../views/Supplier.vue";
import Corporat from "../views/Corporat.vue";
import supplierProducts from "../views/supplierProducts.vue";
import ContactUs from "../views/Contact-Us.vue";
import Cart from "../views/Cart.vue";
import Wishlist from "../views/wishlist.vue";
import Payment from "../views/Payment.vue";
import ForgetPassword from "../views/Forget-Password.vue";
import Items from "../views/Items.vue";
import SingleProduct from "../views/single-Product/Single-Product.vue";
import auth from "./authRoutes";
import profileRoutes from "./profileRoutes";

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
    path: "/suppliers/:id",
    name: "Supplier",
    component: Supplier,
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
    path: "/supplier-products",
    name: "supplierProducts",
    component: supplierProducts,
  },
  {
    path: "/contact-us",
    name: "ContactUs",
    component: ContactUs,
  },
  {
    path: "/forget-password",
    name: "ForgetPassword",
    component: ForgetPassword,
  },
  {
    path: "/items",
    name: "Items",
    component: Items,
  },
  {
    path: "/details",
    name: "Details",
    component: SingleProduct,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: Wishlist,
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
  },
  // {
  //   path: "/categories",
  //   name: "categories",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/categories.vue"),
  //   children: [
  //     {
  //       path: "/categories/:_slug",
  //       name: "subCategory",
  //       component: () =>
  //         import(/* webpackChunkName: "about" */ "../views/categories/_slug.vue"),
  //     },
  //   ],
  // },
  {
    path: "/categories/:slug",
    name: "subCategory",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/categories/_slug.vue"),
  },
  {
    path: "/categories/:slug/variants",
    name: "variants",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/categories/variants.vue"
      ),
  },
  {
    path: "/order-shipping",
    name: "shipping",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/OrderShipping.vue"),
  },
  {
    path: "/best-deals",
    name: "bestDeals",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/bestDeals.vue"),
  },
  ...auth,
  profileRoutes,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    window.scrollTo(0,0);
  },
});

export default router;
