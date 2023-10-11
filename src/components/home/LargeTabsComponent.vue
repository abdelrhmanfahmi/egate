<template>
  <div>
    <div class="wrapper tabs-component mb-5">
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" xl="3" lg="3" md="3" sm="12">
            <div class="sidePromotionHolder">
              <v-row justify="space-between" align="center" class="mb-2">
                <v-col cols="12" md="6">
                  <h3 class="m-0">Special Offer</h3>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="saveMony">
                    <p class="m-0">Save</p>
                    <p class="m-0"><b>EGP {{ specialOffer?.product?.price - specialOffer?.product?.product_price }}</b>
                    </p>
                  </div>
                </v-col>
              </v-row>
              <div class="imageHolder mb-3">
                <v-img :src="specialOffer.bannar" @click="goToSpecialOfferPage(specialOffer.id)"
                  class="image-fluid"></v-img>
              </div>
              <div class="description mb-3">
                <h4>{{ specialOffer?.product?.name }}</h4>
                <v-row class="aligned-row mt-1 mb-3">
                  <v-col cols="lg" sm="6" md="12">
                    <p class="price-after-desc">Egp {{ specialOffer?.product?.price }}</p>
                  </v-col>
                  <v-col cols="lg" sm="6" md="12">
                    <p class="product-price red-text">Egp {{ specialOffer?.product?.product_price }}</p>
                  </v-col>
                </v-row>
                <div class="row aligned-row mt-1 mb-3">
                  <div class="col-md-6 d-flex justify-content-center align-items-center">
                    <div class="d-flex">
                      <span><v-icon icon="mdi-clock-time-eight-outline" style="font-size:18px"></v-icon></span>
                      <p class="mx-2">
                        <span class="gray-color" style="font-size:13px"> Available : </span>
                        <b>6</b>
                      </p>
                    </div>
                  </div>
                  <div class="col-md-6 d-flex justify-content-center align-items-center styleAlreadySold">
                    <div class="d-flex">
                      <span class="gray-color" style="font-size:13px">Already Sold : </span>
                      <span><b>&nbsp; 28</b></span>
                    </div>
                  </div>
                </div>
                <h6 class="text-gray">Hurry Up! Offer Ends In:</h6>
                <!-- countdowun timer  -->
                <count-down format="DHMS" wrap="coming-countdown countdown-separator"></count-down>
                <div class="mb-5"></div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" xl="9" lg="9" md="9" sm="12">
            <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
              <v-tab :value="1" @click.prevent="getProductsWithFilter(1)">Featured</v-tab>
              <v-tab :value="2" @click.prevent="getProductsWithFilter(2)">On Sale</v-tab>
              <v-tab :value="3" @click.prevent="getProductsWithFilter(3)">Top Rated</v-tab>
            </v-tabs>
            <v-window v-model="tab">
              <v-window-item v-for="n in 3" :key="n" :value="n">
                <v-container fluid>
                  <swiper :slidesPerView="1" :grid="{
                    rows: 2,
                  }" :spaceBetween="10" :pagination="{
  clickable: true,
}" :modules="modules" class="mySwiper">
                    <swiper-slide>
                      <!-- products slider  -->
                      <TabsProductsSlider :products="products" />
                    </swiper-slide>
                  </swiper>
                </v-container>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Grid, Pagination } from "swiper";
import TabsProductsSlider from "@/components/shared/Tabs/TabsProductsSlider.vue";
import CountDown from "@/components/shared/CountDown.vue";
import home from '@/services/home';

export default {
  data() {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1);
    return {
      time: newYear - now,
      tab: null,
      products: []
    }
  },

  props: ['specialOffer'],

  setup() {
    return {
      modules: [Grid, Pagination],
    };
  },

  mounted() {
    this.getProductsWithFilter(1);
  },

  methods: {
    async getProductsWithFilter(e) {
      if (e == 1) {
        const response = await home.homeProductsFeatured();
        this.products = response.data.items.data;
      } else if (e == 2) {
        const response = await home.homeProducts();
        this.products = response.data.items.data;
      } else {
        const response = await home.homeProductsTopRated();
        this.products = response.data.items.data;
      }
    },
    goToSpecialOfferPage(id) {
      this.$router.push({ path: '/productPage/' + id });
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    TabsProductsSlider,
    CountDown,
  },

};
</script>

<style lang="scss" scoped>
.saveMony {
  background: $second-color;
  color: #000;
  padding: 20px;
  width: 100px;
  margin: auto;
  border-radius: 50%;
  font-size: 14px;
  text-align: center;
  height: 100px;
  line-height: 30px;

}

.sidePromotionHolder {
  text-align: center;
  border: 2px solid $second-color;
  padding: 20px;
  border-radius: 20px;
  background: #fff;
}

.styleAlreadySold {
  position: relative;
  bottom: 3px;
}

.imageHolder {
  cursor: pointer;
}
</style>
