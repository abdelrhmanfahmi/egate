<template>
  <div class="container">
    <div class="" v-if="myProduct !== null">
      <b-row align-h="center">
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
            <Specs :myProduct="myProduct"></Specs>
          </b-tab>
          <b-tab :title="$t('singleProduct.ratingTitle')">
            <Rating :myProduct="myProduct"></Rating>
          </b-tab>
        </b-tabs>
      </div>
      <div class="most-sold text-center">
        <div class="container">
          <h4 class="header font-weight-bold mt-5 mb-3">
            {{ $t("items.products") }}
          </h4>
          <hr />
          <b-row class="justify-content-center justify-content-sm-between">
            <b-col
              cols="10"
              sm="6"
              lg="4"
              xl="2"
              v-for="(item, index) in 4"
              :key="index"
            >
              <Product :data="product[index]"></Product
            ></b-col>
          </b-row>
        </div>
      </div>
    </div>
    <div class="" v-else-if="myProduct == null">
      <div class="d-flex justify-content-center align-items-center p-5">
        <img src="@/assets/images/Loader.gif" alt="loading">
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
      product: [
        {
          image: require("@/assets/images/sp.png"),
          name: this.$t("supplier.productName"),
          price: "4.620 KD",
          new: true,
        },
        {
          image: require("@/assets/images/sp.png"),
          name: this.$t("supplier.productName"),
          price: "4.620 KD",
          discount: 20,
        },
        {
          image: require("@/assets/images/sp.png"),
          name: this.$t("supplier.productName"),
          price: "4.620 KD",
        },
        {
          image: require("@/assets/images/sp.png"),
          name: this.$t("supplier.productName"),
          price: "4.620 KD",
          new: true,
          discount: 35,
        },
      ],
    };
  },

  methods: {
    productDetails() {
      this.loading = true;
      categories
        .productDetails(this.id)
        .then((res) => {
          console.log(res);
          this.myProduct = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.productDetails();
  },
};
</script>
<style lang="scss">
.humhum-tabs {
  padding: 4rem;
  margin: 3rem 0;
}
</style>
