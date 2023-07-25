import globalAxios from "@/services/global-axios";

export const Categories = {
  namespaced: true,
  state: () => ({
    categories: [],
  }),

  getters: {
    categories(state) {
      return state.categories;
    },
  },

  mutations: {
    GET_CAREGORIES(state, data) {
      state.categories = data;
    },
  },

  actions: {
    getCategories({ commit }) {
      globalAxios
        .get(`categories`)
        .then((res) => {
          if (res.status == 200) {
            commit("GET_CAREGORIES", res.data.data);
          }
        })
        .catch((err) => {
          const error = Object.values(err)[2].data;
          this.errMsg(error.message);
        });
    },
  },
};
