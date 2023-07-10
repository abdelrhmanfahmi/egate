<template>
  <section class="categoriesPage">
    <v-app>
      <v-container>
        <v-breadcrumbs :items="items">
          <template v-slot:prepend>
            <v-icon size="small" icon="mdi-home"></v-icon>
          </template>
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </template>
        </v-breadcrumbs>
        <div class="firstSliderHolder">
          <swiper v-bind="options" :modules="modules">
            <swiper-slide v-for="i in 10" :key="i" class="mx-2">
              <CategorySlideProduct :id="i" />
            </swiper-slide>
          </swiper>
        </div>
        <div class="otherOffers my-11">
          <OffersComponent :sectionTitle="'Electronics Offers'" />
        </div>
      </v-container>
      <v-container fluid>
        <div class="productsFilter my-11">
          <div class="d-flex">
            <div class="filters">
              <div class="sidebar-filter-overlay" @click="showSideMenu"></div>
              <div class="filtersHiddenSideBar">
                <span
                  class="toggleSideFilter"
                  role="button"
                  @click="showSideMenu"
                  ><v-icon icon="mdi-cog-outline"></v-icon
                ></span>
                <sideFilters />
              </div>
              <div class="filtersShowSideBar">
                <sideFilters />
              </div>
            </div>
            <div class="productsToFilter">
              <CategoryProducts :sectionTitle="''" :seeMore="'no'" />
            </div>
          </div>
        </div>
      </v-container>
      <v-container>
        <div class="otherOffers my-11">
          <OffersComponent :sectionTitle="''" :seeMore="'no'" />
        </div>
        <div class="text-center d-flex justify-space-evenly align-center mt-5">
          <Paginate
            :total-pages="totalPages"
            :per-page="totalPages"
            :current-page="page"
            @pageChanged="onPageChange"
          />
        </div>
      </v-container>
      <ReviewModal />
    </v-app>
  </section>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// import required modules
import { Navigation, Autoplay } from "swiper";

import CategorySlideProduct from "./CategorySlideProduct.vue";
import CategoryProducts from "@/components/categories/CategoryProducts.vue";
import sideFilters from "@/components/categories/sideBar.vue";
import OffersComponent from "@/components/home/OffersComponent.vue";
import Paginate from "@/components/shared/Paginate.vue";
import ReviewModal from "@/components/shared/Modals/Product/ReturnProduct.vue";

import { useMeta } from "vue-meta";

export default {
  components: {
    Swiper,
    SwiperSlide,
    CategorySlideProduct,
    CategoryProducts,
    sideFilters,
    OffersComponent,
    Paginate,
    ReviewModal,
  },
  setup() {
    useMeta({
      title: "Categories",
      htmlAttrs: { lang: "en", amp: true },
    });
    return {
      modules: [Navigation, Autoplay],
    };
  },
  data() {
    return {
      options: {
        // slidesPerView: 7,
        spaceBetween: 0,
        // slidesToShow: 7,
        loop: true,
        navigation: true,
        centeredSlides: false,
        speed: 300,
        direction: "horizontal",
        // zoom: true,
        autoplay: {
          delay: 2000,
        },
        breakpoints: {
          320: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          770: {
            slidesPerView: 4,
            spaceBetween: 50,
          },

          771: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
        },

        // navigation: true,
      },
      items: [
        {
          title: "ELECTRONICS",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },

        {
          title: "COMPUTERS COMPONENTS & ACCESSORIES",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
        {
          title: "LAPTOPS & NOTEBOOKS",
          disabled: true,
          href: "breadcrumbs_link_2",
        },
      ],
      perPage: 5,
      total: 0,
      currentPage: 1,

      page: 1,
      totalPages: 0,
      totalRecords: 0,
      recordsPerPage: 10,
      enterPageNo: "",
    };
  },
  methods: {
    showSideMenu() {
      document
        .querySelector(".filtersHiddenSideBar")
        .classList.toggle("showSide");
      document
        .querySelector(".sidebar-filter-overlay")
        .classList.toggle("active");
    },
    // this functions used for pagination
    onPageChange(page) {
      this.page = page;
      // this.getWishlistProducts();
      console.log("changed");
    },
    onChangeRecordsPerPage() {
      // this.getWishlistProducts();
      console.log("changed");
    },
    gotoPage() {
      if (!isNaN(parseInt(this.enterPageNo))) {
        this.page = parseInt(this.enterPageNo);
        // this.getWishlistProducts();
        console.log("changed");
      }
    },
  },
  mounted(){
    this.$nextTick(() => {
      document.dispatchEvent(new Event("render-complete"));
    });
  }
};
</script>
<style lang="scss" scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.filtersShowSideBar {
  opacity: 1;
  display: block;
  width: 100%;
}

.filtersHiddenSideBar {
  display: block;
  position: fixed;
  height: 100%;
  width: 90%;
  background: #fff;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  transform: translateX(-100%);
  opacity: 0;
  transition: all 0.3s ease-in-out;

  @media (max-width: 1200px) {
    opacity: 1;
    transform: translateX(-100%);
    width: 65%;
  }
}

.showSide {
  width: 300px;
  transform: translateX(0);
  transition: all 0.3s ease-in-out;

  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-top: 150px;
  @media (min-width: 767px) and (max-width: 992px) {
    padding-top: 180px;
  }
  @media (max-width: 766.98px) {
    padding-top: 280px;
  }
}

@media (max-width: 1200px) {
  .filtersShowSideBar {
    opacity: 0;
    width: 0;
    display: none;
  }
}

.toggleSideFilter {
  display: block;
  position: fixed;
  top: 50%;
  left: 100%;
  z-index: 99;
  color: #fff;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transform: translateY(-50%);

  transition: all 0.3s ease-in-out;
}

.sidebar-filter-overlay {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(25, 25, 25, 0.25);
  z-index: 90;
  transition: all 0.4s;
  visibility: hidden;
  opacity: 0;
}

.sidebar-filter-overlay.active {
  visibility: visible;
  opacity: 1;
}
</style>
