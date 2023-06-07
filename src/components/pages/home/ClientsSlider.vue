<template>
  <div class="product-silder pt-5 clients-suppliers-page">
    <!-- if there is suppliers  -->
    <div class="suppliers pt-2" v-if="clients">
      <span class="product-info">
        <h4 class="text-dark">{{ $t("home.clients") }}</h4>
        <!-- <h4 class="top-header">{{ $t("home.suppliers") }}</h4> -->
      </span>
      <div class="container mb-1">
        <div class="d-flex justify-content-end">
          <router-link to="/clients" class="showAllLink">
            {{ $t("home.showAll") }}
          </router-link>
        </div>
      </div>
      <!-- data loading  -->
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
      <!-- data comes from backend  -->
      <VueSlickCarousel
      :arrows="true"
        v-bind="settings"
        v-if="!loading && clients && clients.length"
      >
        <div v-for="(client, index) in clients" :key="index">
          <div
            class="d-flex justify-content-center align-items-center text-center"
          >
            <div
              class="d-flex justify-content-center align-items-center text-center"
              v-if="client.image_path"
            >
              <b-img
                :src="client.image_path"
                class="supplier-image"
                alt="client image"
              >
              </b-img>
            </div>
            <div class="supplier-image" v-else>
              <img
                :src="logoEnv"
                v-if="logoEnv"
                class="img-fluid upplier-image"
                alt="client image"
              />
            </div>
          </div>
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

import suppliers from "@/services/suppliers";

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
  methods: {
    /**
     * @vuese
     * get Clients function
     */
    getClients() {
      this.loading = true;
      suppliers
        .getClients(this.page)
        .then((resp) => {
          this.clients = resp.data.items.suppliers.data;
          this.clientsLength = resp.data.items.suppliers.data.length;

          this.total = resp.data.items.suppliers.meta.total;
          this.totalPages = Math.ceil(
            resp.data.items.suppliers.meta.total /
              resp.data.items.suppliers.meta.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.suppliers.meta.total;
          this.loading = false;
        })
        // .catch((err) => {
        //   console.log(err);
        // });
    },
  },
  mounted() {
    this.getClients();
  },
  computed: {
    /**
     *  check if slider has data
     */
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
  background-color: #f9f8f5;
  text-align: center;
  padding: 20px 5px;

  .product-info {
    padding-bottom: 20px;

    small {
      color: $main-color;
      font-size: 12px;
      text-transform: uppercase;
    }
  }

  .img-suplier {
    opacity: 1;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    display: block;
    text-align: center;

    &:hover {
      opacity: 0.75;
    }
  }
}

.slick-current {
  img {
    opacity: 1;
  }
}

.supplier-image {
  // width: 100px;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  opacity: 1;

  &:hover {
    opacity: 0.5;
  }
}
</style>
