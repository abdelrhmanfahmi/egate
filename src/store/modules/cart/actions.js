import Cart from "@/apis/Cart";
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
import Product from "@/apis/Product";
Vue.use(VueSweetalert2);
export const addProductToCart = ({ commit }, { product, quantity }) => {
    commit("ADD_TO_CART", { product, quantity });

    Cart.store({
        product_supplier_id: product.product_details_by_type.product_supplier_id,
        quantity,
    });
};


export const removeProductFromCart = ({ commit }, product) => {
    commit("REMOVE_PRODUCT_FROM_CART", product);

    Cart.delete(product.product.uuid);
};

export const clearCartItems = ({ commit }) => {
    commit("CLEAR_CART_ITEMS");

    Vue.swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        icon: "success",
        title: "cart cleared",
    });

    Cart.deleteAll();
};


export const getCartProducts = ({ commit }) => {
    Product.all().then((res) => {
        commit("SET_CART_ITEMS", res.data.items.cart_items);
        commit("SET_CART_TOTAL", res.data.items.cart_sub_total);
    });
};