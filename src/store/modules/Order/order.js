export const Order = {
    namespaced: true,
    state() {
        return {
            orderCheckoutObject: {
                address_book_id: null,
                sail_point_id: null,
                payment_type: null,
                coupoun: null,
                shipping_type_id: null,
                delivery_time: null,
                email: null,
                mobile: null,
                bank_transfer_image:null
            }
        }
    },
    mutations: {
        GET_ORDER_CHECKOUT_OBJECT(state, newOrderCheckoutObject) {
            state.orderCheckoutObject = newOrderCheckoutObject;
        },
    },
    actions: {
        updateOrderCheckoutObject({ commit }, newOrderCheckoutObject) {
            commit('GET_ORDER_CHECKOUT_OBJECT', newOrderCheckoutObject);
        }
    },
    getters: {
        orderCheckoutObject(state) {
            return state.orderCheckoutObject;
        }
    },
};