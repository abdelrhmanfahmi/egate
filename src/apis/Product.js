// import Api from "./Api";
import globalAxios from "@/services/global-axios";
const END_POINT = 'cart';

export default {
    all() {
        return globalAxios.get(END_POINT);
    },

    show(id) {
        return globalAxios.get(`${END_POINT}/${id}`);
    }
}