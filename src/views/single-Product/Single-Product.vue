<template>
  <!-- single product data  -->
  <div class="container single-product">
    <div class="" v-if="myProduct !== null && !notFound">
      <div class="product-info">
        <div class="content">
          <!-- nav for product navigation  -->
          <nav aria-label="breadcrumb d-flex">
            <ol class="breadcrumb">
              <li class="breadcrumb-item" v-for="Type in myProduct.product.categories" :key="Type.id">
                {{ Type.title }}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <b-row align-h="center" class="mt-5">
        <b-col cols="12" md="4" class="slider p-0">
          <!-- product slider  -->
          <div class="ribbon ribbon-top-left" :class="{'long-rebbon':dealType.trim().length > 20}"  v-if="dealType"><span :class="{'long-rebbon-span':dealType.trim().length > 20}">{{dealType}}</span></div>
          <Slider :myProduct="myProduct"></Slider>
        </b-col>
        <b-col cols="12" md="8" class="product-info">
          <!-- product information  -->
          <ProductInfo :myProduct="myProduct"></ProductInfo>
        </b-col>
      </b-row>
      <div class="humhum-tabs">
        <b-tabs content-class="mt-3">
          <!-- product specifications tab  -->
          <b-tab :title="$t('singleProduct.specsTitle')" active>
            <Specs :myProduct="myProduct" v-if="myProduct"></Specs>
          </b-tab>
          <!-- product rating tab  -->
          <b-tab :title="$t('singleProduct.ratingHeader')">
            <!-- <b-tab :title="$t('singleProduct.ratingTitle')"> -->
            <Rating :myProduct="myProduct" v-if="myProduct"></Rating>
          </b-tab>
        </b-tabs>
      </div>
      <div class="most-sold text-center" v-if="supplierProductsLength > 0">
        <div class="container">
          <h4 class="header font-weight-bold mt-5 mb-3">
            {{ $t("items.relativeProducts") }}
          </h4>
          <hr />
          <div class="my-5 py-5">
            <!-- other products slider  -->
            <VueSlickCarousel v-bind="settings" v-if="supplierProductsLength">
              <div v-for="item in supplierProducts.filter(product => product.product_details_by_type.quantity >= 1)"
                :key="item.id">
                <Product :data="item"></Product>
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </div>
    <div class="" v-else-if="myProduct == null">
      <div class="d-flex justify-content-center align-items-center p-5">
        <img src="@/assets/images/BeanLoading2.gif" class="loading-img" alt="loading" />
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center flex-column p-5 notFound" v-if="notFound">
      <h2>
        {{ $t("profile.notFound") }}
      </h2>
    </div>
  </div>
</template>
<script>
/**
 * single product data
 * @displayName single product data
 */
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

import Slider from "@/components/single-product/Slider.vue";
import ProductInfo from "@/components/single-product/ProductInfo.vue";
import Specs from "@/components/single-product/Specs.vue";
import Rating from "@/components/single-product/Rating.vue";
import Product from "@/components/pages/supplier/products/Product.vue";
import categories from "@/services/categories";

import suppliers from "@/services/suppliers";

export default {
  components: {
    Slider,
    ProductInfo,
    Specs,
    Rating,
    Product,
    VueSlickCarousel,
  },
  data() {
    return {
      id: this.$route.query.id,
      dealType: this.$route.query.type ? this.$route.query.type : null,
      loading: false,
      myProduct: null,
      product: [],
      supplierProducts: null,
      supplierProductsLength: null,
      notFound: false,
      supplierProductsId: null,
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
    /**
     * product Details function
     * @vuese
     */
    productDetails() {
      this.loading = true;
      categories
        .productDetails(this.id)
        .then((res) => {
          console.log("productDetails", res);
          this.myProduct = res.data.items;
          this.supplierProductsId = res.data.items.client_id;
        })
        .catch((err) => {
          if (err.response.data.code == 404) {
            this.notFound = true;
            this.loading = false;
            this.myProduct = "";
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * get Supplier Products function
     * @vuese
     */
    getSupplierProducts() {
      // console.log("this.supplierProductsId", this.supplierProductsId);
      suppliers
        .getSupplierProducts(this.supplierProductsId, this.id)
        .then((resp) => {
          // console.log("resp", resp);
          this.supplierProducts = resp.data.items.data;
          this.supplierProductsLength = resp.data.items.data.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.productDetails();
  },
  mounted() {
    setTimeout(() => {
      this.getSupplierProducts();
    }, 1200);
  },
};
</script>
<style lang="scss">
.humhum-tabs {
  padding: 4rem;
  margin: 3rem 0;

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
  // li:last-of-type{
  //   color: #ccc;
  // }
}
.single-product{

  .cr-sticky{
    left:-40% !important;
    text-indent: 13%;
  }
}

</style>
