export const cartItemCount = (state) => {
    try {
        return JSON.parse(state.cart).length;
    } catch (e) {
        console.log(e);
    }
}

export const cartTotalPrice = (state) => {

    try {
        let total = 0;
        JSON.parse(state.cart).forEach(item => {
            total += item.product.product_price * item.quantity;
        })

        return total;
    } catch (e) {
        console.log(e);
    }
}


export const cartItems = (state) => {
    try {
        return JSON.parse(state.cart);
    } catch (e) {
        console.log(e);
    }
}

export const cart_sub_total = (state) => {
    return state.cart_sub_total;
}