import globalAxios from "@/services/global-axios";
import router from "@/router/index";

import { useToast } from "vue-toastification";
const toast = useToast();

export const Auth = {
  state: () => ({
    user:
      localStorage.getItem("userInfo") &&
      localStorage.getItem("userInfo") != "undefined"
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    errors: null,
  }),

  getters: {
    User(state) {
      return state.user;
    },
    isAuthenticated: (state) => !!state.user,
    AuthErrors(state) {
      return state.errors;
    },
  },

  mutations: {
    SET_USER_DATA(state, data) {
      state.user = data;
    },
    LOG_OUT(state) {
      state.user = null;
    },
    CHECK_ERRORS(state, data) {
      state.errors = data;
    },
    RESET_ERRORS(state) {
      state.errors = null;
    },
  },

  actions: {
    async Register({ dispatch, commit }, form) {
      try {
        await globalAxios.post("customer/register", form).then((res) => {
          console.log(res);
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
            setTimeout(() => {
              router.push("/auth/login");
            }, 500);
          }
        });
      } catch (err) {
        toast.error(`${err.response.statusText}`, {
          position: "top-right",
          transition: "slide",
          hideProgressBar: false,
          showIcon: true,
          timeout: 3000,
          showCloseButton: true,
          swipeClose: true,
        });
        commit("CHECK_ERRORS", err.response.data.errors);
      }

      // if want to login directly
      // let UserForm = new FormData()
      // UserForm.append('username', form.username)
      // UserForm.append('password', form.password)

      // await dispatch('LogIn', UserForm)
    },

    async Login({ commit }, User) {
      try {
        await globalAxios.post("auth/client/login", User).then((res) => {
          toast.success(`${res.data.message}`, {
            position: "top-right",
            transition: "slide",
            hideProgressBar: false,
            showIcon: true,
            timeout: 3000,
            showCloseButton: true,
            swipeClose: true,
          });

          localStorage.setItem("userInfo", JSON.stringify(res.data));
          commit("SET_USER_DATA", res.data);

          setTimeout(() => {
            router.push("/");
          }, 200);
          setTimeout(() => {
            location.reload()
          }, 300);
        });
      } catch (err) {
        if (err) {
          console.log("error", err.response.data.message);
          if (err.response.data.message) {
            toast.error(`${err.response.data.message}`, {
              position: "top-right",
              transition: "slide",
              hideProgressBar: false,
              showIcon: true,
              timeout: 3000,
              showCloseButton: true,
              swipeClose: true,
            });
          } else {
            toast.error(`${err.response}`, {
              position: "top-right",
              transition: "slide",
              hideProgressBar: false,
              showIcon: true,
              timeout: 3000,
              showCloseButton: true,
              swipeClose: true,
            });
          }

          commit("RESET_ERRORS");
          commit("CHECK_ERRORS", err.response.data.errors);
        }
      }
    },

    async LogOut({ commit }) {
      let user = null;
      localStorage.removeItem('userInfo')
      commit("LOG_OUT", user);
    },
    async resetErrors({ commit }) {
      commit("RESET_ERRORS");
    },
  },
};
