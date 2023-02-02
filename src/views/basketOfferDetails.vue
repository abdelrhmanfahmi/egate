<template>
  <!-- single product data  -->
  <div class="container">
    <div class="" v-if="myProduct !== null && !notFound">
      <b-row align-h="center" class="mt-5">
        <b-col cols="12" md="4" class="slider">
          <div class="floatingDiv">{{ dealType }}</div>
          <!-- product slider  -->
          <Slider :myProduct="myProduct"></Slider>
        </b-col>
        <b-col cols="12" md="8" class="product-info">
          <ProductInfo :myProduct="myProduct"></ProductInfo>
        </b-col>
      </b-row>

      <!-- promotion_products table  -->
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
          v-if="relatedProducts.length > 0"
          class="table table-striped table-hover table-bordered selectable"
        >
          <thead>
            <tr>
              <th scope="col" v-for="(tab, index) in tableFields" :key="index">
                {{ tab.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in relatedProducts" :key="index">
              <td v-if="product.ads && product.ads.length > 0">
                {{ $t("items.advertise") }}
              </td>
              <!-- <td v-else>{{index + 1 }}</td> -->
              <td v-else></td>
              <td>
                <router-link
                  class="link font-weight-bold text-danger"
                  :to="{ path: '/details', query: { id: product.product_supplier.id } }"
                >
                  {{ product.product_supplier.title }}
                </router-link>
              </td>
              <td>
                <router-link
                  v-if="product.product_supplier.image_path !== null"
                  class="link"
                  :to="{ path: '/details', query: { id: product.product_supplier.id } }"
                >
                  <img
                    :src="product.product_supplier.image_path"
                    class="product-image"
                    alt="product-image"
                  />
                </router-link>
                <router-link
                  v-else-if="
                    product.product_supplier.image_path == null && product.product_supplier.image_path
                  "
                  class="link"
                  :to="{ path: '/details', query: { id: product.product_supplier.id } }"
                >
                  <img
                    :src="product.product_supplier.image_path"
                    class="product-image"
                    alt="product-image"
                  />
                </router-link>
              </td>
              <td>
                <router-link
                  class="link"
                  :to="{ path: '/details', query: { id: product.product_supplier.id } }"
                >
                  {{ product.product_supplier.client.company_name }}
                </router-link>
              </td>
              <td>
                <router-link
                  v-if="product.product_supplier.product_details_by_type.unit.title"
                  class="link"
                  :to="{ path: '/details', query: { id: product.id } }"
                >
                  {{ product.product_supplier.product_details_by_type.weight }}
                  {{ product.product_supplier.product_details_by_type.unit.title }}
                </router-link>
                <div v-else class="link">-</div>
              </td>
              <td>
                <div
                  class=""
                  v-if="
                    (buyerUserData &&
                      buyerUserData.profile_percentage == 100 &&
                      buyerUserData.type === 'buyer') ||
                    buyerUserData.type === 'b2b' ||
                    (buyerUserData.type === 'supplier' &&
                      buyerUserData.is_buyer == true)
                  "
                >
                  <router-link
                    class="link"
                    :to="{ path: '/details', query: { id: product.product_supplier.id } }"
                  >
                    <!-- show price when product not rfq only  -->
                    <div
                      v-if="product.product_supplier.product_details_by_type.add_type !== 'rfq'"
                    >
                      <p class="m-0 white-space-pre">
                        {{
                          product.product_supplier.product_details_by_type.customer_price
                            | fixedCurrency
                        }}
                        {{ currency }}
                      </p>
                      <p
                        class="price-after m-0 white-space-pre"
                        v-if="
                          product.product_supplier.product_details_by_type
                            .price_before_discount &&
                          product.product_supplier.product_details_by_type
                            .price_before_discount >
                            product.product_supplier.product_details_by_type.customer_price
                        "
                      >
                        {{
                          product.product_supplier.product_details_by_type.price_before_discount
                            | fixedCurrency
                        }}
                        {{ currency }}
                      </p>
                    </div>
                    <div v-else>-</div>
                  </router-link>
                </div>
                <div
                  class=""
                  v-else-if="!buyerUserData || buyerUserData.type === 'b2c'"
                >
                  <router-link
                    class="link"
                    :to="{ path: '/details', query: { id: product.product_supplier.id } }"
                  >
                    <div
                      v-if="product.product_supplier.product_details_by_type.add_type !== 'rfq'"
                    >
                      <p class="m-0">
                        {{
                          product.product_supplier.product_details_by_type.customer_price
                            | fixedCurrency
                        }}
                        {{ currency }}
                      </p>
                      <p
                        class="price-after m-0"
                        v-if="
                          product.product_supplier.product_details_by_type
                            .price_before_discount &&
                          product.product_supplier.product_details_by_type
                            .price_before_discount >
                            product.product_supplier.product_details_by_type.customer_price
                        "
                      >
                        {{
                          product.product_supplier.product_details_by_type.price_before_discount
                            | fixedCurrency
                        }}
                        {{ currency }}
                      </p>
                    </div>
                    <div class="" v-else>-</div>
                  </router-link>
                </div>
              </td>
              <td>
                <Variants-Counter
                  :minimum="
                    product.product_details_by_type.min_order_quantity
                      ? product.product_details_by_type.min_order_quantity
                      : 1
                  "
                  v-if="
                    (cartAvailable === 'available' &&
                      product.product_details_by_type.add_type === 'cart') ||
                    (cartAvailable === 'available' &&
                      product.product_details_by_type.add_type === 'both')
                  "
                  class="justify-content-center"
                  :quantity="
                    product.product_details_by_type.min_order_quantity > 0
                      ? product.product_details_by_type.min_order_quantity
                      : 1
                  "
                  @changeCount="
                    ChangeCounter(
                      $event,
                      product.product_details_by_type.min_order_quantity
                    )
                  "
                ></Variants-Counter>
                <p v-else>-</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="my-5" v-else>
          <h1>{{ $t("home.noData") }}</h1>
        </div>
      </div>
      <!-- related products  -->
      <div class="most-sold text-center" v-if="relatedProductsLength > 0">
        <div class="container">
          <h4 class="header font-weight-bold mt-5 mb-3">
            {{ $t("items.relativeProducts") }}
          </h4>
          <hr />
          <div class="my-5 py-5">
            <VueSlickCarousel v-bind="settings" v-if="relatedProductsLength">
              <div v-for="item in relatedProducts" :key="item.id">
                <Product :data="item"></Product>
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </div>
    <div class="" v-else-if="myProduct == null">
      <div class="d-flex justify-content-center align-items-center p-5">
        <img
          src="@/assets/images/BeanLoading2.gif"
          class="loading-img"
          alt="loading"
        />
      </div>
    </div>
    <div
      class="d-flex justify-content-center align-items-center flex-column p-5 notFound"
      v-if="notFound"
    >
      <h2>
        {{ $t("profile.notFound") }}
      </h2>
    </div>
  </div>
</template>

<script>
import profile from "@/services/profile";
// import VueSlickCarousel from "vue-slick-carousel";
// import "vue-slick-carousel/dist/vue-slick-carousel.css";

import Slider from "@/components/pages/single-basket-product/Slider.vue";
import ProductInfo from "@/components/pages/single-basket-product/ProductInfo.vue";
// import Specs from "@/components/pages/single-basket-product/Specs.vue";
// import Rating from "@/components/pages/single-basket-product/Rating.vue";
// import Product from "@/components/pages/supplier/products/Product.vue";
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
      // table data
      tableFields: [
        {
          key: "#",
          label: "#",
        },
        {
          key: "product.title",
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
    };
  },
  methods: {
    async getProductDetails() {
      await profile
        .getBasketSingleOffers(this.id)
        .then((res) => {
          this.myProduct = res.data.items;
        })
        .catch((err) => {
          console.log(err);
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
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProductDetails();
    this.getRelatedBasketOffers();
  },
  components: {
    Slider,
    ProductInfo,
    // Specs,
    // Rating,
    // Product,
    // VueSlickCarousel,
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
.floatingDiv {
  position: absolute;
  background: red;
  color: #fff;
  font-size: 22px;
  padding: 13px;
  left: -1rem;
  top: 1rem;
  transform: rotate(-45deg);
}
</style>
