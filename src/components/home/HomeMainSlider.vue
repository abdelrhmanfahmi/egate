<template>
  <section class="homeMainSlider">
    <swiper v-bind="options" :modules="modules" class="mySwiper">
      <swiper-slide v-for="(banner, index) in banners" :key="index" class="slider-image-holder">
        <v-img :src="banner.image"></v-img>
        <div class="button-holder">
          <router-link :to="'/productPage/'+banner.product_id" class="router-link-holder">shop now</router-link>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination , Autoplay } from "swiper";

export default {
  data() {
    return {
      options: {
        slidesPerView: 1,
        spaceBetween: 30,
        activeIndex:1,
        loop: true,
        pagination: {
          clickable: true,
        },
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
      },
    };
  },
  props:['banners'],
  components: {
    Swiper,
    SwiperSlide
  },

  setup() {
    return {
      modules: [Pagination , Autoplay],
    };
  }

};
</script>

<style scoped lang="scss">
  p{
    color: #000;
  }
  .slider-image-holder {
    position: relative;
  .button-holder {
    position: absolute;
    top: 80%;
    left: 10%;
    transform: translate(-10%, -50%);
    .router-link-holder {
      background: #0DEEFA;
      padding: 12px 2vw;
      border-radius: 3px;
      text-transform: capitalize;
      text-decoration: none;
      color: #fff;
      font-weight:600;
      font-size: 30px;
    }
  }
}

</style>
