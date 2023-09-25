import globalAxios from "@/services/global-axios";
import router from "@/router/index";

import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  namespaced: true,
  state() {
    return {
      user:
        localStorage.getItem("EGate-userInfo") &&
        localStorage.getItem("EGate-userInfo") != "undefined"
          ? JSON.parse(localStorage.getItem("EGate-userInfo"))
          : null,
      errors: null,
      loginNow: false,
    };
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
    CHECK_IF_LOGIN_NOW(state, loginStatus) {
      state.loginNow = loginStatus;
    },
  },
  actions: {
    async Register({ dispatch, commit }, form) {
      try {
        commit("CHECK_IF_LOGIN_NOW", true);
        await globalAxios.post("auth/register", form).then((res) => {
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
              router.push("/auth/activate/emailActivation");
            }, 500);
          }
          commit("CHECK_IF_LOGIN_NOW", false);
        });
      } catch (err) {
        commit("CHECK_IF_LOGIN_NOW", false);
        toast.error(`${err.response.data.message}`, {
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
    async ActiveEmailAccount({ dispatch, commit }, form) {
      try {
        commit("CHECK_IF_LOGIN_NOW", true);
        await globalAxios.post("auth/activation", form).then((res) => {
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
              router.push("/auth/activate/mobileActivation");
            }, 500);
          }
          commit("CHECK_IF_LOGIN_NOW", false);
        });
      } catch (err) {
        commit("CHECK_IF_LOGIN_NOW", false);
        toast.error(`${err.response.data.message}`, {
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
    async ActivePhoneAccount({ dispatch, commit }, form) {
      try {
        commit("CHECK_IF_LOGIN_NOW", true);
        await globalAxios.post("auth/activation", form).then((res) => {
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
          commit("CHECK_IF_LOGIN_NOW", false);
        });
      } catch (err) {
        commit("CHECK_IF_LOGIN_NOW", false);
        toast.error(`${err.response.data.message}`, {
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
    async Login({ dispatch, commit }, User) {
      try {
        commit("CHECK_IF_LOGIN_NOW", true);
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

          commit("SET_USER_DATA", res.data.items);

          localStorage.setItem(
            "EGate-userInfo",
            JSON.stringify(res.data.items)
          );

          router.push(
            {
              path: "/",
            },
            () => {
              commit("CHECK_IF_LOGIN_NOW", false);
              router.go(0);
            }
          );
        });
        commit("CHECK_IF_LOGIN_NOW", false);
      } catch (err) {
        commit("CHECK_IF_LOGIN_NOW", false);
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
      commit("CHECK_IF_LOGIN_NOW", true);
      try {
        await globalAxios.get("auth/logout").then(() => {
          commit("LOG_OUT");
          localStorage.removeItem("EGate-userInfo");

          router.push(
            {
              path: "/",
            },
            () => {
              router.go(0);
              location.reload();
            }
          );
          commit("CHECK_IF_LOGIN_NOW", false);
        });
      } catch (error) {
        commit("CHECK_IF_LOGIN_NOW", false);
      }

      commit("CHECK_IF_LOGIN_NOW", false);
    },
    async resetErrors({ commit }) {
      commit("RESET_ERRORS");
    },
  },
  getters: {
    User(state) {
      return state.user;
    },
    isAuthenticated: (state) => !!state.user,
    AuthErrors(state) {
      return state.errors;
    },
    LoginNow(state) {
      return state.loginNow;
    },
  },
};
