export const ADD_TO_WISHLIST = (state, { product, quantity }) => {

    let productInWishlist = state.wishlist.find(item => {
        return item.product.id === product.id;
    });

    if (productInWishlist) {
        productInWishlist.quantity += quantity;
        return;
    }

    state.wishlist.push({
        product,
        quantity
    })
}

export const SET_WISHLIST = (state, wishlistItems) => {
    state.wishlist = wishlistItems;
}

export const REMOVE_PRODUCT_FROM_SET_WISHLIST = (state, product) => {
    state.wishlist = state.wishlist.filter(item => {
        return item.product.id !== product.id;
    })
}

export const CLEAR_WISHLIST_ITEMS = (state) => {
    state.wishlist = [];
}