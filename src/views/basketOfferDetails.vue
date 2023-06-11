<template>
  <!-- single product data  -->
  <div class="container basketSinglePage">
    <div
    class="navigation d-none d-lg-flex justify-content-start align-items-center"
  >
  </div>
    <div class="" v-if="myProduct !== null && !notFound">
      <b-row align-h="center" class="mt-5">
        <b-col cols="12" md="4" class="slider p-0">
          <div
            class="ribbon ribbon-top-left"
            :class="{ 'long-rebbon': dealType.trim().length > 20 }"
          >
            <span
              :class="{ 'long-rebbon-span': dealType.trim().length > 20 }"
              >{{ dealType }}</span
            >
          </div>
          <!-- product slider  -->
          <Slider :myProduct="myProduct"></Slider>
        </b-col>
        <b-col cols="12" md="8" class="product-info">
          <div class="px-2">
            <BasketProductInfo :myProduct="myProduct"></BasketProductInfo>
          </div>
        </b-col>
      </b-row>

      <!-- promotion_products table  -->
      <section class="py-3">
        <h2 class="text-center header font-weight-bold mt-5 mb-3">
          {{ $t("items.basketProducts") }}
        </h2>
        <!-- when data of relative products loading   -->
        <b-row v-if="loading">
          <b-col class="mb-2 mx-auto" sm="12" v-for="x in 4" :key="x">
            <b-card>
              <b-skeleton
                animation="fade"
                width="80%"
                class="border-none"
              ></b-skeleton>
              <b-skeleton
                animation="fade"
                width="95%"
                class="border-none"
              ></b-skeleton>
            </b-card>
          </b-col>
        </b-row>

        <!-- when data of relative products comes   -->

        <div class="products-table text-center" v-else>
          <table
            v-if="promotion_products"
            class="table table-striped table-hover table-bordered selectable"
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  v-for="(tab, index) in tableFields"
                  :key="index"
                >
                  {{ tab.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(productTable, index) in promotion_products"
                :key="index"
                @click="goProduct(productTable)"
                class="cursor-pointer"
              >
                <td v-if="productTable.product_supplier.product" class="title">
                  <span v-if="$i18n.locale == 'en'">{{
                    productTable.product_supplier.product.title
                  }}</span>
                  <span v-else-if="$i18n.locale == 'ar'">{{
                    productTable.product_supplier.product.title
                  }}</span>
                  <span v-else>-</span>
                </td>
                <td v-if="productTable.product_supplier.product" class="image">
                  <img
                    :src="productTable.product_supplier.product.image_path"
                    alt="procuct image"
                    class="product-image"
                    v-if="productTable.product_supplier.product.image_path"
                  />
                  <div class="" v-else-if="productTable.product_supplier.product.logoEnv">

                    <img
                      :src="logoEnv"
                      class="img-fluid product-image"
                      alt="logo"
                    />
                  </div>
                  <img src="@/assets/images/logo.png" v-else alt="logo" class="img-fluid product-image" />
                </td>
                <td
                  v-if="productTable.product_supplier.product"
                  class="supplier"
                >
                  <span v-if="myProduct.client.company_name">{{
                    myProduct.client.company_name
                  }}</span>
                  <span v-else>-</span>
                </td>
                <td v-if="productTable.product_supplier.product" class="unit">
                  <span
                    v-if="
                      productTable.product_supplier.product_details_by_type
                        .weight
                    "
                    >{{
                      productTable.product_supplier.product_details_by_type
                        .weight
                    }}</span
                  >
                  <span
                    v-if="productTable.product_supplier.product_details[0].unit"
                    >{{
                      productTable.product_supplier.product_details[0].unit
                        .title
                    }}</span
                  >
                  <span v-else>-</span>
                </td>
                <td v-if="productTable.product_supplier.product" class="price">
                  <span v-if="productTable.product_price"
                    >{{ productTable.product_price | fixedCurrency }}
                    {{ currency }}</span
                  >
                  <span v-else>-</span>
                </td>
                <td
                  v-if="productTable.product_supplier.product"
                  class="quantity"
                >
                  <span v-if="productTable.quantity">{{
                    productTable.quantity
                  }}</span>
                  <span v-else>-</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="my-5" v-else>
            <h1>{{ $t("home.noData") }}</h1>
          </div>
        </div>
      </section>
      <!-- related products  -->
      <div class="most-sold text-center" v-if="relatedProductsLength > 0">
        <div class="container">
          <h2 class="header font-weight-bold mt-5 mb-3">
            {{ $t("items.relatedBaskets") }}
          </h2>
          <hr />
          <div class="my-5 py-5">
            <VueSlickCarousel v-bind="settings" v-if="relatedProductsLength">
              <div v-for="item in relatedProducts" :key="item.id">
                <BasketRelatedProducts
                  :data="item"
                  :dealType="dealType"
                ></BasketRelatedProducts>
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </div>
    <div
      class="d-flex justify-content-center align-items-center flex-column"
      v-else-if="myProduct == null"
    >
      <div class="p-5">
        <img
          src="@/assets/images/BeanLoading2.gif"
          class="loading-img"
          alt="loading"
        />
      </div>
    </div>
    <div class="flex-column p-5 notFound" v-if="notFound">
      <h2>
        {{ $t("profile.notFound") }}
      </h2>
    </div>
  </div>
</template>

<script>
import profile from "@/services/profile";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

import Slider from "@/components/pages/single-basket-product/Slider.vue";
import BasketProductInfo from "@/components/pages/single-basket-product/BasketProductInfo.vue";
import BasketRelatedProducts from "@/components/pages/single-basket-product/RelatedProducts.vue";
export default {
  data() {
    return {
      id: this.$route.query.id,
      dealType: this.$t("profile.basketDeals"),
      loading: false,
      myProduct: null,
      product: [],
      supplierProducts: null,
      relatedProductsLength: null,
      notFound: false,
      supplierProductsId: null,
      basketDataLength: null,
      //relatedProducts
      relatedProducts: null,
      promotion_products: null,
      // table data
      tableFields: [
        {
          key:
            this.$i18n.locale == "en" ? "product.title_en" : "product.title_ar",
          label: this.$t("items.item"),
        },
        {
          key: "image_path",
          label: this.$t("items.image"),
        },
        {
          key: "client.company_name",
          label: this.$t("items.supplier"),
        },
        {
          key: "product_details_by_type.unit.title",
          label: this.$t("items.unit"),
        },
        {
          key: "product_details_by_type.price",
          label: this.$t("items.price"),
        },
        {
          key: "quantity",
          label: this.$t("items.quantity"),
        },
      ],
      settings: {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,

        responsive: [
          {
            breakpoint: 1191,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              arrows: false,
              dots: false,
            },
          },
          {
            breakpoint: 820,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              arrows: false,
              dots: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: false,
            },
          },
        ],
      },
    };
  },
  methods: {
    async getProductDetails() {
      await profile
        .getBasketSingleOffers(this.id)
        .then((res) => {
          this.myProduct = res.data.items;
          this.promotion_products = res.data.items.promotion_products;
        })
        .catch((err) => {
          // console.log(err);
          if (err.response.data.code == 404) {
            this.notFound = true;
            this.loading = false;
            this.myProduct = "";
          }
        });
    },
    async getRelatedBasketOffers() {
      await profile
        .getRelatedBasketOffers(this.id)
        .then((resp) => {
          this.relatedProducts = resp.data.items.data;
          this.relatedProductsLength = resp.data.items.data.length;

        })
    },
    goProduct(data) {
      this.$router.push({
        path: "/details",
        query: {
          id: data.id,
          type: this.dealType ? this.dealType : null,
        },
      });
    },
  },
  mounted() {
    this.getProductDetails();
    this.getRelatedBasketOffers();
  },
  components: {
    Slider,
    BasketProductInfo,
    BasketRelatedProducts,
    VueSlickCarousel,
  },
};
</script>

<style lang="scss">
.humhum-tabs {

  @media (max-width: 992px) {
    padding: 0;
  }
}

.notFound {
  min-height: 70vh;
}

.slick-slide {
  padding: 0 2px;
}

@media (max-width: 992px) {
  .product-info {
    order: 2;
  }

  .slider {
    order: 1;
  }
}

.breadcrumb {
  font-size: 20px;
  margin: 20px 0;
}

.product-image {
  width: 60px;
  height: 60px;
  -o-object-fit: cover;
  object-fit: cover;
}
.slider {
  position: relative;
  overflow: hidden;
}

.basketSinglePage {
  .cr-sticky {
    left: -39% !important;
  }
}
</style>
