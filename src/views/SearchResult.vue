<template>
  <div class="searchResult">
    <div class="container">
      <div class="text-center mt-5 mb-0">
        <h1>
          {{ $t("profile.searchResult") }}
        </h1>
        <h6>
          {{ $t("singleProduct.serchingResult") }}
          <span class="word"
            ><b>{{ keyword }}</b></span
          >
        </h6>
      </div>
      <!-- loading when request data  -->
      <div
        class="my-5"
        v-if="categoriesLength == null || productsLength == null"
      >
        <div class="text-center">
          <b-spinner
            style="width: 3rem; height: 3rem"
            variant="primary"
            label="Spinning"
          ></b-spinner>
        </div>
      </div>
      <!-- if data returned   -->
      <div class="px-5" v-else-if="categoriesLength > 0 || productsLength > 0 || suppliersLength > 0">
        <div class="data-holder py-3">
          <b-row v-if="loading">
            <b-col class="mb-2" lg="3" sm="6" v-for="x in 10" :key="x">
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
          <div class="" v-else>
            <!-- categories  -->
            <div class="categories" v-if="categoriesLength > 0">
              <h2 class="my-4">
                {{ $t("profile.categories") }}
              </h2>
              <div class="row">
                <div
                  :title="category.title"
                  v-for="category in categories"
                  :key="category.id"
                  class="custum-padding mb-3 col-md-3 col-sm-12"
                >
                  <router-link
                    :to="`/categories/${category.id}/variants`"
                    v-if="category.id"
                  >
                    <CategoryCard
                      v-if="category"
                      :card="{ type: category.title }"
                      :image="category.image_path"
                    />
                  </router-link>
                </div>
              </div>
            </div>

            <!-- suppliers -->
            <div class="categories" v-if="suppliersLength > 0">
              <h2 class="my-4">
                {{ $t("home.suppliers") }}
              </h2>
              <div class="row">
                <div
                  class="col-12 col-sm-6 col-md-4 col-lg-3 supplier-content"
                  v-for="supplier in suppliers"
                  :key="supplier.id"
                >
                  <SingleSupplier :supplier="supplier"></SingleSupplier>
                </div>
              </div>
              <div class="text-center" v-if="suppliersLength > 12">
                <router-link
                  class="load-more border-0 rounded-0 py-4 px-5 my-4 mx-0 d-inline-block"
                  :to="{
                    path: `/suppliers`
                  }"
                >
                  {{ $t("supplier.more") }}
                </router-link>
              </div>
            </div>

            <!-- products  -->
            <div class="products mt-5" v-if="productsLength > 0">
              <h2 class="my-4">
                {{ $t("profile.products") }}
              </h2>
              <div class="row">
                <div
                  :title="product.title"
                  v-for="product in products"
                  :key="product.id"
                  class="custum-padding mb-3 col-md-3 col-sm-12"
                >
                  <div class="" v-if="product">
                    <router-link
                      :to="{ path: '/details', query: { id: product.id } }"
                      v-if="product.id"
                      class="text-dark"
                    >
                      <div>
                        <b-img-lazy
                          v-if="product.current_main_image_path"
                          :src="product.current_main_image_path"
                          class="img-fluid"
                          alt="image"
                        ></b-img-lazy>
                      </div>
                    </router-link>

                    <router-link
                      :to="{ path: '/details', query: { id: product.id } }"
                      v-if="product.id"
                      class="text-dark"
                    >
                      <div class="" v-if="product.product">
                        <small>{{ product.product.title }}</small>
                      </div>
                      <div class="" v-if="product.product_details_by_type">
                        <small>
                          {{
                            product.product_details_by_type.customer_price
                              | fixedCurrency
                          }}
                          {{ currency }}</small
                        >
                        <br />
                        <small
                          class="price-after price m-0"
                          v-if="
                            product.product_details_by_type
                              .price_before_discount &&
                            product.product_details_by_type.customer_price >
                              product.product_details_by_type
                                .price_before_discount
                          "
                        >
                          {{
                            product.product_details_by_type
                              .price_before_discount | fixedCurrency
                          }}
                          {{ currency }}</small
                        >
                      </div>
                    </router-link>
                  </div>
                  <div
                    class="row px-3 justify-content-center align-items-center"
                    v-if="
                      product.product_details_by_type.add_type === 'cart' ||
                      product.product_details_by_type.add_type === 'both'
                    "
                  >
                    <div class="col-xl-4 col-sm-12 col-12 my-2" v-if="cartAvailable  == 'available'">
                      <Counter
                        :minimum="
                          product.min_order_quantity
                            ? product.min_order_quantity
                            : 1
                        "
                        :quantity="product.quantity"
                        :product="product"
                        class="justify-content-center"
                        @changeTitle="ChangeQ($event)"
                      />
                    </div>
                    <div class="col-xl-4 col-sm-12 col-12 my-2">
                      <b-button
                        @click="addToCartAgain(product)"
                        class="btn btn-loght border-0 outline-none shadow-none d-block add-cart cart-btn btn-block new cart-again p-2"
                        v-if="cartAvailable  == 'available' &&  
                          product.product_details_by_type.add_type === 'cart' || cartAvailable  == 'available' && 
                          product.product_details_by_type.add_type === 'both'
                        "
                      >
                        <span>
                          <font-awesome-icon
                            icon="fa-sharp fa-solid fa-cart-plus"
                          />
                          <span>{{ $t("cart.add") }}</span>
                        </span>
                      </b-button>
                    </div>
                    <div class="col-xl-4 col-sm-12 col-12 mt-2">
                      <div class="product-actions short-links mb-2">
                        <button
                          @click="chooseProduct(product)"
                          class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0 loged-in add-cart-rfq"
                          v-if="RfqAvailable  == 'available' && 
                            (product.product_details_by_type.add_type ===
                              'rfq' || RfqAvailable  == 'available' &&
                              product.product_details_by_type.add_type ===
                                'both') &&
                            buyerUserData
                          "
                        >
                          <div>
                            <button
                              id="show-btn"
                              class="btn btn-loght border-0 outline-none shadow-none d-block add-cart w-100 add-cart-rfq"
                              @click="$bvModal.show('bv-bidRequest')"
                            >
                              <!-- <span role="button" @click="loggedBidRequest"> -->
                              <span>
                                <rfqIcon class="mx-2" />
                              </span>
                            </button>
                          </div>
                        </button>
                        <button
                          @click="loginFirst(product)"
                          class="btn btn-loght border-0 outline-none shadow-none d-block add-cart w-100 add-cart-rfq"
                          v-else-if="RfqAvailable  == 'available' && 
                            (product.product_details_by_type.add_type ===
                              'rfq' ||
                              product.product_details_by_type.add_type ===
                                'both') &&
                            !buyerUserData
                          "
                        >
                          <span>
                            <rfqIcon class="mx-2" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-center" v-if="productsLength > 16">
                <router-link
                  class="load-more border-0 rounded-0 py-4 px-5 my-4 mx-0 d-inline-block"
                  :to="{
                    path: `/Search-Products`,
                    query: { keyword: $route.query.keyword },
                  }"
                >
                  {{ $t("supplier.more") }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- if no data returned  -->
      <div class="" v-else>
        <div class="text-center my-5">
          <h4>
            {{ $t("profile.searchNoResult") }}
          </h4>
        </div>
      </div>
      <!-- rfq modal  -->
      <b-modal id="bv-bidRequest" hide-footer>
        <template #modal-title>
          {{ $t("singleProduct.bidRequest") }}
        </template>
        <form>
          <div class="form-group">
            <label for=""
              >{{ $t("singleProduct.nameInput") }}
              <span class="text-danger">*</span></label
            >
            <input
              type="text"
              class="form-control"
              v-model="requestData.name"
            />
            <div
              class="text-danger"
              v-for="(error, index) in errors.qoute_name"
              :key="index"
            >
              {{ error }}
            </div>
          </div>
          <div class="form-group">
            <label for=""
              >{{ $t("singleProduct.min_order_quantity") }}
              <span class="text-danger">*</span></label
            >
            <input
              type="number"
              min="1"
              class="form-control"
              v-model="requestData.request_qty"
            />
            <div
              class="text-danger"
              v-for="(error, index) in errors.request_qty"
              :key="index"
            >
              {{ error }}
            </div>
          </div>
          <div class="form-group">
            <label for=""
              >{{ $t("singleProduct.reviewInput") }}
              <span class="text-danger">*</span></label
            >
            <textarea
              class="form-control"
              v-model="requestData.comment"
            ></textarea>
            <div
              class="text-danger"
              v-for="(error, index) in errors.comment"
              :key="index"
            >
              {{ error }}
            </div>
          </div>
        </form>
        <b-button class="btn-lg btn-block" block @click="requestQuotation">{{
          $t("cart.submit")
        }}</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import categories from "@/services/categories";
import CategoryCard from "@/components/global/CategoryCard.vue";
import globalAxios from "@/services/global-axios";
import Counter from "@/components/global/searchCounter.vue";
import rfqIcon from "@/components/global/rfqIcon.vue";
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

import suppliers from "@/services/suppliers";
import SingleSupplier from "../components/pages/suppliers/SingleSupplier.vue";
Vue.use(VueSweetalert2);
export default {
  components: {
    CategoryCard,
    Counter,
    rfqIcon,
    SingleSupplier,
  },
  data() {
    return {
      loading: false,
      categories: false,
      categoriesLength: null,
      products: null,
      productsLength: null,
      keyword: this.$route.query.keyword,
      catId: this.$route.query.catId,
      myQuantity: 1,
      requestData: {
        name: null,
        request_qty: null,
        comment: null,
      },
      errors: [],
      selectedProduct: null,
      suppliers: null,
      suppliersLength:0
    };
  },
  methods: {
    /**
     * @vuese
     * this function used to get searchResult
     */
    async searchResult() {
      this.loading = true;
      let data = {
        keyword: this.$route.query.keyword,
        catId: this.$route.query.catId,
      };
      await categories
        .searchResult(data)
        .then((resp) => {
          this.categories = resp.data.items.categories;
          this.categoriesLength = resp.data.items.categories.length;

          this.products = resp.data.items.products;
          this.productsLength = resp.data.items.products.length;
          this.suppliers = resp.data.items.suppliers.slice(0, 12);
          this.suppliersLength = resp.data.items.suppliers.length;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * @vuese
     * this function used to add product To Cart
     */
    addToCartAgain(myProduct) {
      let data = {
        product_supplier_id:
          myProduct.product_details_by_type.product_supplier_id,
        quantity: this.myQuantity > 0 ? this.myQuantity : 1,
      };
      return globalAxios
        .post(`cart/add`, data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);

            this.$modal.show(
              () => import("@/components/cart/cartModal.vue"),
              {
                product: myProduct,
              },
              { width: "700", height: "auto", adaptive: true }
            );
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        })
        .finally(() => {
          setTimeout(() => {
            this.$store.dispatch("cart/getCartProducts");
          }, 500);
        });
    },
    /**
     * @vuese
     * this function used to Change Quantity
     */
    ChangeQ(myQuantity) {
      if (myQuantity > 0) {
        this.myQuantity = myQuantity;
      }
    },
    /**
     * @vuese
     * this function used to login First when want rfq
     */
    loginFirst() {
      Vue.swal({
        title: this.$t("singleProduct.loginFirst"),
        text: this.$t("singleProduct.registerNow"),
        icon: "warning",
        // buttons: ["Oh noez!", true],
        dangerMode: true,
      }).then(() => {
        this.$router.push("/user-register");
      });
    },
    /**
     * @vuese
     * this function used to select product to store to sure who product changed
     */
    chooseProduct(product) {
      this.selectedProduct = product;
    },
     /**
     * @vuese
     * this function used to request Quotation
     */
    requestQuotation() {
      let payload = {
        qoute_name: this.requestData.name,
        product_supplier_id:
          this.selectedProduct.product_details_by_type.product_supplier_id,
        request_qty: this.requestData.request_qty,
        comment: this.requestData.comment,
      };
      suppliers
        .requestQuotation(payload)
        .then((resp) => {
          this.errors = {};
          this.sucessMsg(resp.data.message);
          setTimeout(() => {
            document.querySelector(".close").click();
            this.requestData = [];
            this.$router.push({
              path: "/profile/quotationDetails",
              query: {
                id: resp.data.items.client_quote_id,
              },
            });
          }, 500);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
  },
  created() {
    this.searchResult();
  },
};
</script>

<style lang="scss" scoped>
.custum-padding {
  a {
    background: transparent !important;
    border: none;
    font-size: 25px;
    text-align: center;
    text-decoration: none;
  }

  img {
    width: 100%;
    height: 200px;
    // border-radius: 50%;
    object-fit: contain;
  }
}

.load-more {
  background: #fff;
  color: #312620;
  font-size: 14px;
  box-shadow: 0px 3px 27px 0px rgb(0 0 0 / 17%);

  &:hover {
    background: $main-color;
    color: #fff;
  }
}

.word {
  font-size: 20px;
  text-decoration: underline;
}

.cart-again {
  background: #fb9100;
  font-weight: bold;
}

.add-cart-rfq {
  border-radius: 0;
  font-size: 16px;
  background: #36363b;
  color: #fff;
  padding: 5px 0;
  height: fit-content;
  -webkit-margin-end: 0.5rem;
  margin-inline-end: 0;
  display: block;
  text-align: center;
  width: 100%;
  border-radius: 5px;

  &:hover {
    background: $main-color;
  }
}
</style>
