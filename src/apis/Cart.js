// import Api from "./Api";
import globalAxios from "@/services/global-axios";

// import i18n from "../i18n/i18n";

import { useToast } from "vue-toastification";
const toast = useToast();

import store from "@/store";
export default {
  all() {
    let isLoggedIn = store.getters['Auth/isAuthenticated'];
    if (isLoggedIn) {
      return globalAxios.get(`cart`, {
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('EGate-userInfo')).token}`
        }
      });
    } else {
      return globalAxios.get(`cart`, {
        headers: {
          'Accept': 'application/json',
          'guest-token-uuid': localStorage.getItem('guest-token')
        }
      });
    }
  },

  store(data) {
    store.dispatch('changeLoadingScreen', true)
    let isLoggedIn = store.getters['Auth/isAuthenticated'];
    if (isLoggedIn) {
      return globalAxios
        .post(`cart`, data, {
          headers: {
            'Accept': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('EGate-userInfo')).token}`
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
          toast.error(`${err.response.data.message}`, {
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
    } else {
      return globalAxios
        .post(`cart`, data, {
          headers: {
            'Accept': 'application/json',
            'guest-token-uuid': localStorage.getItem('guest-token')
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
          toast.error(`${err.response.data.message}`, {
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
    }
  },

  update(data) {
    let objSended = { quantity: data.quantity };
    store.dispatch('changeLoadingScreen', true)
    let isLoggedIn = store.getters['Auth/isAuthenticated'];
    if (isLoggedIn) {
      return globalAxios
        .patch(`cart/${data.product_id}`, objSended, {
          headers: {
            'Accept': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('EGate-userInfo')).token}`
          }
        })
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
          toast.error(`${err.response.data.message}`, {
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
    } else {
      return globalAxios
        .patch(`cart/${data.product_id}`, objSended, {
          headers: {
            'Accept': 'application/json',
            'guest-token-uuid': localStorage.getItem('guest-token')
          }
        })
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
          toast.error(`${err.response.data.message}`, {
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
    }
  },
  delete(payload) {
    store.dispatch('changeLoadingScreen', true);
    let isLoggedIn = store.getters['Auth/isAuthenticated'];
    if (isLoggedIn) {
      return globalAxios
        .delete(`cart/${payload.product.id}`, {
          headers: {
            'Accept': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('EGate-userInfo')).token}`
          }
        })
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
    } else {
      return globalAxios
        .delete(`cart/${payload.product.id}`, {
          headers: {
            'Accept': 'application/json',
            'guest-token-uuid': localStorage.getItem('guest-token')
          }
        })
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
    }
  },
  deleteAll(data) {
    store.dispatch('changeLoadingScreen', true);
    let isLoggedIn = store.getters['Auth/isAuthenticated'];
    if (isLoggedIn) {
      return globalAxios.post(`cart/items/pluck-delete`, { ids: data }, {
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('EGate-userInfo')).token}`
        }
      }).then((res) => {
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
    } else {
      return globalAxios.post(`cart/items/pluck-delete`, { ids: data }, {
        headers: {
          'Accept': 'application/json',
          'guest-token-uuid': localStorage.getItem('guest-token')
        }
      }).then((res) => {
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
    }

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
};
