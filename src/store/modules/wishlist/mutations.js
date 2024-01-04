export const ADD_TO_WISHLIST = (state, { product }) => {
  let productInWishlist = state.wishlist.find((item) => {
    return item.id === product;
  });

  if (productInWishlist) {
    productInWishlist;
    return;
  }

  state.wishlist.push({
    product,
  });
};

export const SET_WISHLIST = (state, wishlistItems) => {
  state.wishlist = wishlistItems;
};

export const REMOVE_PRODUCT_FROM_SET_WISHLIST = (state, product) => {
  state.wishlist = state.wishlist.filter((item) => {
    return item.id !== product;
  });
};

export const CLEAR_WISHLIST_ITEMS = (state) => {
  state.wishlist = [];
};
