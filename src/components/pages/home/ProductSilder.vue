<template>
  <div class="product-silder">
    <span class="product-info">
      <h4 class="top-header">{{ $t("home.bestDeal") }}</h4>
    </span>
    <Countdown deadline="August 22, 2022"></Countdown>
    <VueSlickCarousel v-bind="settings" class="my-5" v-if="sliders">
      <div v-for="(slider, index) in sliders" :key="index">
        <ProductCard :slider="slider" />
      </div>
    </VueSlickCarousel>
    <span class="product-info">
      <h4 class="top-header">{{ $t("home.suppliers") }}</h4>
    </span>
    <div class="container mb-3">
      <div class="d-flex justify-content-end">
        <router-link to="/suppliers"> Show All </router-link>
      </div>
    </div>
    <b-row v-if="loading" class="px-5">
      <b-col lg="3" sm="6" v-for="x in 10" :key="x">
        <b-skeleton-img></b-skeleton-img>
        <b-card>
          <b-skeleton
            animation="fade"
            width="60%"
            class="border-none"
          ></b-skeleton>
          <b-skeleton
            animation="fade"
            width="85%"
            class="border-none"
          ></b-skeleton>
        </b-card>
      </b-col>
    </b-row>
    <VueSlickCarousel v-bind="settings" v-else>
      <div v-for="(supplier, index) in suppliers" :key="index" >
        <router-link
          :to="`/suppliers/${supplier.id}`"
          class="d-block text-center"
        >
          <img
            :src="supplier.image_path"
            class="supplier-image"
            alt="supplier image"
          />
        </router-link>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import Countdown from "vuejs-countdown";
import ProductCard from "@/components/global/ProductCard";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

import globalAxios from "@/services/global-axios";
import axios from "axios";
import { baseURL } from "@/apis/Api";
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
      suppliers: null,
      loading: false,
      sliders: null,
    };
  },
  methods: {
    getSuppliers() {
      this.loading = true;
      return globalAxios
        .get(`suppliers`)
        .then((resp) => {
          this.suppliers = resp.data.items.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getBestDeals() {
      axios
        .get(`${baseURL}products/featured/offers`)
        .then((res) => {
          this.sliders = res.data.items.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getSuppliers();
  },
  mounted() {
    this.getBestDeals();
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
.slick-current {
  img {
    opacity: 1;
  }
}
.supplier-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  transition: all .3s ease-in-out;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
}
</style>
