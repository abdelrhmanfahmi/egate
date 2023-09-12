<template>
  <div class="products-slider-wrapper">
    <v-container>
      <section class="pb-5">
        <div class="">
          <swiper :spaceBetween="5" :modules="modules" :breakpoints="swiperOptions.breakpoints" class="mySwiper">
            <swiper-slide v-for="(product, index) in productsCategory" :key="index">
              <ProductCard :product="product" />
            </swiper-slide>
          </swiper>
        </div>
      </section>
    </v-container>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
export default {
  components: {
    ProductCard,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [],
    };
  },
  data() {
    return {
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
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1200:{
            slidesPerView:3,
            spaceBetween:10
          },
          1500:{
            slidesPerView:4,
            spaceBetween:10
          }
        },
      },
    };
  },
  props:['productsCategory']
  // props: {
  //   products: {
  //     type: Array,
  //     required:true
  //   }
  // }
};
</script>

<style></style>
