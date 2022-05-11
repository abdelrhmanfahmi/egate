<template>
  <div class="container">
    <div class="" v-if="myProduct !== null">
      <b-row align-h="center" class="mt-5">
        <b-col cols="12" lg="6" xl="4">
          <ProductInfo :myProduct="myProduct"></ProductInfo>
        </b-col>
        <b-col cols="12" lg="6">
          <Slider :myProduct="myProduct"></Slider>
        </b-col>
      </b-row>
      <div class="humhum-tabs">
        <b-tabs content-class="mt-3">
          <b-tab :title="$t('singleProduct.specsTitle')" active>
            <Specs :myProduct="myProduct" v-if="myProduct"></Specs>
          </b-tab>
          <b-tab :title="$t('singleProduct.ratingTitle')">
            <Rating :myProduct="myProduct" v-if="myProduct"></Rating>
          </b-tab>
        </b-tabs>
      </div>
      <div class="most-sold text-center" v-if="supplierProductsLength > 0">
        <div class="container">
          <h4 class="header font-weight-bold mt-5 mb-3">
            {{ $t("items.products") }}
          </h4>
          <hr />
          <div class="row">
            <div
              class="col-12 col-sm-6 col-lg-3"
              v-for="item in supplierProducts"
              :key="item.id"
            >
              <Product :data="item"></Product>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="" v-else-if="myProduct == null">
      <div class="d-flex justify-content-center align-items-center p-5">
        <img src="@/assets/images/Loader.gif" class="loading-img" alt="loading" />
      </div>
    </div>
    <div class="" v-else>
      <div class="d-flex justify-content-center align-items-center p-5">
        <h3>
          {{ $t("cart.noData") }}
        </h3>
      </div>
    </div>
  </div>
</template>
<script>
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
  },
  data() {
    return {
      id: this.$route.query.id,
      loading: false,
      myProduct: null,
      product: [],
      supplierProducts: null,
      supplierProductsLength: null,
    };
  },

  methods: {
    productDetails() {
      this.loading = true;
      categories
        .productDetails(this.id)
        .then((res) => {
          console.log("productDetails"  , res);
          this.myProduct = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getSupplierProducts() {
      let id = this.id;
      suppliers
        .getSupplierProducts(id)
        .then((resp) => {
          this.supplierProducts = resp.data.items.data;
          this.supplierProductsLength = resp.data.items.data.length
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.productDetails();
    this.getSupplierProducts();
  },
};
</script>
<style lang="scss">
.humhum-tabs {
  padding: 4rem;
  margin: 3rem 0;
  @media(max-width:992px){
    padding: 0;
  }
}
</style>
