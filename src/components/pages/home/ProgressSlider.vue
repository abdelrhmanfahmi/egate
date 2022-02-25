<template>
<div class="container">
    <div class="product-silder">
       <div class="product-info">
        <p class="text-left">{{ $t("home.bestDeal") }}</p>
      </div>
    <VueSlickCarousel v-bind="settings" class="my-2">
      <div v-for="(x, index) in 20" :key="index">
        <div>
          <b-img
            src="https://humhum.work/user-interface/public/assets/img/product/ins2.png"
          >
          </b-img>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";

import "vue-slick-carousel/dist/vue-slick-carousel.css";
export default {
  components: {
    VueSlickCarousel,
  },
  data() {
    return {
      settings: {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 12,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,

        responsive: [
          {
            breakpoint: 1191,
            settings: {
              slidesToShow: 9,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 820,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.product-silder {
  text-align: center;
  padding: 20px 5px;
  img {
      border: 2px solid $main-color;
      border-radius: 50%;
  }
}
</style>