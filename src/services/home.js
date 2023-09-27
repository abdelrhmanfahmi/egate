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
    },
    homeProductsFeatured(){
        return globaAxios.get(`client/products?featured=true`)
    },
    homeProductsTopRated(){
        return globaAxios.get(`client/products?top_rated=true`)
    },
    homeProductsTopReviewed(){
        return globaAxios.get(`client/products?top_reviewed=true`)
    },
    getFeaturedCategories(){
        return globaAxios.get(`client/categories?featured=true`)
    },
    getProductsSpecial(){
        return globaAxios.get(`client/special-offers`)
    }
}