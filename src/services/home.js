import globaAxios from "./global-axios";
export default {
    homeMainSlider() {
        return globaAxios.get('sliders')
    },
    getCategories(){
        return globaAxios.get('client/categories')
    },
    getGallary(){
        return globaAxios.get('gallery')
    },
    homeProducts(page = 1){
        return globaAxios.get(`client/products?page=${page}`)
    }
}