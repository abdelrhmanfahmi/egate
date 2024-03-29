import globalAxios from "@/services/global-axios";

export const Products = {
    namespaced: true,
    state: () => ({
        products: [],
        product:{}
    }),

    getters: {
        products(state) {
            return state.products;
        },
        product(state) {
            return state.product;
        },
    },

    mutations: {
        GET_PRODUCTS(state, data) {
            state.products = data;
        },
        GET_PRODUCT(state, data) {
            state.product = data;
        },
    },


    actions: {
        async getProducts({ commit } , page = 1) {

            await globalAxios
                .get(`client/products?page=${page}`)
                .then((res) => {
                    console.log('res', res);
                    if (res.status == 200) {
                        commit('GET_PRODUCTS', res.data)
                    }
                })
                .catch((err) => {
                    const error = Object.values(err)[2].data;
                    this.sucessMsg(error.message)
                });

        },
        async getProduct({ commit } , productId ) {
            await globalAxios
                .get(`client/products/${productId}`)
                .then((res) => {
                    if (res.status == 200) {
                        commit('GET_PRODUCT', res.data);
                    }
                })
                .catch((err) => {
                    const error = Object.values(err)[2].data;
                    this.sucessMsg(error.message)
                });

        },
    },

}


