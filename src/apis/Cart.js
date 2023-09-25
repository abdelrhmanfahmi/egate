// import Api from "./Api";
import globalAxios from "@/services/global-axios";

// import i18n from "../i18n/i18n";

import { useToast } from "vue-toastification";
const toast = useToast();

import store from "@/store";
export default {
  all() {
    return globalAxios.get(`client/cart`);
  },

  store(data) {
    store.dispatch('changeLoadingScreen', true)
    return globalAxios
      .post(`client/cart/add/${data.product_id}`, data)
      .then((res) => {
        if (res.status == 200) {
          toast.success(`${res.data.message}`, {
            position: "top-right",
            transition: "slide",
            hideProgressBar: false,
            showIcon: true,
            timeout: 3000,
            showCloseButton: true,
            swipeClose: true,
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(`${err.message}`, {
          position: "top-right",
          transition: "slide",
          hideProgressBar: false,
          showIcon: true,
          timeout: 3000,
          showCloseButton: true,
          swipeClose: true,
        });
      })
      .finally(() => {
        store.dispatch("cart/getCartProducts");
        store.dispatch('changeLoadingScreen', false)
      });
  },

  delete(payload) {
    store.dispatch('changeLoadingScreen', true)
    return globalAxios
      .delete(`client/cart/remove/${payload.product.id}`)
      .then((res) => {
        if (res.status == 200) {
          toast.success(`${payload.message}`, {
            position: "top-right",
            transition: "slide",
            hideProgressBar: false,
            showIcon: true,
            timeout: 3000,
            showCloseButton: true,
            swipeClose: true,
          });
        }
      })
      .catch((err) => {
        toast.error(`${err.message}`, {
          position: "top-right",
          transition: "slide",
          hideProgressBar: false,
          showIcon: true,
          timeout: 3000,
          showCloseButton: true,
          swipeClose: true,
        });
      })
      .finally(() => {
        store.dispatch("cart/getCartProducts");
        store.dispatch('changeLoadingScreen', false)
      });
  },

  update(data) {
    store.dispatch('changeLoadingScreen', true)
    return globalAxios
      .put(`client/cart/update`, data)
      .then((res) => {
        if (res.status == 200) {
          toast.success(`${res.data.message}`, {
            position: "top-right",
            transition: "slide",
            hideProgressBar: false,
            showIcon: true,
            timeout: 3000,
            showCloseButton: true,
            swipeClose: true,
          });
          store.dispatch("cart/getCartProducts");
        }
      })
      .catch((err) => {
        toast.error(`${err.message}`, {
          position: "top-right",
          transition: "slide",
          hideProgressBar: false,
          showIcon: true,
          timeout: 3000,
          showCloseButton: true,
          swipeClose: true,
        });
      })
      .finally(() => {
        store.dispatch("cart/getCartProducts");
        store.dispatch('changeLoadingScreen', false)
      });
  },

  moveToWish(data) {
    store.dispatch('changeLoadingScreen', true)
    return globalAxios
      .post(`client/cart/move-to-wishlist/${data.id}`)
      .then((res) => {
        if (res.status == 200) {
          toast.success(`${res.data.message}`, {
            position: "top-right",
            transition: "slide",
            hideProgressBar: false,
            showIcon: true,
            timeout: 3000,
            showCloseButton: true,
            swipeClose: true,
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(`${err.message}`, {
          position: "top-right",
          transition: "slide",
          hideProgressBar: false,
          showIcon: true,
          timeout: 3000,
          showCloseButton: true,
          swipeClose: true,
        });
      })
      .finally(() => {
        store.dispatch("cart/getCartProducts");
        store.dispatch('changeLoadingScreen', false)
        store.dispatch("wishlist/getWishlistItems");
      });
  },

  deleteAll() {
    store.dispatch('changeLoadingScreen', true)
    return globalAxios.delete(`customer/cart/empty`).then((res) => {
      if (res.status == 200) {
        toast.success(`${res.data.message}`, {
          position: "top-right",
          transition: "slide",
          hideProgressBar: false,
          showIcon: true,
          timeout: 3000,
          showCloseButton: true,
          swipeClose: true,
        });
      }
      store.dispatch("cart/getCartProducts");
    }).catch(err => {
      toast.error(`${err.message}`, {
        position: "top-right",
        transition: "slide",
        hideProgressBar: false,
        showIcon: true,
        timeout: 3000,
        showCloseButton: true,
        swipeClose: true,
      });
    }).finally(() => {
      store.dispatch('changeLoadingScreen', false)
    })
  },
};
