import globaAxios from "./global-axios";
export default {
    getBanners(){
        return globaAxios.get('client/banners')
    },
    getCategories(){
        return globaAxios.get('client/categories?isParent=true')
    },
    homeProducts(page = 1){
        return globaAxios.get(`client/products?page=${page}`)
    }
}