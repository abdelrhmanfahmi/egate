<template>
  <div class="product-silder">
    <b-container>
      <p>{{ $t("home.bestDeal") }}</p>

      <VueSlickCarousel v-bind="settings" class="my-2">
        <div v-for="(x, index) in 20" :key="index" class="text-center">
          <b-img
            src="https://humhum.work/user-interface/public/assets/img/product/ins2.png"
          >
          </b-img>
          <h6 class="main-header">product</h6>
        </div>
      </VueSlickCarousel>
    </b-container>
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
  padding: 20px 10px;
  img {
    border: 2px solid $main-color;
    border-radius: 50%;
    display: inline-block;
  }
}

html:lang(ar) {
  .product-silder {
    text-align: right;
  }
}
</style>