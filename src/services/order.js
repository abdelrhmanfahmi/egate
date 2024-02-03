import globalAxios from "./global-axios";

export default {
    storeOrder(payload) {
        return globalAxios.post('client/orders', payload);
    },
    index(){
        return globalAxios.get('client/orders');
    },
    getReturnedOrders(){
        return globalAxios.get('client/return-items');
    }
}