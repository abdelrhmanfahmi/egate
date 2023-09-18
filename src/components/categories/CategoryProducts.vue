<template>
  <div class="wrapper categoryProducts">
    <v-container>
      <div class="topFilters d-flex justify-space-between align-center">
        <div class="sorting-holder">
          <div class="mx-2 text-gray">
            <b>Sort By</b>
          </div>
          <div class="sortOptions">
            <!-- <v-select
              label="Select"
              :items="[
                'California',
                'Colorado',
                'Florida',
                'Georgia',
                'Texas',
                'Wyoming',
              ]"
            ></v-select> -->
            <select name="" id="" class="custom-select">
              <option :value="`Featured- ${i}`" v-for="i in 5" :key="i">
                Featured {{ i }}
              </option>
            </select>
          </div>
        </div>
        <div class="displayType aligned-row">
          <p class="text-gray">115 Results</p>
          <div class="sortOptions mx-3">
            <select name="" id="" class="custom-select" v-model="selected" @change="selectNumbersToShow">
              <!-- 'Show 10',
                'Show 20',
                'Show 30',
                'Show 40',
                'Show 50',
                'Show 60', -->
              <option disabled value="">Showing</option>
              <option :value="i + 1 + 5" v-for="i in 5" :key="i">
                Showing {{ i }}
              </option>
            </select>
          </div>
          <div class="displayType">
            <div class="bar">
              <!-- These two buttons switch the layout variable,
                       which causes the correct UL to be shown. -->
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
      <div class="d-flex justify-space-between align-center">
        <div class="section-title">
          <h3>{{ sectionTitle }}</h3>
        </div>
        <div v-if="seeMore == 'yes'">
          <router-link to="/" class="text-decoration-underline"><span class="see-more">See More</span></router-link>
        </div>
      </div>
    </v-container>
    <section id="js-grid-list" class="grid-list">
      <form id="main">
        <!-- We have two layouts. We choose which one to show depending on the "layout" binding -->

        <ul v-if="layout == 'grid'" class="grid">
          <!-- A view with big photos and no text -->

          <div class="products-slider-wrapper">
            <v-container>
              <section class="pb-5">
                <v-row>
                  <v-col class="mySwiper" cols="12" sm="12" md="4" lg="4" v-for="(x, index) in numbersToShow"
                    :key="index">
                    <!-- <ProductCard /> -->
                    test
                  </v-col>
                </v-row>
              </section>
            </v-container>
          </div>
        </ul>

        <ul v-if="layout == 'list'" class="list">
          <!-- A compact view smaller photos and titles -->
          <div class="products-slider-wrapper">
            <v-container>
              <!-- <section class="pb-5">
                <div v-for="(x, index) in numbersToShow" :key="index">
                  <ProductCard />
                </div>
              </section> -->
              <section class="pb-5">
                <div class="">
                  <swiper  :modules="modules" v-bind="swiperListOptions" class="mySwiper">
                    <swiper-slide v-for="(x, index) in numbersToShow" :key="index">
                      <ProductCard />
                    </swiper-slide>
                  </swiper>
                </div>
              </section>
            </v-container>
          </div>
        </ul>
      </form>
    </section>
    <!-- products slider  -->
    <!-- <div class="products-slider-wrapper">
      <v-container>
        <section class="pb-5">
          <div class="">
            <swiper
              :spaceBetween="5"
              :modules="modules"
              :breakpoints="swiperOptions.breakpoints"
              class="mySwiper"
            >
              <swiper-slide v-for="(x, index) in 20" :key="index"
                ><ProductCard
              /></swiper-slide>
            </swiper>
          </div>
        </section>
      </v-container>
    </div> -->
  </div>
</template>

<script>
import ProductCard from "@/components/shared/Products/ProductCard.vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// import required modules
import { Navigation, Autoplay } from "swiper";
export default {
  props: {
    sectionTitle: {
      type: String,
    },
    seeMore: {
      type: String,
      default: "yes",
    },
  },
  components: {
    ProductCard,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      swiperGridOptions: {
        slidesPerView:4,
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
          1500 : {
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
        // pagination:{
        //     clickable:true
        // }
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
    };
  },
  methods: {
    selectNumbersToShow(event) {
      this.numbersToShow = this.selected;
      console.log("number", this.selected);
    },
  },
  setup() {
    return {
      modules: [Navigation, Autoplay],
    };
  },
};
</script>

<style lang="scss" scoped>
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

    /*-------------------------
        The search input
      --------------------------*/

    .list {
      .card-wrapper {
        width: 60% !important;
        margin: auto !important;
      }
    }

    /*-------------------------
        List layout
      --------------------------*/

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

    /*-------------------------
        Grid layout
      --------------------------*/

    ul.grid {
      list-style: none;
      width: 570px;
      margin: 0 auto;
      text-align: left;
    }

    ul.grid li {
      padding: 2px;
      float: left;
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
</style>
