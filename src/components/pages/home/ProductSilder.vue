<template>
  <div class="product-silder">
    <span class="product-info">
      <h4 class="top-header">{{ $t("home.bestDeal") }}</h4>
    </span>
    <Countdown deadline="August 22, 2022"></Countdown>
    <VueSlickCarousel v-bind="settings" class="my-5">
      <div v-for="(x, index) in 10" :key="index">
        <ProductCard />
      </div>
    </VueSlickCarousel>
    <span class="product-info">
      <h4 class="top-header">{{ $t("home.suppliers") }}</h4>
    </span>
    <VueSlickCarousel v-bind="settings">
      <div v-for="(x, index) in 10" :key="index" class="px-5">
        <b-img
          class="img-suplier"
          src="https://humhum.work/user-interface/public/assets/img/brand/su2.png"
        >
        </b-img>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import Countdown from "vuejs-countdown";
import ProductCard from "@/components/global/ProductCard";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
export default {
  components: {
    ProductCard,
    VueSlickCarousel,
    Countdown,
  },
  data() {
    return {
      settings: {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,

        responsive: [
          {
            breakpoint: 1191,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 820,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
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
  background-color: #f9f8f5;
  text-align: center;
  padding: 20px 5px;
  .product-info {
    padding-bottom: 30px;
    small {
      color: $main-color;
      font-size: 12px;
      text-transform: uppercase;
    }
  }
  .img-suplier {
    opacity: 0.75;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    display: block;
    text-align: center;
    &:hover {
      opacity: 1;
    }
  }
}
</style>