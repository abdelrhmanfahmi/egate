// import Api from "./Api";
import globalAxios from "@/services/global-axios";
const END_POINT = 'cart';

export default {
    all() {
        return globalAxios.get(END_POINT);
    },

    store(data) {
        return globalAxios.post(`${END_POINT}/add`, data);
    },

    delete(uuid) {
        return globalAxios.delete(`cart/delete/:${uuid}`);
    },

    deleteAll() {
        return globalAxios.delete(END_POINT);
    }
}