// import Api from "./Api";
import globalAxios from "@/services/global-axios";
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);
const END_POINT = "members/profile/favorite";

import i18n from "../i18n/i18n";

export default {
  all() {
    return globalAxios.get(END_POINT);
  },

  store(data) {
    return globalAxios.post(END_POINT, data);
  },

  delete(id) {
    return globalAxios
      .delete(`${END_POINT}/${id}`)
      .then((res) => {
        if (res.status == 200) {
          Vue.swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            icon: "success",
            title: i18n.t("cart.removedFromCart"),
          });
        }
      })
      .catch((err) => {
        const error = Object.values(err)[2].data;
        Vue.swal({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          icon: "error",
          title: error.message,
        });
      });
  },

  deleteAll() {
    return globalAxios.delete(END_POINT);
  },
};
