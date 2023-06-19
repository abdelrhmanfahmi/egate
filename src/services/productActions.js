import globaAxios from "./global-axios";
export default {
    getCartProducts() {
        return globaAxios.get('customer/cart')
    },
    addProductToCart(payload) {
        return globaAxios.post(`checkout/cart/add/${payload.product_id}`)
    },
    addProductToWishlist(payload) {
        return globaAxios.post('wishlist/add' , payload)
    },
    
}