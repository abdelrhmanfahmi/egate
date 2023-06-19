import Cart from "@/apis/Cart";

// import Product from "@/apis/Product";

export const addProductToCart = ({ commit }, payload) => {
  Cart.store({
    product_id: payload.product.id,
    quantity: payload.quantity,
  });
  commit("ADD_TO_CART", payload);
};

export const removeProductFromCart = ({ commit }, payload) => {
  Cart.delete(payload);
  this.$nextTick(() => {
    commit("REMOVE_PRODUCT_FROM_CART", payload.product);
  });
};

export const updateProductFromCart = ({ commit }, product) => {
  Cart.update(product);
  this.$nextTick(() => {
    commit("SET_CART", product);
  });

};

export const moveProductToWishList = ({ commit }, product) => {
  console.log('product' , product);
  Cart.moveToWish(product);
  this.$nextTick(() => {
    commit("SET_CART", product);
  });
}

export const clearCartItems = ({ commit }) => {
  Cart.deleteAll();

  this.$nextTick(() => {
    commit("CLEAR_CART_ITEMS");
  });
};

export const getCartProducts = ({ commit }) => {
  Cart.all().then((res) => {
    if (res.data == null || res.data.data == null) {
      commit("CLEAR_CART_ITEMS");
      commit("SET_CART_ITEMS", []);
      commit("SET_CART_LENGTH", 0);
      commit("SET_CART_TOTAL", 0);
    } else {
      commit("SET_CART_ITEMS", res.data.data.items);
      commit("SET_CART_LENGTH", res.data.data.items_count);
      commit("SET_CART_TOTAL", res.data.data.sub_total);
      localStorage.setItem("currency", res.data.data.cart_currency_code);
    }
  });
};
