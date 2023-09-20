<template>
  <div>
    <div class="wrapper tabs-component">
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" xl="3" lg="4" md="4" sm="12">
            <div class="sidePromotionHolder">
              <v-row justify="space-between" align="center" class="mb-2">
                <v-col cols="12" md="6">
                  <h3 class="m-0">Special Offer</h3>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="saveMony">
                    <p class="m-0">Save</p>
                    <p class="m-0"><b>200 Egp</b></p>
                  </div>
                </v-col>
              </v-row>
              <div class="imageHolder">
                <v-img
                  src="https://cdn.vox-cdn.com/thumbor/vabx-KeOe5GULF4lqyITVmXMU6I=/0x0:1600x800/1400x788/filters:focal(800x400:801x401)/cdn0.vox-cdn.com/uploads/chorus_asset/file/8853589/google_ai_photography_street_view_2.jpg"
                  class="image-fluid"
                  ></v-img>
                  <!-- lazy-src="@/assets/images/home/Image20.png" -->
              </div>
              <div class="description">
                <h4>Game Console Controller + Usb 3.0 Cable</h4>
                <v-row class="aligned-row mt-1 mb-3">
                  <v-col cols="lg" sm="6" md="12">
                    <p class="price-after-desc">Egp 6,999.00</p>
                  </v-col>
                  <v-col cols="lg" sm="6" md="12">
                    <p class="product-price red-text">Egp 4,999.00</p>
                  </v-col>
                </v-row>
                <v-row class="aligned-row mt-1 mb-3">
                  <v-col cols="lg" sm="6" md="12">
                    <div class="d-flex">
                      <span
                        ><v-icon icon="mdi-clock-time-eight-outline"></v-icon
                      ></span>
                      <p class="mx-2">
                        <span class="gray-color"> Available : </span>
                        <span><b>6</b></span>
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="lg" sm="6" md="12">
                    <div class="d-flex">
                      <span class="gray-color">Already Sold : </span>
                      <span><b>28</b></span>
                    </div>
                  </v-col>
                </v-row>
                <h4 class="text-gray">Hurry Up! Offer Ends In:</h4>
                <!-- countdowun timer  -->
                <count-down
                  until="2021-07-20"
                  format="DHMS"
                  wrap="coming-countdown countdown-separator"
                ></count-down>
                <div class="mb-5"></div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" xl="9" lg="8" md="8" sm="12">
            <v-tabs
              v-model="tab"
              color="deep-purple-accent-4"
              align-tabs="center"
            >
              <v-tab :value="1">Featured</v-tab>
              <v-tab :value="2">On Sale</v-tab>
              <v-tab :value="3">Top Rated</v-tab>
            </v-tabs>
            <v-window v-model="tab">
              <v-window-item v-for="n in 3" :key="n" :value="n">
                <v-container fluid>
                  <div v-for="i in 2" :key="i" cols="12" md="4">
                    <swiper
                      :slidesPerView="1"
                      :grid="{
                        rows: 2,
                      }"
                      :spaceBetween="10"
                      :pagination="{
                        clickable: true,
                      }"
                      :modules="modules"
                      class="mySwiper"
                    >
                      <swiper-slide>
                        <!-- products slider  -->
                        <TabsProductsSlider />
                      </swiper-slide>
                    </swiper>
                  </div>
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
export default {
  data: () => ({
    tab: null,
  }),
  components: {
    Swiper,
    SwiperSlide,
    TabsProductsSlider,
    CountDown,
  },
  setup() {
    return {
      modules: [Grid, Pagination],
    };
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
</style>
