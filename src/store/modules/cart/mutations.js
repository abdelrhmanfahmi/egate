export const ADD_TO_CART = (state, { product, quantity }) => {

    let productInCart = state.cart.find(item => {
        return item.product.id === product.id;
    });

    if (productInCart) {
        productInCart.quantity += quantity;
        return;
    }

    state.cart.push({
        product,
        quantity
    })
}

export const SET_CART = (state, cartItems) => {
    state.cart = cartItems;
}

export const REMOVE_PRODUCT_FROM_CART = (state, product) => {
    state.cart = state.cart.filter(item => {
        return item.product.id !== product.id;
    })
}

export const CLEAR_CART_ITEMS = (state) => {
    state.cart = [];
}


export const SET_CART_ITEMS = (state, cartItems) => {
    state.cartItems = cartItems;
}
export const SET_CART_LENGTH = (state, cartLength) => {
    state.cartLength = cartLength;
}

export const SET_CART_TOTAL = (state, cart_sub_total) => {
    state.cart_sub_total = cart_sub_total;
}