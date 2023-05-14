<template>
  <div class="new-daily-offers-wrapper my-5 py-5" v-if="itemsLength > 0">
    <div class="container">
      <h2>{{ $t("home.dailyOffers") }}</h2>
    </div>
    <div class="px-5">
      <div class="slider text-center">
        <VueSlickCarousel v-bind="settings" v-if="items && items.length" class="my-2">
          <div v-for="(item, index) in items" :key="index" class="slide-holder">
            <!-- <router-link :to="{ path: '/details', query: { id: `${item.id}` } }" v-if="item">
                            <div class="" v-if="item.current_main_image_path !== null">
                                <b-img :src="item.current_main_image_path" class="offer-image"> </b-img>
                            </div>
                            <h6 class="main-header mt-2" v-if="item.product.title">
                                <span>{{ item.product.title.substr(0, 15) }} <span
                                        v-if="item.product.title.length > 15">...</span> </span>
                            </h6>
                        </router-link> -->
            <div
              class="row"
              :class="{
                'text-left': $i18n.locale == 'en',
                'text-right': $i18n.locale == 'ar',
              }"
            >
              <div class="col-xl-4 col-lg-12 col-md-12 col-sm-12">
                <div class="time-holder" v-if="item.current_main_image_path !== null">
                  <b-img :src="item.current_main_image_path" class="offer-image w-100">
                  </b-img>
                  <div class="time-count" v-if="item.offer_active_by_type.end_date">
                    <Countdown
                      :until="item.offer_active_by_type.end_date"
                      format="DHMS"
                      wrap="coming-countdown countdown-separator"
                    ></Countdown>
                  </div>
                </div>
              </div>
              <div class="col-xl-8 col-lg-12 col-md-12 col-sm-12">
                <h4 class="main-header mt-2" v-if="item.product.title">
                  <span
                    >{{ item.product.title.substr(0, 15) }}
                    <span v-if="item.product.title.length > 15">...</span>
                  </span>
                </h4>
                <!-- price  -->
                <div class="row mb-3 align-items-center">
                  <div
                    class="col-md-6 col-sm-12"
                    v-if="item.product_details_by_type.price"
                  >
                    <h6 class="main-color">
                      {{ item.product_details_by_type.price | fixedCurrency }}
                      {{ currency }}
                    </h6>
                  </div>
                  <div
                    class="col-md-6 col-sm-12"
                    v-if="item.product_details_by_type.price < item.product_details_by_type.price_before_discount && item.product_details_by_type.price_before_discount"
                  >
                    <del>
                      <h6>
                        {{
                          item.product_details_by_type.price_before_discount
                            | fixedCurrency
                        }}
                        {{ currency }}
                      </h6>
                    </del>
                  </div>
                </div>
                <!-- supplier  & weight  -->
                <div class="row mb-3 align-items-center">
                  <div
                    class="col-md-6 col-sm-12"
                    v-if="item.client.id && item.client.company"
                  >
                    <router-link
                      :to="`/suppliers/${item.client.id}`"
                      class="supplier-name"
                    >
                      <h6>{{ $t("items.supplier") }} : {{ item.client.company }}</h6>
                    </router-link>
                  </div>
                  <div
                    class="col-md-6 col-sm-12"
                    v-if="item.product_details_by_type.weight"
                  >
                    <h6>
                      {{ $t("singleProduct.weight") }} :
                      {{ item.product_details_by_type.weight }}
                    </h6>
                  </div>
                </div>
                <!-- product category -->
                <h6 class="mb-3">{{ $t("items.item") }} : fruits</h6>
                <!-- acions  -->
                <div class="row mb-3 align-items-center">
                  <div class="col-md-6 col-sm-12 mb-3 px-1">
                    <router-link
                      :to="{ path: '/details', query: { id: `${item.id}` } }"
                      v-if="item"
                    >
                      <button class="outline-main">{{ $t("profile.details") }}</button>
                    </router-link>
                  </div>
                  <div
                    class="col-md-6 col-sm-12 mb-3 px-1"
                    v-if="
                      (add_to_cart == true&&
                        item.product_details_by_type.add_type === 'cart') ||
                      (add_to_cart == true&&
                        item.product_details_by_type.add_type === 'both')
                    "
                  >
                    <button class="bg-main text-white" @click="addToCart(item)">
                      {{ $t("items.addToCart") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </VueSlickCarousel>
        <b-row class="holder" v-if="loading">
          <b-col lg="3" sm="6" v-for="x in 3" :key="x">
            <b-skeleton-img></b-skeleton-img>
            <b-card>
              <b-skeleton animation="fade" width="60%" class="border-none"></b-skeleton>
              <b-skeleton animation="fade" width="85%" class="border-none"></b-skeleton>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import categories from "@/services/categories";
import globalAxios from "@/services/global-axios";

import Countdown from "@/components/global/CustomCountDown.vue";

export default {
  components: {
    VueSlickCarousel,
    Countdown,
  },
  data() {
    return {
      settings: {
        dots: false,
        infinite: false,
        arrows: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        focusOnSelect: true,
        touchThreshold: 5,

        responsive: [
          {
            breakpoint: 1191,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 820,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
            },
          },
        ],
      },
      items: null,
      loading: false,
      noData: false,
      cartCounter: 1,
    };
  },
  methods: {
    /**
     *  GET best deals from api
     */
    getBestDeals() {
      this.loading = true;
      categories
        .getBestDeals()
        .then((res) => {
          this.items = res.data.items.data;
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
     * add To Cart function
     */
    addToCart(item) {
      let data = {
        product_supplier_id: item.product_details_by_type.product_supplier_id,
        quantity:
          this.cartCounter > item.product_details_by_type.min_order_quantity
            ? this.cartCounter
            : item.product_details_by_type.min_order_quantity,
      };
      return globalAxios
        .post(`cart/add`, data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);

            this.$modal.show(
              () => import("@/components/cart/cartModal.vue"),
              {
                product: item,
              },
              { width: "700", height: "auto", adaptive: true }
            );
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        })
        .finally(() => {
          setTimeout(() => {
            this.$store.dispatch("cart/getCartProducts");
          }, 500);
        });
    },
  },
  mounted() {
    this.getBestDeals();
  },
  computed: {
    itemsLength() {
      return this.items ? this.items.length : 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.offer-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
}

.slide-holder {
  background-color: #eff0f0;
  border-radius: 10px;
  padding: 15px;
  width: 95% !important;
}
@media (max-width:992px) {
  .slide-holder{
    width: 100% !important; 
  }
}

button {
  border-radius: 8px;
  padding: 10px 20px;
  border: none;
  box-shadow: none;
  outline: none;
}

.outline-main {
  border: 2px solid $main-color;
  background: transparent;
  color: $main-color;
}

.supplier-name {
  text-decoration: underline !important;
  color: inherit;
}

.time-holder {
  position: relative;
}

.time-count {
  position: absolute;
  top: 0;
  left: 10px;
  font-size: 14px;
  background: $main-color;
  border-radius: 0 0 20px 20px;
  color: #fff;
  right: 10px;
}

.row {
  @media (max-width: 1200px) {
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
  }
}
</style>
