import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Suppliers from "../views/Suppliers.vue";
import Supplier from "../views/Supplier.vue";
import supplierProducts from "../views/supplierProducts.vue";
import ContactUs from "../views/Contact-Us.vue";
import Cart from "../views/Cart.vue";
import Wishlist from "../views/wishlist.vue";
import ForgetPassword from "../views/Forget-Password.vue";
import SingleProduct from "../views/single-Product/Single-Product.vue";
import auth from "./authRoutes";
import profileRoutes from "./profileRoutes";
import ViewOrderDetails from "../views/profile/ViewOrderDetails.vue";
import ReturnedRequest from "../views/profile/ReturnedRequest.vue";
import SearchResults from "../views/SearchResult.vue";
import SearchProducts from "../views/Search-Products.vue";
import QuotationDetails from "../views/profile/QuotationDetails.vue";
import VisaCheckoutDetails from "../views/Visa-Checkout-Details.vue";
import CheckoutDetails from "../views/Checkout-details.vue";
import CodBanckCheckoutDetails from "../views/COD-Bank-Ckeckout.vue";
import CheckoutBankDetails from "../views/Checkout-bank-details.vue";
import SuccessCheckout from "../views/SuccessCheckout";

import returnReplace from "../views/RetuenReplace.vue";
import returnRefund from "../views/ReturnRefund.vue";


import privacyPolicy from "../views/privacyPolicy.vue";
import termsConditions from "../views/termsConditions.vue";
import faq from "../views/faq.vue";
import Clients from "../views/Clients.vue";
import StandingOrder from "../views/StandingOrder.vue";
import Partners from "../views/Partners.vue";
import NewDeals from "../views/New-deals.vue";
import basketOfferDetails from "../views/basketOfferDetails.vue";
import CheckUserValidity from "../views/CheckUserValidity.vue";

import store from "../store";

// import test from "@/components/test.vue";
import { loadLanguageAsync } from "../i18n/i18n"

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
    path: "/best-deals",
    name: "bestDeals",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/bestDeals.vue"),
  },
  {
    path: "/monthly-offers",
    name: "monthlyOffers",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/monthlyOffers.vue"),
  },
  {
    path: "/viewOrderDetails",
    name: "ViewOrderDetails",
    component: ViewOrderDetails,
  },
  {
    path: "/ReturnedRequest",
    name: "ReturnedRequest",
    component: ReturnedRequest,
  },
  {
    path: "/searchResults",
    name: "SearchResults",
    component: SearchResults,
  },
  {
    path: "/profile/quotationDetails",
    name: "QuotationDetails",
    component: QuotationDetails,
  },
  {
    path: "/Search-Products",
    name: "SearchProducts",
    component: SearchProducts,
  },
  {
    path: "/visa-checkout-details",
    name: "visaCheckoutDetails",
    component: VisaCheckoutDetails,
  },
  {
    path: "/checkout-details",
    name: "CheckoutDetails",
    component: CheckoutDetails,
  },
  {
    path: "/CodBanckCheckoutDetails",
    name: "CodBanckCheckoutDetails",
    component: CodBanckCheckoutDetails,
  },
  {
    path: "/Checkout-bank-details",
    name: "CheckoutBankDetails",
    component: CheckoutBankDetails,
  },
  {
    path: "/success-checkout",
    name: "SuccessCheckout",
    component: SuccessCheckout,
  },
 
  { path: '*', beforeEnter: (to, from, next) => { next('/404') } },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/pageNotFound')
  },
  {
    path: "/return-replace",
    name: "returnReplace",
    component: returnReplace,
  },
  {
    path: "/return-refund",
    name: "returnRefund",
    component: returnRefund,
  },


  {
    path: "/privacyPolicy",
    name: "privacyPolicy",
    component: privacyPolicy,
  },
  {
    path: "/termsConditions",
    name: "termsConditions",
    component: termsConditions,
  },
  {
    path: "/faq",
    name: "faq",
    component: faq,
  },
  {
    path: "/Clients",
    name: "Clients",
    component: Clients,
  },
  {
    path: "/StandingOrder",
    name: "StandingOrder",
    component: StandingOrder,
  },
  {
    path: "/Partners",
    name: "Partners",
    component: Partners,
  },
  {
    path: "/new-deals",
    name: "new-deals",
    component: NewDeals,
  },
  {
    path: "/basketOfferDetails",
    name: "basketOfferDetails",
    component: basketOfferDetails,
  },
  {
    path: "/CheckUserValidity",
    name: "CheckUserValidity",
    component: CheckUserValidity,
  },
  // {
  //   path: "/test",
  //   name: "test",
  //   component: test,
  // },
  ...auth,
  profileRoutes,
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});
router.beforeEach((to, from, next) => {
  let guestId = localStorage.getItem('guest-id');
  let userExist = localStorage.getItem("buyerUserData");
  if (!userExist && !guestId) {
    store.dispatch("getUserGuestId");
  }
  const lang = localStorage.getItem('lang') || 'en'
  loadLanguageAsync(lang).then(() => next())
})

// router.beforeEach((to, from, next) => {
//   console.log('from.query.id' , from.query.id);
//   console.log('to.query.id' , to.query.id);
//   if (from.query.id && !to.query.id) {
//     if (to.path === from.path) {
//       // console.log('Identical routes detected')
//       return // This is a no-no via the documentation, but a bug in routing to identical routes strips query params, and this prevents that
//     }
//     next({path: to.path, query: {id: from.query.id}})
//   }

//   next()
// })

// if (from.query.id && !to.query.id) {
//   if (to.path === from.path) {
//     // console.log('Identical routes detected')
//     return // This is a no-no via the documentation, but a bug in routing to identical routes strips query params, and this prevents that
//   }
// }

export default router;
