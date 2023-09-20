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
        this.checkID();
        this.getProductOffersPerCategory();
    },
    data(){
        return {
            category_id:null,
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
        checkID(){
            if (this.$route.params.id) {
                this.category_id = this.$route.params.id
            } else if (this.$route.query.id) {
                this.category_id = this.$route.query.id
            }
        },

        async getProductOffersPerCategory(){
            const response = await globalAxios.get('client/products/relational/products' , {params: {category_id: this.category_id , hasOffer: true}});
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