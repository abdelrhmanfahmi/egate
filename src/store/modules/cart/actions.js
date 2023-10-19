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
  commit("REMOVE_PRODUCT_FROM_CART", payload.product);
};

export const updateProductFromCart = ({ commit }, product) => {
  Cart.update(product);
  commit("SET_CART", product);
};

export const moveProductToWishList = ({ commit }, product) => {
  console.log('product', product);
  Cart.moveToWish(product);
  commit("SET_CART", product);
}

export const clearCartItems = ({ commit } , payload) => {
  Cart.deleteAll(payload);
  commit("CLEAR_CART_ITEMS");
};

export const getCartProducts = ({ commit }) => {
  Cart.all().then((res) => {
    if (res.data.items.data == null) {
      commit("CLEAR_CART_ITEMS");
      commit("SET_CART_ITEMS", []);
      commit("SET_CART_LENGTH", 0);
      commit("SET_CART_TOTAL", 0);
    } else {
      commit("SET_CART_ITEMS", JSON.stringify(res.data.items.data));
      commit("SET_CART_LENGTH", JSON.stringify(res.data.items.data.length));
      localStorage.setItem('cartData', JSON.stringify(res.data.items.data));
      localStorage.setItem('cartCount', JSON.stringify(res.data.items.data.length));
      // commit("SET_CART_TOTAL", res.data.data.sub_total);
      // localStorage.setItem("currency", res.data.data.cart_currency_code);
    }
  });
};
