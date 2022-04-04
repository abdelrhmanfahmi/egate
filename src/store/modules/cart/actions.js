import Cart from "@/apis/Cart";
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);
export const addProductToCart = ({ commit }, { product, quantity }) => {
    commit("ADD_TO_CART", { product, quantity });

    alert(product.title)

    // Vue.swal({
    //     toast: true,
    //     position: "top-end",
    //     showConfirmButton: false,
    //     timer: 5000,
    //     timerProgressBar: true,
    //     icon: "success",
    //     title: "Product added to cart.",
    // });

    let userExist = localStorage.getItem("userData");

    if (userExist !== null) {
        alert("user exist");
        localStorage.setItem('cart', JSON.stringify(product))
    } else {
        alert("user not exist");
    }

    // Cart.store({
    //     product_supplier_id: product.id,
    //     quantity,
    // });
};

// export const getCartItems = ({ commit }) => {
//   Cart.all().then((response) => {
//     commit("SET_CART", response.data);
//   });
// };

export const removeProductFromCart = ({ commit }, product) => {
    commit("REMOVE_PRODUCT_FROM_CART", product);

    Vue.swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        icon: "success",
        title: "Product removed successfully.",
    });

    // Cart.delete(product.id);
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