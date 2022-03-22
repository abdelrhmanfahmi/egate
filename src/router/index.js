import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Suppliers from "../views/Suppliers.vue";
import Supplier from "../views/Supplier.vue";
import Corporat from "../views/Corporat.vue";
import ContactUs from "../views/Contact-Us.vue";
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
        path: "/supplier",
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
            import(/* webpackChunkName: "about" */ "../views/categories/variants.vue"),
    },
    ...auth,
    profileRoutes,
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
