<template>
  <div class="product-silder text-center mt-2">
    <!-- home page top slider for offers -->
    <b-container v-if="slidersLength > 0">
      <div class="info">
        <p>{{ $t("home.dailyOffers") }}</p>
        <router-link to="/best-deals" class="showAllLink">{{
          $t("home.showAll")
        }}</router-link>
      </div>

      <VueSlickCarousel
        v-bind="settings"
        v-if="sliders && sliders.length"
        class="my-2"
      >
        <div
          v-for="(slider, index) in sliders"
          :key="index"
          class="text-center"
        >
          <router-link
            :to="{ path: '/details', query: { id: `${slider.id}` } }"
            v-if="slider"
          >
            <vue-ellipse-progress
              v-if="slider.offer_active_by_type.countdown_percentage >= 0"
              :progress="slider.offer_active_by_type.countdown_percentage"
              :determinate="determinate"
              v-bind="options"
              :loading="loading"
              :no-data="noData"
            >
              <div class="" v-if="slider.current_main_image_path !== null">
                <b-img :src="slider.current_main_image_path" class="offer-image"> </b-img>
              </div>
            </vue-ellipse-progress>
            <h6 class="main-header mt-2" v-if="slider.product.title">
              <span>{{ slider.product.title.substr(0,15) }} <span v-if="slider.product.title.length > 15">...</span> </span>
            </h6>
          </router-link>
        </div>
      </VueSlickCarousel>
    </b-container>
  </div>
</template>

<script>
// progress slider component 
import VueSlickCarousel from "vue-slick-carousel";

import "vue-slick-carousel/dist/vue-slick-carousel.css";

import categories from "@/services/categories";
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
        color: "$main-color",
        "empty-color": "transparent",
        size: 60,
        thickness: 3,
        "empty-thickness": 3,
        "line-mode": "out 2",
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
    /**
      *  GET best deals from api
    */  
    getBestDeals() {
      categories
        .getBestDeals()
        .then((res) => {
          this.sliders = res.data.items.data;
        })
        // .catch((err) => {
        //   console.log(err);
        // });
    },
  },
  mounted() {
    this.getBestDeals();
    /**
      *  setting slider
    */
    if (this.progress === 0) this.nodata = true;
  },
  computed: {
    slidersLength() {
      return this.sliders ? this.sliders.length : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
/**
  *  component style
*/
.product-silder {
  padding: 0 75px;
  @media(max-width:991.98px){
    padding: 0;
  }
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
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
