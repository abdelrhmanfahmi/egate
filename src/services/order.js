import globalAxios from "./global-axios";

export default {
    storeOrder(payload) {
        return globalAxios.post('client/orders', payload);
    },
}