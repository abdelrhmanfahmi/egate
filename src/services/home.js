import globaAxios from "./global-axios";
export default {
    getBanners(){
        return globaAxios.get('client/banners')
    },
    getCategories(){
        return globaAxios.get('client/categories?isParent=true')
    },
    homeProducts(){
        return globaAxios.get(`client/products?hasOffer=true`)
    }
}