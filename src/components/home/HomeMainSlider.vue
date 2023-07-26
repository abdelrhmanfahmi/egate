<template>
  <section class="homeMainSlider">
    <swiper v-bind="options" :modules="modules" class="mySwiper">
      <!-- <swiper-slide v-for="(slider , index) in sliders" :key="index">
        <img
          :src="slider.image_url"
          :lazy-src="slider.image_url"
          v-if="slider.image_url"
        />
      </swiper-slide> -->
      <swiper-slide
        v-for="(x, index) in 5"
        :key="index"
        class="slider-image-holder"
      >
        <v-img
          src="https://cdn.vox-cdn.com/thumbor/vabx-KeOe5GULF4lqyITVmXMU6I=/0x0:1600x800/1400x788/filters:focal(800x400:801x401)/cdn0.vox-cdn.com/uploads/chorus_asset/file/8853589/google_ai_photography_street_view_2.jpg"
        ></v-img>
        <div class="button-holder">
          <router-link to="/" class="router-link-holder">shop now</router-link>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// import required modules
import { Pagination, Autoplay } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Autoplay],
    };
  },
  data() {
    return {
      options: {
        slidesPerView: 1,
        activeIndex: 1,
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

        // navigation: true,
      },
    };
  },
  props: {
    sliders: {
      type: Array,
    },
  },
};
</script>
<style lang="scss" scoped>
.slider-image-holder {
  position: relative;
  .button-holder {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(-10%, -50%);
    .router-link-holder {
      background: red;
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
