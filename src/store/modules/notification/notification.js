import globalAxios from "@/services/global-axios";

export const state = {
  notifications: [],
  notification: null,
};

export const getters = {
  notifications(state) {
    return state.notifications;
  },
  notification(state) {
    return state.notification;
  },
};

export const mutations = {
  GET_NOTIFICATIONS(state, data) {
    state.notifications = data;
  },
  GET_NOTIFICATION(state, data) {
    state.notification = data;
  },
};

export const actions = {
  getNotifications({ commit }) {
    globalAxios
      .get(admin/notifications)
      .then((res) => {
        if (res.status == 200) {
          commit("GET_NOTIFICATIONS", res.data.items.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
  getNotification({ commit }, id) {
    globalAxios
      .get(`admin/notifications/${id}`)
      .then((res) => {
        if (res.status == 200) {
          commit("GET_NOTIFICATION", res.data.items.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
};