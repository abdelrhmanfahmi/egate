// import Api from "./Api";
import globalAxios from "@/services/global-axios";

// import i18n from "../i18n/i18n";

import { useToast } from "vue-toastification";
const toast = useToast();

import store from "@/store";
export default {
  all() {
    return globalAxios.get(`cart`);
  },

  store(data) {
    store.dispatch('changeLoadingScreen', true)
    return globalAxios
      .post(`cart`, data, {
        headers: {
          'Accept': 'application/json',
          guest_token_uuid: localStorage.getItem('guest-token')
        }
      })
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
      .delete(`cart/${payload.product.id}`)
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
    console.log(data);
    let objSended = { quantity: data.quantity };
    console.log(objSended);
    store.dispatch('changeLoadingScreen', true)
    return globalAxios
      .patch(`cart/${data.product_id}`, objSended)
      .then((res) => {
        if (res.status == 200) {
          toast.success(`Quantiy Updated Successfully`, {
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
