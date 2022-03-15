import globalAxios from "./global-axios";

export default {
    // home Category
    getCategories() {
        return globalAxios.get("lists/categories");
    },
};