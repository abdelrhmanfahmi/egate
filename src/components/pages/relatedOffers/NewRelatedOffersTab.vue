<template>
  <div class="holder">
    <div class="tabs-holder">
      <b-tabs content-class="mt-3">
        <!-- buy x get y  -->
        <b-tab :title="$t('profile.buyXgetYOffer')" active>
          <div class="" v-if="dataLength > 0">
            <VueSlickCarousel v-bind="settings" class="my-5" v-if="buy_get_promotionsLength">
              <div
                v-for="(deal, index) in buy_get_promotions"
                :key="index"
                class="slider-holder"
              >
                <ProductCard
                  :slider="deal"
                  :dealType="`${$t('profile.buy')} 
                ${deal.buy_get_promotion_running_by_type.promotion.buy_x} 
                ${$t('profile.get')} ${
                    deal.buy_get_promotion_running_by_type.promotion.get_y
                  }`"
                />
              </div>
            </VueSlickCarousel>
          </div>
          <div class="" v-else>
            <h3>{{ $t("cart.noDataMatch") }}</h3>
          </div>
        </b-tab>
        <!-- giftOffers  -->
        <b-tab :title="$t('profile.buXGetGift')">
          <div class="d-flex justify-content-end" v-if="gift_promotions > 0">
            <router-link
              :to="{
                path: '/new-deals',
                query: {
                  type: `${$t('profile.buy')} ${$t('profile.and')} ${$t(
                    'profile.get'
                  )} ${$t('profile.gift')}`,
                },
              }"
              class="showAllLink"
            >
              {{ $t("home.showAll") }}
            </router-link>
          </div>
          <div class="" v-if="gift_promotionsLength > 0">
            <VueSlickCarousel
              v-bind="settings"
              class="my-5"
              v-if="gift_promotionsLength"
            >
              <div v-for="(deal, index) in gift_promotions" :key="index">
                <ProductCard
                  :slider="deal"
                  :dealType="`${$t('profile.buy')} 
                ${deal.buy_gift_promotions_running_by_type.buy_x} 
                ${$t('profile.get')} ${
                    deal.buy_gift_promotions_running_by_type
                      .gift_product_supplier.product.title
                  } ${$t('profile.free')}`"
                />
              </div>
            </VueSlickCarousel>
          </div>
          <div class="" v-else>
            <h3>{{ $t("cart.noDataMatch") }}</h3>
          </div>
        </b-tab>
        <!-- baskey offers  -->
        <b-tab :title="$t('profile.basketDeals')">
          <div class="d-flex justify-content-end" v-if="basket_promotionsLength > 0">
            <router-link
              :to="{
                path: '/new-deals',
                query: { type: this.$t('profile.basketDeals') },
              }"
              class="showAllLink"
            >
              {{ $t("home.showAll") }}
            </router-link>
          </div>
          <div class="" v-if="basket_promotionsLength > 0">
            <VueSlickCarousel
              v-bind="settings"
              class="my-5"
              v-if="basket_promotionsLength"
            >
              <div v-for="(deal, index) in basket_promotions" :key="index">
                <BasketCard
                  :slider="deal"
                  :dealType="$t('profile.basketDeals')"
                />
              </div>
            </VueSlickCarousel>
          </div>
          <div class="" v-else>
            <h3>{{ $t("cart.noDataMatch") }}</h3>
          </div>
        </b-tab>
      </b-tabs>
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
  data(){
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
        centeredMode:true,

        responsive: [
          {
            breakpoint: 1191,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              arrows: true,
            },
          },
          {
            breakpoint: 820,
            settings: {
              slidesToShow: 2,
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
      buy_get_promotionsLength:null,
      basket_promotionsLength:null,
      gift_promotionsLength:null,

    }
  },
  props:['basket_promotions' , 'buy_get_promotions' , 'gift_promotions'],
  mounted(){
    this.buy_get_promotionsLength = this.buy_get_promotions.length
    this.basket_promotionsLength = this.basket_promotions.length
    this.gift_promotionsLength = this.gift_promotions.length
  }
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
