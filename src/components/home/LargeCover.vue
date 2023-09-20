<template>
  <div class="wrapper">
    <v-container fluid>
      <swiper :modules="modules" v-bind="options" class="mySwiper" >
          <swiper-slide v-for="(cover , index) in largeCovers" :key="index">
              <img :src="cover.image" alt="image" class=""/>
          </swiper-slide>
      </swiper>
    </v-container>
  </div>
</template>

<script>
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
export default {
  setup() {
      return {
          modules: [Navigation, Autoplay],
      };
  },

  data(){
    return {
      modules: [ Navigation ],
      options: {
        slidesPerView: 1,
        spaceBetween: 0,
        activeIndex:1,
        loop: true,
        centeredSlides: true,
        speed: 300,
        direction: "horizontal",
        zoom: true,
        autoplay: {
            delay: 5000,
        },
        fadeEffect: {
            crossFade: true,
        },
      }
    }
  },

  props:['largeCovers'],

  components:{
        Swiper,
        SwiperSlide
    },
}
</script>

<style lang="scss" scoped>

.coverImage{
  height: 60vh;
  object-fit: cover !important;
  width: 100%;
  border-radius: 10px;
}

</style>