<template>
  <!-- saerch page  -->
  <div>
    <div class="container">
      <div class="text-center my-5">
        <h1>
          {{ $t("profile.searchResult") }}
        </h1>
      </div>
      <!-- hf search return products  -->
      <div class="" v-if="productsLength > 0">
        <!-- if loading   -->
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
        <!-- when data comes  -->
        <div class="" v-else>
          <div class="products mt-5 px-5">
            <div class="row">
              <!-- list products  -->
              <div
                :title="product.title"
                v-for="product in products"
                :key="product.id"
                class="custum-padding mb-3 col-md-3 col-sm-12"
              >
                <router-link
                  :to="{ path: '/details', query: { id: product.id } }"
                  v-if="product.id"
                  class="text-dark"
                >
                  <div class="" v-if="product">
                    <div>
                      <b-img-lazy
                        v-if="product.product.image_path"
                        :src="product.product.image_path"
                        class="img-fluid"
                        alt="image"
                      ></b-img-lazy>
                    </div>

                    <div class="" v-if="product.product">
                      <small>{{ product.product.title }}</small>
                    </div>
                    <div class="" v-if="product.product_details_by_type">
                      <small>
                        {{
                          product.product_details_by_type.customer_price
                        }}</small
                      >
                      <br />
                      <small>
                        {{
                          product.product_details_by_type.price_before_discount
                        }}</small
                      >
                    </div>
                  </div>
                </router-link>
                <div
                  class="row px-3 justify-content-center align-items-center"
                  v-if="
                    product.product_details_by_type.add_type === 'cart' ||
                    product.product_details_by_type.add_type === 'both'
                  "
                >
                  <div
                    class="col-lg-6 col-12 my-2"
                    v-if="cartAvailable == 'available'"
                  >
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
                  <div class="col-lg-6 col-12 my-2">
                    <b-button
                      @click="addToCartAgain(product)"
                      class="btn btn-loght border-0 outline-none shadow-none d-block add-cart cart-btn btn-block new cart-again"
                      v-if="
                        (cartAvailable == 'available' &&
                          product.product_details_by_type.add_type ===
                            'cart') ||
                        (cartAvailable == 'available' &&
                          product.product_details_by_type.add_type === 'both')
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
                  <div class="col-12">
                    <div class="product-actions short-links mb-2">
                      <button
                        @click="chooseProduct(product)"
                        class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0 loged-in add-cart-rfq"
                        v-if="
                          RfqAvailable == 'available' &&
                          (product.product_details_by_type.add_type === 'rfq' ||
                            (RfqAvailable == 'available' &&
                              product.product_details_by_type.add_type ===
                                'both')) &&
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
                        v-else-if="
                          RfqAvailable == 'available' &&
                          (product.product_details_by_type.add_type === 'rfq' ||
                            (RfqAvailable == 'available' &&
                              product.product_details_by_type.add_type ===
                                'both')) &&
                          !buyerUserData
                        "
                      >
                        <span>
                          <rfqIcon class="mx-2" />
                        </span>
                        {{ $t("singleProduct.bidRequest") }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="text-center d-flex justify-content-center align-items-center mt-5"
            v-if="products.length >= perPage"
          >
            <!-- paginate the result  -->
            <Paginate
              v-if="products"
              :total-pages="totalPages"
              :per-page="totalPages"
              :current-page="page"
              @pagechanged="onPageChange"
            />
          </div>
        </div>
      </div>
      <!-- if no products  -->
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
import Paginate from "@/components/global/Paginate.vue";
import globalAxios from "@/services/global-axios";
import Counter from "@/components/global/searchCounter.vue";
import rfqIcon from "@/components/global/rfqIcon.vue";
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

import suppliers from "@/services/suppliers";
Vue.use(VueSweetalert2);
export default {
  methods: {
    /**
     * @vuese
     * this function used to get searchResult
     */
    async searchResult() {
      this.loading = true;
      let data = {
        keyword: this.$route.query.keyword,
      };
      await categories
        .searchAllProducts(data)
        .then((resp) => {
          // console.log(resp);
          this.products = resp.data.items.data;
          this.productsLength = resp.data.items.data.length;

          this.total = resp.data.items.total;
          this.totalPages = Math.ceil(
            resp.data.items.total / resp.data.items.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.total;
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
     * this function used for pagination
     */
    onPageChange(page) {
      this.page = page;
      this.searchResult();
    },
    /**
     * @vuese
     * this function used for pagination
     */
    onChangeRecordsPerPage() {
      this.searchResult();
    },
    /**
     * @vuese
     * this function used for pagination
     */
    gotoPage() {
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.searchResult();
      }
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
  data() {
    return {
      loading: false,
      products: null,
      productsLength: 0,

      perPage: 5,
      total: 0,
      currentPage: 1,

      page: 1,
      totalPages: 0,
      totalRecords: 0,
      recordsPerPage: 10,
      enterpageno: "",
      myQuantity: 1,
      requestData: {
        name: null,
        request_qty: null,
        comment: null,
      },
      errors: [],
      selectedProduct: null,
    };
  },
  created() {
    this.searchResult();
  },
  components: {
    Paginate,
    Counter,
    rfqIcon,
  },
  computed: {
    rows() {
      return this.products.length;
    },
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
