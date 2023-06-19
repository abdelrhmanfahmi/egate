<template>
  <section class="homeMainSlider">
    <swiper v-bind="options" :modules="modules" class="mySwiper">
      <swiper-slide v-for="(slider , index) in sliders" :key="index">
        <img
          :src="slider.image_url"
          :lazy-src="slider.image_url"
          v-if="slider.image_url"
        />
      </swiper-slide>
    </swiper>
  </section>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// import required modules
import { Pagination , Autoplay } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide, 
  },
  setup() {
    return {
      modules: [Pagination , Autoplay],
    };
  },
  data() {
    return {
      options: {
        slidesPerView: 1.25,
        spaceBetween: 30,
        activeIndex:1,
        loop: true,
        pagination: {
          clickable: true,
        },
        centeredSlides: true,
        speed:300,
        direction: 'horizontal',
        zoom:true,
        autoplay: {
          delay: 5000,
        },
        fadeEffect: {
          crossFade: true,
        },

        // navigation: true,
      },
    };
  },
  props:{
    sliders:{
      type:Array
    }
  }
  
};
</script>
