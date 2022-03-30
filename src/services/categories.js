import globalAxios from "./global-axios";

export default {
    // home Category
    getCategories() {
        return globalAxios.get("lists/categories");
    },
    getSubCategories(id) {
        return globalAxios.get(`lists/categories/allChild?parent_id=${id}`);
    },
    getCategoryProducts(id) {
        return globalAxios.get(`products?category_id=${id}`);
    },
    getSingleProductDetails(id) {
        return globalAxios.get(`lists/categories/single/${id}`);
    },
    productDetails(id) {
        return globalAxios.get(`products/${id}`);
    },
};