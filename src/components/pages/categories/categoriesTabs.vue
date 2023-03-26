<template>
  <div class="tabsWrapper">
    <VueSlickCarousel
      :arrows="true"
      v-bind="settings"
      v-if="!loading && clients && clients.length"
    >
      <div class="tabs-holder">
        <div class="tabs-content">
          <b-tabs>
            <!-- first tab that contain all sub-categories  -->
            <b-tab
              :title="$t('home.All')"
              @click="selectDefaultTab"
              id="All"
              v-bind="{
                active: !$route.query.brand || $route.query.brand == 'All',
              }"
            >
              <slot name="defaultTab"></slot>
            </b-tab>
            <!-- second tab that contain classified sub-categories  -->
            <b-tab
              :title="category.title"
              v-for="(category, index) in subCategories"
              :key="index"
              @click="selectTab(category)"
              :id="`category-${index}`"
              v-bind="{
                active: $route.query.brand == category.title.replace(/\s/g, ''),
              }"
            >
              <slot name="otherTabs">data</slot>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
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
        slidesToShow: 6,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        arrows: true,

        responsive: [
          {
            breakpoint: 1191,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 820,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      clients: [],
      clientsLength: null,
      perPage: 5,
      total: 0,
      currentPage: 1,

      page: 1,
      totalPages: 0,
      totalRecords: 0,
      recordsPerPage: 10,
      enterpageno: "",
      loading: false,
    };
  },
  props: ["subCategories", "allSubCategories"],
  methods: {
    /**
     * @vuese
     * selectTab function
     */
    selectTab(item) {
      let query = {};
      if (this.$route.query.brand) {
        for (let key in this.$route.query) {
          if (key !== "brand") {
            query[key] = this.$route.query[key];
          }
        }
      } else {
        query = {
          brand: item.title.trim().replace(/\s/g, ""),
        };
      }

      if (!this.$route.query.brand) {
        query = {
          brand: item.title.trim().replace(/\s/g, ""),
        };
        console.log("third");
      } else if (
        this.$route.query.brand
          .split(",")
          .includes(item.title.replace(/\s/g, ""))
      ) {
        query = {
          brand: query.brand,
        };
      } else {
        query = {
          brand: item.title.trim().replace(/\s/g, ""),
        };
      }

      this.$router.push({
        path: this.$route.path,
        query: query,
      });
    },

    /**
     * @vuese
     * set default tab  function
     */
    selectDefaultTab() {
      let query = {};
      if (this.$route.query.page) {
        for (let key in this.$route.query) {
          if (key !== "page") {
            query[key] = this.$route.query[key];
          }
        }
      } else {
        query = {
          brand: "All",
        };
      }

      if (!this.$route.query.brand) {
        query = {
          brand: "All",
        };
        console.log("third");
      } else if (
        this.$route.query.brand.split(",").includes(this.$route.query.brand)
      ) {
        query = {
          brand: query.brand,
        };
      } else {
        query = {
          brand: "All",
        };
      }

      this.$router.push({
        path: this.$route.path,
        query: query,
      });
    },
  },
  mounted() {
    if (this.$route.query.brand) {
      this.myActiveAtt = this.$route.query.brand;
    } else {
      this.myActiveAtt = "All";
    }
  },
};
</script>

<style></style>
