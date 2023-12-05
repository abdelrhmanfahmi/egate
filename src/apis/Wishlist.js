// import Api from "./Api";
import globalAxios from "@/services/global-axios";

import { useToast } from "vue-toastification";
const toast = useToast();

import store from "@/store";

export default {
  all() {
    return globalAxios.get(`client/wishlist`);
  },

  store(payload) {
    
    store.dispatch('changeLoadingScreen' , true)
    return globalAxios.post(`client/wishlist/${payload.id}`).then((res)=>{
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
    }).catch((err) => {
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
      store.dispatch("wishlist/getWishlistItems");
      store.dispatch('changeLoadingScreen' , false)
    });
  },
  
  moveToCart(payload){
    store.dispatch('changeLoadingScreen' , true)
    return globalAxios.post(`client/wishlist/${payload.product.id}/move-to-cart`,{}).then((res)=>{
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
    }).catch((err) => {
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
      store.dispatch("wishlist/getWishlistItems");
      store.dispatch("cart/getCartProducts");
      store.dispatch('changeLoadingScreen' , false)
    });
  },

  //   For removing the product from the wishlist, you need to hit the same add API again. Just like a toggle. It will remove if the wishlist is already added.

  // #
  delete(payload) {
    store.dispatch('changeLoadingScreen' , true)
    return globalAxios
      .post(`client/wishlist/${payload.product.id}`)
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
        store.dispatch("wishlist/getWishlistItems");
        store.dispatch('changeLoadingScreen' , false)
      });
  },

  deleteAll() {
    store.dispatch('changeLoadingScreen' , true) ; 
    store.dispatch('changeLoadingScreen' , false)
    return globalAxios.delete(END_POINT);
  },
};
