export const wishlistItemCount = (state) => {
    return state.wishlist.length;
}

export const wishlistTotalPrice = (state) => {
    let total = 0;

    state.wishlist.forEach(item => {
        total += item.product.price 
        // total += item.product.price * item.quantity;
    })

    return total;
}