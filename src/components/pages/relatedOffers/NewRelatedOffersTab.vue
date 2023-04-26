<template>
  <div class="holder">
    <div class="tabs-holder">
      <VueSlickCarousel
        v-bind="settings"
        class="my-5"
        v-if="buy_get_promotionsLength || gift_promotions || basket_promotions"
      >
        <div class="" v-if="buy_get_promotionsLength > 0">
          <div
            v-for="(deal, index) in buy_get_promotions"
            :key="index"
            class="slider-holder"
          >
            <ProductCard
            :buttonTrue="true"
              :slider="deal"
              :dealType="`${$t('profile.buy')} 
          ${deal.buy_get_promotion_running_by_type.promotion.buy_x} 
          ${$t('profile.get')} ${
                deal.buy_get_promotion_running_by_type.promotion.get_y
              }`"
            />
          </div>
        </div>
        <div class="" v-if="gift_promotionsLength > 0">
          <div v-for="(deal, index) in gift_promotions" :key="index">
            <ProductCard :buttonTrue="true"
              :slider="deal"
              :dealType="`${$t('profile.buy')} 
            ${deal.buy_gift_promotions_running_by_type.buy_x} 
            ${$t('profile.get')} ${
                deal.buy_gift_promotions_running_by_type.gift_product_supplier
                  .product.title
              } ${$t('profile.free')}`"
            />
          </div>
        </div>

        <div class="" v-if="basket_promotionsLength > 0">
          <div v-for="(deal, index) in basket_promotions" :key="index">
            <BasketCard :slider="deal" :dealType="$t('profile.basketDeals')" :buttonTrue="true" />
          </div>
        </div>
      </VueSlickCarousel>
      <div class="" v-else>
        <h3>{{ $t("cart.noDataMatch") }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import ProductCard from "@/components/global/ProductCard";
import BasketCard from "@/components/global/BasketCard";
export default {
  components: {
    VueSlickCarousel,
    ProductCard,
    BasketCard,
  },
  data() {
    return {
      settings: {
        dots: true,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        centeredMode: true,
        focusOnSelect: true,

        responsive: [
          {
            breakpoint: 1191,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: true,
            },
          },
          {
            breakpoint: 820,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: true,
              dots: true,
            },
          },
        ],
      },
      buyAndGet: null,
      dataLength: null,
    };
  },
  props: [
    "basket_promotions",
    "buy_get_promotionsLength",
    "buy_get_promotions",
    "basket_promotionsLength",
    "gift_promotions",
    "gift_promotionsLength",
  ],
};
</script>

<style lang="scss" scoped>
.specialOffers {
  text-align: center;

  .tabs {
    padding: 20px 0;

    .nav-tabs {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>
