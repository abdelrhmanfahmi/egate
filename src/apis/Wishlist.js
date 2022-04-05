// import Api from "./Api";
import globalAxios from "@/services/global-axios";
const END_POINT = 'wishlist';

export default {
    all() {
        return globalAxios.get(END_POINT);
    },

    store(data) {
        return globalAxios.post(END_POINT, data);
    },

    delete(id) {
        return globalAxios.delete(`${END_POINT}/${id}`);
    },

    deleteAll() {
        return globalAxios.delete(END_POINT);
    }
}