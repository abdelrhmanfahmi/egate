<template>
    <div class="productPerCategory">
        <v-container fluid>
            <section class="pb-5">
                <h3>Spare Parts Offer</h3>
                <div class="">
                    <swiper :spaceBetween="5" :modules="modules" :breakpoints="swiperOptions.breakpoints" class="mySwiper">
                        <swiper-slide v-for="(product, index) in productsOffersPerCategory" :key="index">
                        <ProductCard :product="product" />
                        </swiper-slide>
                    </swiper>
                </div>
            </section>
        </v-container>
    </div>
</template>
<script>
import ProductCard from '@/components/shared/Products/ProductCard.vue';
import globalAxios from '@/services/global-axios';
import { Swiper, SwiperSlide } from "swiper/vue";
export default{
    mounted(){
        this.getProductOffersPerCategory();
    },
    data(){
        return {
            productsOffersPerCategory:[],
            swiperOptions: {
                breakpoints: {
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        767: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },

                        991: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1200:{
                            slidesPerView:4,
                            spaceBetween:10
                        },
                        1500:{
                            slidesPerView:5,
                            spaceBetween:10
                        }
                },
            },
        }
    },
    setup() {
        return {
        modules: [],
        };
    },
    methods:{
        async getProductOffersPerCategory(){
            const response = await globalAxios.get('client/products/relational/products' , {params: {category_id: 1}});
            this.productsOffersPerCategory = response.data.items.data;
        }
    },
    components:{
        ProductCard,
        Swiper,
        SwiperSlide,
    }

}
</script>

<style scoped lang="scss">
    .productPerCategory{
        padding-top: 2rem;
    }
</style>