<template>
    <div class="products-slider-wrapper">
      <v-container>
        <section class="pb-5">
          <div class="">
            <swiper
             
              :spaceBetween="0"
              :modules="modules"
              :breakpoints="swiperOptions.breakpoints"
              class="mySwiper"
            >
              <swiper-slide v-for="(x, index) in 10" :key="index"
                ><TabsProductCard
              /></swiper-slide>
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
    components: {
        TabsProductCard,
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
            770: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
  
            771: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          },
        },
      };
    },
  };
  </script>
  
  <style></style>
  