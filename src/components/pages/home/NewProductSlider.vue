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
            <b-tab :title="buyToGetAnotherTitle" active>
              <div class="d-flex justify-content-end">
                <router-link
                  :to="{
                    path: '/new-deals',
                    query: { type: buyToGetAnotherTitle },
                  }"
                  class="showAllLink"
                >
                  {{ $t("home.showAll") }}
                </router-link>
              </div>
              <VueSlickCarousel
                v-bind="settings"
                class="my-5"
                v-if="dataLength"
              >
                <div v-for="(deal, index) in buyAndGet" :key="index">
                  <ProductCard
                    :slider="deal"
                    :dealType="buyToGetAnotherTitle"
                  />
                </div>
              </VueSlickCarousel>
            </b-tab>
            <b-tab title="daily offers">
              <div class="d-flex justify-content-end">
                <router-link to="/new-deals" class="showAllLink">
                  {{ $t("home.showAll") }}
                </router-link>
              </div>
              <VueSlickCarousel v-bind="settings" class="my-5">
                <div v-for="(x, index) in 6" :key="index">
                  <div class="logo-holder">
                    <img src="@/assets/images/logo.png" alt="logo" />
                  </div>
                </div>
              </VueSlickCarousel>
            </b-tab>
            <b-tab title="monthly offers">
              <div class="d-flex justify-content-end">
                <router-link to="/new-deals" class="showAllLink">
                  {{ $t("home.showAll") }}
                </router-link>
              </div>
              <VueSlickCarousel v-bind="settings" class="my-5">
                <div v-for="(x, index) in 6" :key="index">
                  <div class="logo-holder">
                    <img src="@/assets/images/logo.png" alt="logo" />
                  </div>
                </div>
              </VueSlickCarousel>
            </b-tab>
            <b-tab title="basket deals">
              <div class="d-flex justify-content-end">
                <router-link
                  :to="{
                    path: '/new-deals',
                    query: { type: 'basketDeal' },
                  }"
                  class="showAllLink"
                >
                  {{ $t("home.showAll") }}
                </router-link>
              </div>
              <VueSlickCarousel
                v-bind="settings"
                class="my-5"
                v-if="basketDataLength"
              >
                <div v-for="(deal, index) in basketDealData" :key="index">
                  <ProductCard :slider="deal" :dealType="'basketDeal'" />
                </div>
              </VueSlickCarousel>
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
import ProductCard from "@/components/global/ProductCard";
export default {
  components: {
    VueSlickCarousel,
    ProductCard,
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
      buyToGetAnotherTitle: "",
      basketDealData: null,
      basketDataLength:null
    };
  },
  methods: {
    /**
     * @vuese
     * buy x To Get y
     */

    buyToGetAnother() {
      profile
        .buyToGetAnother()
        .then((resp) => {
          this.buyAndGet = resp.data.items.data.slice(0, 8);
          this.dataLength = resp.data.items.data.length;
          this.buyToGetAnotherTitle =
            this.$t("profile.buy") +
            " " +
            this.buyAndGet[0]?.buy_get_promotion_running_by_type[0]?.buy_x +
            " " +
            this.$t("profile.get") +
            " " +
            this.buyAndGet[0]?.buy_get_promotion_running_by_type[0]?.get_y;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getNewOffers() {
      profile
        .getNewOffers()
        .then((resp) => {
          console.log(resp);
          this.basketDealData = resp.data.items.data.slice(0, 8);
          this.basketDataLength = resp.data.items.data.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {},
  mounted() {
    this.buyToGetAnother();
    this.getNewOffers();
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
