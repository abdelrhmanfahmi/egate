<template>
  <div class="products-slider-wrapper">
    <v-container>
      <section class="pb-5">
        <div class="">
          <swiper :spaceBetween="0" :modules="modules" :breakpoints="swiperOptions.breakpoints" class="mySwiper">
            <swiper-slide v-for="(product, index) in products" :key="index">
              <TabsProductCard :product="product"/>
            </swiper-slide>
          </swiper>
        </div>
      </section>
    </v-container>
  </div>
</template>

<script>
import TabsProductCard from "./TabsProductCard.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
export default {
  setup() {
    return {
      modules: [],
    };
  },

  data() {
    return {
      swiperOptions: {
        slidesPerView: 3,
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          767: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          770: {
            slidesPerView: 2,
            spaceBetween: 14,
          },
          1200:{
            slidesPerView:3,
            spaceBetween:10
          },
          1500:{
            slidesPerView:3,
            spaceBetween:14
          }
        },
      },
    };
  },

  props:['products'],

  components: {
    TabsProductCard,
    Swiper,
    SwiperSlide,
  },
};
</script>

<style></style>
