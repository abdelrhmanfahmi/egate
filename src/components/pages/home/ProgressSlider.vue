<template>
  <div class="product-silder text-center">
    <b-container>
      <div class="info" v-if="sliders">
        <p>{{ $t("home.bestDeal") }}</p>
        <router-link to="/best-deals">{{ $t("home.showAll") }}</router-link>
      </div>

      <VueSlickCarousel v-bind="settings" class="my-2" v-if="sliders">
        <div
          v-for="(slider, index) in sliders"
          :key="index"
          class="text-center"
        >
          <router-link :to="{ path: '/details', query: { id: `${slider.id}` } }" v-if="slider">
            <vue-ellipse-progress v-if="slider.offer_active_by_type.countdown_percentage"
              :progress="slider.offer_active_by_type.countdown_percentage"
              :determinate="determinate"
              v-bind="options"
              :loading="loading"
              :no-data="noData"
            >
              <b-img
                v-if="slider.product.image_path"
                :src="slider.product.image_path"
                class="offer-image"
              >
              </b-img>
            </vue-ellipse-progress>
            <h6 class="main-header mt-2" v-if="slider.product.title">
              {{ slider.product.title }}
            </h6>
          </router-link>
        </div>
      </VueSlickCarousel>
    </b-container>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";

import "vue-slick-carousel/dist/vue-slick-carousel.css";

import { baseURL } from "@/apis/Api";
import axios from "axios";
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
      sliders: null,
      progress: 90,
      options: {
        color: "#ed2124",
        "empty-color": "transparent",
        size: 90,
        thickness: 3,
        "empty-thickness": 3,
        "line-mode": "out 5",
        animation: "rs 700 1000",
        "font-size": "1.5rem",
        "font-color": "white",
      },
      loading: false,
      determinate: false,
      noData: false,
    };
  },
  methods: {
    getBestDeals() {
      axios
        .get(`${baseURL}products/best/offers`)
        .then((res) => {
          console.log("getBestDeals", res);
          this.sliders = res.data.items.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getBestDeals();
    if (this.progress === 0) this.nodata = true;
  },
};
</script>

<style lang="scss" scoped>
.product-silder {
  padding: 20px 10px;
  .info {
    display: flex;
    justify-content: space-between;
    a {
      text-transform: capitalize;
    }
  }
  img {
    border-radius: 50%;
    display: inline-block;
  }
}

html:lang(ar) {
  .product-silder {
    text-align: right;
  }
}
.offer-image {
  width: 75px;
  height: 75px;
  border-radius: 50%;
}
</style>
