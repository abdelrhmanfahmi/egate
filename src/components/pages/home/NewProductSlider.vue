<template>
  <div class="product-silder specialOffers">
    <!-- if no data  -->
    <div class="container">
      <div class="bestDeals">
        <span class="product-info">
          <h4 class="top-header">{{ $t("home.monthlyOffers") }}</h4>
        </span>
        <div class="tabs-holder">
          <b-tabs content-class="mt-3">
            <!-- buy x get y  -->
            <b-tab :title="$t('profile.buyXgetYOffer')" active>
              <div class="d-flex justify-content-end" v-if="dataLength > 0">
                <router-link :to="{
                  path: '/new-deals',
                  query: { type: `${$t('profile.buyXgetYOffer')}` },
                  // query: { type: `${$t('profile.buy')} ${$t('profile.and')} ${$t('profile.get')}` },
                }" class="showAllLink">
                  {{ $t("home.showAll") }}
                </router-link>
              </div>
              <div class="" v-if="dataLength > 0">

                <VueSlickCarousel v-bind="settings" class="my-5" v-if="dataLength">
                  <div v-for="(deal, index) in buyAndGet" :key="index" class="slider-holder">
                    <ProductCard :slider="deal" :dealType="`${$t('profile.buy')} 
                    ${deal.buy_get_promotion_running_by_type.promotion.buy_x} 
                    ${$t('profile.get')} ${deal.buy_get_promotion_running_by_type.promotion.get_y}`" />

                  </div>
                </VueSlickCarousel>
              </div>
              <div class="" v-else>
                <h3>{{ $t('cart.noDataMatch') }}</h3>
              </div>
            </b-tab>
            <!-- giftOffers  -->
            <b-tab :title="$t('profile.buXGetGift')">
              <div class="d-flex justify-content-end" v-if="giftOffersLength > 0">
                <router-link :to="{
                  path: '/new-deals',
                  query: { type: `${$t('profile.buy')} ${$t('profile.and')} ${$t('profile.get')} ${$t('profile.gift')}` },
                }" class="showAllLink">
                  {{ $t("home.showAll") }}
                </router-link>
              </div>
              <div class="" v-if="giftOffersLength > 0">

                <VueSlickCarousel v-bind="settings" class="my-5" v-if="giftOffersLength">
                  <div v-for="(deal, index) in giftOffers" :key="index">
                    <ProductCard :slider="deal" :dealType="`${$t('profile.buy')} 
                    ${deal.buy_gift_promotions_running_by_type.buy_x} 
                    ${$t('profile.get')} ${deal.buy_gift_promotions_running_by_type.gift_product_supplier.product.title} ${$t('profile.free')}`" />

                  </div>
                </VueSlickCarousel>
              </div>
              <div class="" v-else>
                <h3>{{ $t('cart.noDataMatch') }}</h3>
              </div>
            </b-tab>
            <!-- daily offers  -->
            <!-- <b-tab :title="$t('profile.dailyOffers')">
              <div class="d-flex justify-content-end">
                <router-link to="/best-deals" class="showAllLink" v-if="dailyOffersLength > 0">
                  {{ $t("home.showAll") }}
                </router-link>
              </div>
              <div class="" v-if="dailyOffersLength > 0">

                <VueSlickCarousel v-bind="settings" class="my-5" v-if="dailyOffersLength">
                  <div v-for="(deal, index) in dailyOffers" :key="index">
                    <ProductCard :slider="deal" :dealType="$t('profile.dailyOffers')" />
                  </div>
                </VueSlickCarousel>
              </div>
              <div class="" v-else>
                <h3>{{ $t('cart.noDataMatch') }}</h3>
              </div>
            </b-tab> -->
            <!-- monthly offers  -->
            <b-tab :title="$t('profile.monthlyOffers')">
              <div class="d-flex justify-content-end">
                <router-link to="/monthly-offers" class="showAllLink" v-if="dealsLength > 0">
                  {{ $t("home.showAll") }}
                </router-link>
              </div>
              <div class="" v-if="dealsLength > 0">

                <VueSlickCarousel v-bind="settings" class="my-5" v-if="dealsLength">
                  <div v-for="(deal, index) in deals" :key="index">
                    <ProductCard :slider="deal" :dealType="$t('profile.monthlyOffers')" />
                  </div>
                </VueSlickCarousel>
              </div>
              <div class="" v-else>
                <h3>{{ $t('cart.noDataMatch') }}</h3>
              </div>
            </b-tab>
            <!-- baskey offers  -->
            <b-tab :title="$t('profile.basketDeals')">
              <div class="d-flex justify-content-end" v-if="basketDataLength > 0">
                <router-link :to="{
                  path: '/new-deals',
                  query: { type: this.$t('profile.basketDeals') },
                }" class="showAllLink">
                  {{ $t("home.showAll") }}
                </router-link>
              </div>
              <div class="" v-if="basketDataLength > 0">

                <VueSlickCarousel v-bind="settings" class="my-5" v-if="basketDataLength">
                  <div v-for="(deal, index) in basketDealData" :key="index">
                    <BasketCard :slider="deal" :dealType="$t('profile.basketDeals')" />
                  </div>
                </VueSlickCarousel>
              </div>
              <div class="" v-else>
                <h3>{{ $t('cart.noDataMatch') }}</h3>
              </div>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import profile from "@/services/profile";
import categories from "@/services/categories";
import auth from "@/services/auth";
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
        slidesToShow: 6,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,

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
      // buyToGetAnotherTitle: "",
      basketDealData: null,
      basketDataLength: null,
      // monthly offers
      deals: null,
      dealsLength: null,
      //daily offers
      dailyOffers: null,
      dailyOffersLength: null,
      flagTitle: '',
      giftOffers:null,
      giftOffersLength:null
    };
  },
  methods: {
    /**
     * @vuese
     * buy x To Get y
     */

    async buyToGetAnother() {
      await profile
        .buyToGetAnother()
        .then((resp) => {
          this.buyAndGet = resp.data.items.data.slice(0, 8);
          this.dataLength = resp.data.items.data.length;
          // this.flagTitle =
          //   this.$t("profile.buy") +
          //   " " +
          //   this.buyAndGet[0]?.buy_get_promotion_running_by_type[0]?.buy_x +
          //   " " +
          //   this.$t("profile.get") +
          //   " " +
          //   this.buyAndGet[0]?.buy_get_promotion_running_by_type[0]?.get_y;


          // this.flagTitle =  this.$t("profile.buy") +
          // " " +
          // " " +
          // this.$t("profile.get")
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getBasketOffers() {
      await profile
        .getBasketOffers()
        .then((resp) => {
          this.basketDealData = resp.data.items.data.slice(0, 8);
          this.basketDataLength = resp.data.items.data.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /**
     * @vuese
     * monthly offers
     */
    async getMonthlyOffers() {
      this.loading = true;
      await auth
        .getHomeDeadline()
        .then((resp) => {
          this.deals = resp.data.items.deals.data.slice(0, 8);
          this.dealsLength = resp.data.items.deals.data.length;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    /**
     * @vuese
     * daily offers
     */

    async getDailyOffers() {
      //get best deals products
      this.loading = true;
      await categories
        .getBestDeals()
        .then((resp) => {
          this.dailyOffers = resp.data.items.data;
          this.dailyOffersLength = resp.data.items.data.length;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * @vuese
     * get Gift Offer
     */

    async getGiftOffer() {
      //get best deals products
      this.loading = true;
      await profile
        .getGiftOffer()
        .then((resp) => {
          console.log('getGiftOffer' , resp);
          this.giftOffers = resp.data.items.data;
          this.giftOffersLength = resp.data.items.data.length;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created() { },
  mounted() {
    this.buyToGetAnother();
    this.getBasketOffers();
    this.getMonthlyOffers();
    this.getDailyOffers();
    this.getGiftOffer();
  },
  computed: {
    /**
     *  check if slider has data
     */
  },
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
