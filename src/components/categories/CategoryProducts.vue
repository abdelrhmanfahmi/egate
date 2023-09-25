<template>
  <div class="categoryProducts">
    <v-container fluid>
      <div class="topFilters d-flex justify-space-between align-center">
        <div class="sorting-holder">
          <div class="mx-2 text-gray">
            <b>Sort By</b>
          </div>

          <div class="sortOptions">
            <select @change="getResultsProduct" class="custom-select">
              <option selected disabled>Sort By</option>
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>
        </div>

        <div class="displayType aligned-row">
          <div class="mx-2 text-gray">
            <b>{{ categoryProducts.length }} Result</b>
          </div>
          <div class="sortOptions mx-3">
            <select name="" id="" class="custom-select" v-model="selected" @change="selectNumbersToShow">
              <option disabled value="">Showing</option>
              <option :value="i + 1 + categoryProducts.length" v-for="i in categoryProducts.length" :key="i">
                Showing {{ i }}
              </option>
            </select>
          </div>

          <div class="displayType">
            <div class="bar">
              <a class="grid-icon" role="button" v-bind:class="{ 'main-color': layout == 'grid' }"
                v-on:click="layout = 'grid'">
                <v-icon icon="mdi-dots-grid" size="large"></v-icon>
              </a>

              <a class="list-icon" role="button" v-bind:class="{ 'main-color': layout == 'list' }"
                v-on:click="layout = 'list'">
                <v-icon icon="mdi-format-list-bulleted" size="large"></v-icon>
              </a>
            </div>
          </div>
        </div>
      </div>
    </v-container>

    <section id="js-grid-list" class="grid-list">
      <form id="main">
        <ul v-if="layout == 'grid'" class="grid">
          <div class="products-slider-wrapper">
            <v-container fluid>
              <section class="pb-5">
                <v-row v-if="categoryProducts.length > 0">
                  <v-col class="mySwiper" cols="12" sm="12" md="4" lg="4" v-for="(product, index) in categoryProducts"
                    :key="index">
                    <ProductCard :product="product" />
                  </v-col>
                </v-row>
                <v-row v-else>
                  <div class="text-center w-100">
                    <h3 class="text-gray">No Products</h3>
                  </div>
                </v-row>
              </section>
            </v-container>
          </div>
        </ul>

        <ul v-if="layout == 'list'" class="list">
          <div class="products-slider-wrapper">
            <v-container fluid>
              <section class="pb-5">
                <div class="">
                  <swiper :modules="modules" v-bind="swiperListOptions" class="mySwiper">
                    <swiper-slide v-for="(product, index) in categoryProducts" :key="index">
                      <ProductCard :product="product" />
                    </swiper-slide>
                  </swiper>
                </div>

              </section>
            </v-container>
          </div>
        </ul>
      </form>
    </section>
  </div>
</template>

<script>
import ProductCard from "@/components/shared/Products/ProductCard.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper";
import globalAxios from "@/services/global-axios";
export default {
  setup() {
    return {
      modules: [Navigation, Autoplay],
    };
  },
  
  props: ['categoryProducts'],

  data() {
    return {
      swiperGridOptions: {
        slidesPerView: 4,
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          770: {
            slidesPerView: 2,
            spaceBetween: 50,
          },

          991: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1500: {
            slidesPerView: 4,
            spaceBetween: 0,
          }
        },
        loop: true,
        navigation: false,
        centeredSlides: true,
        speed: 300,
        direction: "horizontal",
        autoplay: {
          delay: 5000,
        },
      },
      swiperListOptions: {
        slidesPerView: 1,
        loop: true,
        navigation: true,
        speed: 300,
        autoplay: {
          delay: 5000,
        },
      },
      layout: "grid",
      numbersToShow: 8,
      selected: "",
      category_id:null
    };
  },

  methods: {
    selectNumbersToShow(event) {
      this.numbersToShow = this.selected;
      console.log("number", this.selected);
    },

    async getResultsProduct(e) {
      let obj = {
        subCategory:this.category_id,
        page:1
      };
      if(e.target.value == 'desc'){
        obj.sort_field = 'id';
        this.$emit('updateProducts' , obj);
      }else{
        this.$emit('updateProducts' , obj);
      }
    },

  },
  components: {
    ProductCard,
    Swiper,
    SwiperSlide
  },
};
</script>

<style lang="scss" scoped>
.categoryProducts {
  position: relative;
  bottom: 14px;
}

.sorting-holder {
  display: flex;
  align-items: center;

  .bar input {
    background: #fff no-repeat 13px 13px;

    border: none;
    width: 100%;
    line-height: 19px;
    padding: 11px 0;

    border-radius: 2px;
    box-shadow: 0 2px 8px #c4c4c4 inset;
    text-align: left;
    font-size: 14px;
    font-family: inherit;
    color: #738289;
    font-weight: bold;
    outline: none;
    text-indent: 40px;
  }

  .grid-list {

    a,
    a:visited {
      outline: none;
      color: #389dc1;
    }

    a:hover {
      text-decoration: none;
    }

    section,
    footer,
    header,
    aside,
    nav {
      display: block;
    }

    .list {
      .card-wrapper {
        width: 60% !important;
        margin: auto !important;
      }
    }

    ul.list {
      list-style: none;
      width: 500px;
      margin: 0 auto;
      text-align: left;
    }

    ul.list li {
      border-bottom: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
    }

    ul.list li img {
      width: 120px;
      height: 120px;
      float: left;
      border: none;
    }

    ul.list li p {
      margin-left: 135px;
      font-weight: bold;
      color: #6e7a7f;
    }

    ul.grid {
      list-style: none;
      width: 100% !important;
      margin: 0 auto;
      // text-align: left;
    }

    ul.grid li {
      padding: 2px;
      // float: left;
    }

    ul.grid li img {
      width: 280px;
      height: 280px;
      object-fit: cover;
      display: block;
      border: none;
    }
  }
}

.bar {
  position: relative;
}

.bar a {
  padding: 5px;
  display: inline-block;
  text-decoration: none !important;
  margin-right: 5px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 15px;
}

.bar a.active {
  background-color: $main-color;
}

.bar input {
  background: #fff no-repeat 13px 13px;
  border: none;
  width: 100%;
  line-height: 19px;
  padding: 11px 0;
  border-radius: 2px;
  box-shadow: 0 2px 8px #c4c4c4 inset;
  text-align: left;
  font-size: 14px;
  font-family: inherit;
  color: #738289;
  font-weight: bold;
  outline: none;
  text-indent: 40px;
}

@media (max-width:500px) {

  b,
  strong {
    font-size: 13px;
  }

  .custom-select {
    padding: 0px 4px;
  }

  .bar {
    position: relative;
  }

  .bar a {
    padding: 5px;
    display: inline-block;
    text-decoration: none !important;
    margin-right: 5px;
    border-radius: 2px;
    cursor: pointer;
    font-size: 15px;
  }

  .bar a.active {
    background-color: $main-color;
  }

  .bar input {
    background: #fff no-repeat 13px 13px;
    border: none;
    width: 100%;
    line-height: 19px;
    padding: 11px 0;
    border-radius: 2px;
    box-shadow: 0 2px 8px #c4c4c4 inset;
    text-align: left;
    font-size: 14px;
    font-family: inherit;
    color: #738289;
    font-weight: bold;
    outline: none;
    text-indent: 40px;
  }
}
</style>
