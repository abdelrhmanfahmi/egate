export const ADD_TO_CART = (state, { product, quantity }) => {
    let productInCart = JSON.parse(state.cart).find(item => {
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

export const SET_CART = (state, cart) => {
    state.cart = cart;
}

export const REMOVE_PRODUCT_FROM_CART = (state, product) => {
    state.cart = JSON.parse(state.cart).filter(item => {
        return item.product.id !== product.id;
        // console.log(item);
    })
}

export const CLEAR_CART_ITEMS = (state) => {
    state.cart = [];
}


export const SET_CART_ITEMS = (state, cart) => {
    state.cart = cart;
}
export const SET_CART_LENGTH = (state, cartLength) => {
    // console.log(JSON.parse(state.cart));
    JSON.parse(state.cart).length = cartLength;
}

export const SET_CART_TOTAL = (state, cart_sub_total) => {
    state.cart_sub_total = cart_sub_total;
}