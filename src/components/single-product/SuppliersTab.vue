<template>
  <div class="tabs-holder">
    <div class="SuppliersTab">
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
        <div class="" v-if="products.length > 0">
          <table
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
              <tr v-for="(product, index) in products" :key="index">
                <td>
                  <router-link
                    v-if="product.image_path !== null"
                    class="link"
                    :to="{ path: '/details', query: { id: product.id } }"
                  >
                    <span
                      v-if="
                        product.ads.length ||
                        product.basket_promotions_running_by_type ||
                        product.buy_get_promotion_running_by_type
                      "
                    >
                      <h6 v-if="product.ads && product.ads.length > 0">
                        {{ $t("items.advertise") }}
                      </h6>
                      <h6 v-if="product.basket_promotions_running_by_type">
                        <router-link
                          :to="{
                            path: '/basketOfferDetails',
                            query: {
                              id: product.basket_promotions_running_by_type
                                .basket_promotion_id,
                            },
                          }"
                          >{{ $t("profile.basketDeals") }}</router-link
                        >
                      </h6>
                      <h6 v-if="product.buy_get_promotion_running_by_type">
                        <router-link
                          :to="{
                            path: '/details',
                            query: {
                              id: product.id,
                              type: `${$t('profile.buy')} 
                                                ${
                                                  product
                                                    .buy_get_promotion_running_by_type
                                                    .promotion.buy_x
                                                } 
                                                ${$t('profile.get')} ${
                                product.buy_get_promotion_running_by_type
                                  .promotion.get_y
                              }`,
                            },
                          }"
                          >{{ $t("profile.buyXgetYOffer") }}</router-link
                        >
                      </h6>
                    </span>
                    <img
                      :src="product.image_path"
                      class="product-image"
                      alt="product-image"
                    />
                  </router-link>
                  <router-link
                    v-else-if="
                      product.image_path == null &&
                      product.current_main_image_path
                    "
                    class="link"
                    :to="{ path: '/details', query: { id: product.id } }"
                  >
                    <img
                      :src="product.current_main_image_path"
                      class="product-image"
                      alt="product-image"
                    />
                  </router-link>
                  <router-link
                    v-if="!product.current_main_image_path"
                    class="link"
                    :to="{ path: '/details', query: { id: product.id } }"
                  >
                    <div class="logo-holder">
                      <img
                        :src="logoEnv"
                        v-if="logoEnv"
                        class="product-image"
                        alt="logo"
                      />
                      <img
                        src="@/assets/images/logo.png"
                        v-else
                        alt="logo"
                        class="product-image"
                      />
                    </div>
                  </router-link>
                </td>
                <td>
                  <router-link
                    class="link font-weight-bold"
                    :to="{ path: '/details', query: { id: product.id } }"
                  >
                    {{ product.product.title }}
                  </router-link>
                </td>

                <td>
                  <router-link
                    class="link"
                    :to="{ path: `/suppliers/${product.client.id}` }"
                  >
                    <ins>{{ product.client.company_name }}</ins>
                  </router-link>
                  <!-- <router-link
          class="link"
          :to="{ path: '/details', query: { id: product.id } }"
        >
          <ins>{{ product.client.company_name }}</ins>
        </router-link> -->
                </td>
                <td>
                  <router-link
                    v-if="product.product_details_by_type.unit.title"
                    class="link"
                    :to="{ path: '/details', query: { id: product.id } }"
                  >
                    {{ product.product_details_by_type.weight }}
                    {{ product.product_details_by_type.unit.title }}
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
                      :to="{
                        path: '/details',
                        query: { id: product.id },
                      }"
                    >
                      <!-- show price when product not rfq only  -->
                      <div
                        v-if="
                          product.product_details_by_type.add_type !== 'rfq'
                        "
                      >
                        <p class="m-0 white-space-pre">
                          {{
                            product.product_details_by_type.customer_price
                              | fixedCurrency
                          }}
                          {{ currency }}
                        </p>
                        <p
                          class="price-after m-0 white-space-pre"
                          v-if="
                            product.product_details_by_type
                              .price_before_discount &&
                            product.product_details_by_type
                              .price_before_discount >
                              product.product_details_by_type.customer_price
                          "
                        >
                          {{
                            product.product_details_by_type
                              .price_before_discount | fixedCurrency
                          }}
                          {{ currency }}
                        </p>
                      </div>
                      <div v-else>-</div>
                    </router-link>
                  </div>
                  <div
                    class=""
                    v-else-if="
                      (buyerUserData &&
                        buyerUserData.profile_percentage !== 100) ||
                      (buyerUserData &&
                        buyerUserData.type === 'buyer' &&
                        buyerUserData.profile_percentage !== 100) ||
                      (buyerUserData &&
                        buyerUserData.type === 'b2b' &&
                        buyerUserData.profile_percentage !== 100) ||
                      (buyerUserData &&
                        buyerUserData.type === 'supplier' &&
                        buyerUserData.is_buyer !== true &&
                        buyerUserData.profile_percentage !== 100)
                    "
                  >
                    -
                  </div>
                  <div
                    class=""
                    v-else-if="!buyerUserData || buyerUserData.type === 'b2c'"
                  >
                    <router-link
                      class="link"
                      :to="{
                        path: '/details',
                        query: { id: product.id },
                      }"
                    >
                      <div
                        v-if="
                          product.product_details_by_type.add_type !== 'rfq'
                        "
                      >
                        <p class="m-0">
                          {{
                            product.product_details_by_type.customer_price
                              | fixedCurrency
                          }}
                          {{ currency }}
                        </p>
                        <p
                          class="price-after m-0"
                          v-if="
                            product.product_details_by_type
                              .price_before_discount &&
                            product.product_details_by_type
                              .price_before_discount >
                              product.product_details_by_type.customer_price
                          "
                        >
                          {{
                            product.product_details_by_type
                              .price_before_discount | fixedCurrency
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
                <td class="actions-holder">
                  <div
                    class="new-wishlist-method add-to d-flex justify-content-center align-items-center"
                    v-if="
                      (buyerUserData &&
                        buyerUserData.profile_percentage == 100 &&
                        buyerUserData.type === 'buyer') ||
                      (buyerUserData && buyerUserData.type === 'b2b') ||
                      (buyerUserData.type === 'supplier' &&
                        buyerUserData.is_buyer == true) ||
                      (buyerUserData &&
                        buyerUserData.type === 'b2c' &&
                        buyerUserData.is_verified)
                    "
                  >
                    <a
                      class="button one active animate mobile button--secondary wishlist-btn mx-0 cart-add"
                      @click="addToCart(product)"
                      v-if="
                        (cartAvailable == 'available' &&
                          product.product_details_by_type.add_type ===
                            'cart') ||
                        (cartAvailable == 'available' &&
                          product.product_details_by_type.add_type === 'both')
                      "
                      v-b-tooltip.hover
                      :title="$t('items.addToCart')"
                    >
                      <!-- <span>{{ $t("items.addToCart") }}</span> -->
                      <font-awesome-icon
                        icon="fa-solid fa-cart-shopping"
                        size="xl"
                      />
                    </a>
                    <div class="new-wishlist-method" v-if="buyerUserData">
                      <a
                        class="button one active animate mobile button--secondary wishlist-btn mx-1"
                        @click="addToWishlist(product)"
                        v-if="product.is_favorite == true"
                        v-b-tooltip.hover
                        :title="$t('items.addedToFavourite')"
                      >
                        <font-awesome-icon icon="fa-solid fa-star" size="xl" />
                      </a>
                      <a
                        @click="addToWishlist(product)"
                        v-b-tooltip.hover
                        :title="$t('items.addToFavourite')"
                        class="button one inactive mobile button--secondary wishlist-btn mx-1"
                        v-else
                      >
                        <font-awesome-icon
                          icon="fa-regular fa-star"
                          size="xl"
                        />
                      </a>
                    </div>
                    <div
                      class="d-flex justify-content-center"
                      v-if="
                        (RfqAvailable == 'available' &&
                          buyerUserData &&
                          product.product_details_by_type.add_type === 'rfq') ||
                        (RfqAvailable == 'available' &&
                          buyerUserData &&
                          product.product_details_by_type.add_type === 'both')
                      "
                    >
                      <button
                        class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0 loged-in"
                        v-if="
                          (buyerUserData.type === 'buyer' &&
                            buyerUserData.profile_percentage == 100) ||
                          (buyerUserData.type === 'supplier' &&
                            buyerUserData.profile_percentage == 100) ||
                          (buyerUserData.type === 'b2c' &&
                            buyerUserData.is_verified)
                        "
                      >
                        <div
                          @click="
                            storeProductSupplierId(
                              product.product_details_by_type
                                .product_supplier_id
                            )
                          "
                        >
                          <button
                            id="show-btn"
                            class="btn btn-loght border-0 outline-none shadow-none d-block add-cart bg-gray m-0"
                            @click="$bvModal.show('bv-bidRequest2')"
                            v-b-tooltip.hover
                            :title="$t('singleProduct.bidRequest')"
                          >
                            <!-- <rfqIcon /> -->
                            RFQ
                          </button>
                        </div>
                      </button>
                    </div>
                    <!-- add standing orders  -->
                    <div v-if="RfqAvailable == 'available'">
                      <button
                        id="show-btn"
                        class="btn btn-loght border-0 outline-none shadow-none d-block add-cart"
                        @click="
                          $bvModal.show('bv-standingOrders2');
                          selectStandingProduct(product);
                        "
                        v-b-tooltip.hover
                        :title="$t('items.standingOrders')"
                      >
                        <font-awesome-icon
                          icon="fa-sharp fa-solid fa-bag-shopping"
                        />
                      </button>
                    </div>

                    <!-- <a href="#"> <font-awesome-icon icon="fa-solid fa-check" /> </a> -->
                  </div>
                  <div
                    class="d-flex justify-content-center"
                    v-if="
                      (buyerUserData &&
                        buyerUserData.profile_percentage !== 100) ||
                      (buyerUserData &&
                        buyerUserData.type === 'buyer' &&
                        buyerUserData.profile_percentage !== 100) ||
                      (buyerUserData &&
                        buyerUserData.type === 'b2b' &&
                        buyerUserData.profile_percentage !== 100) ||
                      (buyerUserData &&
                        buyerUserData.type === 'supplier' &&
                        buyerUserData.is_buyer !== true &&
                        buyerUserData.profile_percentage !== 100)
                    "
                  >
                    <router-link to="/profile/account-information-b2b">
                      {{ $t("profile.completeAccount") }}
                    </router-link>
                  </div>
                  <div
                    class="add-to d-flex justify-content-center"
                    v-else-if="!buyerUserData"
                  >
                    <a
                      class="cart-link btn br-5 btn btn-loght border-0 outline-none shadow-none d-block add-cart cart-btn btn-secondary"
                      @click="addToCart(product)"
                      v-if="
                        (cartAvailable == 'available' &&
                          product.product_details_by_type.add_type ===
                            'cart') ||
                        (cartAvailable == 'available' &&
                          product.product_details_by_type.add_type === 'both')
                      "
                      v-b-tooltip.hover
                      :title="$t('items.addToCart')"
                    >
                      <!-- <span>{{ $t("items.addToCart") }}</span> -->
                      <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                    </a>

                    <div
                      class=""
                      v-if="buyerUserData && buyerUserData.type === 'b2c'"
                    >
                      <a
                        class="button one active animate mobile button--secondary wishlist-btn mx-1"
                        :title="`product in favourite`"
                        @click="addToWishlist(product)"
                        v-if="product.is_favorite == true"
                      >
                        <font-awesome-icon
                          icon="fa-regular fa-star"
                          size="xl"
                        />
                      </a>
                      <a
                        @click="addToWishlist(product)"
                        class="button one inactive mobile button--secondary wishlist-btn mx-1"
                        v-else
                      >
                        <font-awesome-icon
                          icon="fa-regular fa-star"
                          size="xl"
                        />
                      </a>
                    </div>
                    <div class="" v-if="buyerUserData">
                      <a
                        @click="loginFirst"
                        v-b-tooltip.hover
                        :title="$t('items.addToFavourite')"
                        class="button one inactive mobile button--secondary wishlist-btn mx-1"
                      >
                        <font-awesome-icon
                          icon="fa-regular fa-star"
                          size="xl"
                        />
                      </a>
                    </div>
                    <div v-if="!buyerUserData && RfqAvailable == 'available'">
                      <button
                        v-b-modal.modal-xl
                        id="show-btn"
                        class="btn btn-loght border-0 outline-none shadow-none d-block add-cart"
                        @click="loginFirst"
                        v-b-tooltip.hover
                        :title="$t('singleProduct.bidRequest')"
                      >
                        <!-- <rfqIcon /> -->
                        RFQ
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="text-center d-flex justify-content-start align-items-center mt-5"
          >
            <Paginate
              v-if="products"
              :total-pages="totalPages"
              :per-page="totalPages"
              :current-page="page"
              @pagechanged="onPageChange"
            />
          </div>
        </div>

        <div class="my-5" v-else>
          <h1>{{ $t("home.noData") }}</h1>
        </div>
        <b-modal id="bv-bidRequest2" hide-footer>
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

        <!-- standing orders modal  -->
        <b-modal id="bv-standingOrders2" size="xl" hide-footer>
          <template #modal-title>
            {{ $t("items.standingOrders") }}
          </template>
          <standing-orders :variantOrder="selectedStandingOrder" />
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import categories from "@/services/categories";
import VariantsCounter from "@/components/global/variantsCounter.vue";
import globalAxios from "@/services/global-axios";
import suppliers from "@/services/suppliers";

import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);

// import rfqIcon from "@/components/global/rfqIcon.vue";

import StandingOrders from "@/components/global/standingOrders.vue";
import Paginate from "@/components/global/Paginate.vue";

export default {
  data() {
    return {
      id: this.$route.params.slug,
      pageId: this.$route.params.slug,
      products: [],
      productInfo: null,
      selectedVariance: null,
      loading: false,
      variants: null,
      items: [
        {
          text: this.$t("items.home"),
          href: "/humhum-user",
        },
        {
          text: this.$t("items.category"),
          href: "#",
        },
        {
          text: this.$t("items.fruit"),
          active: true,
        },
      ],
      selected: null,
      types: [
        { value: null, text: this.$t("items.optionSelect") },
        { value: "a", text: "First option" },
        { value: "b", text: "Second option" },
        { value: "c", text: "Third option" },
        { value: "d", text: "Fourth option" },
      ],
      tableFields: [
        // {
        //   key: "#",
        //   label: "#",
        // },
        {
          key: "image_path",
          label: this.$t("items.image"),
        },
        {
          key: "product.title",
          label: this.$t("items.item"),
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
        {
          key: "addTo",
          label: this.$t("items.addTo"),
        },
      ],
      tableItems: [],
      product: [],
      supplierProducts: null,
      cartCounter: 1,
      showModal: false,
      requestVariants: null,
      selectedVariants: null,
      requestData: {
        name: null,
        request_qty: null,
        comment: null,
      },
      errors: [],
      supplierProductId: null,
      sortType: "asc",
      options: [
        { value: "asc", text: this.$t("cart.asc") },
        { value: "desc", text: this.$t("cart.desc") },
      ],
      readMore: false,
      sortBy: false,
      filteredBy: false,
      sortTypeCountry: null,
      sortTypeWeight: null,
      sortTypeUnit: null,
      CountryOptions: null,
      WeightOptions: null,
      UnitOptions: null,
      selectedStandingOrder: null,
      perPage: 5,
      total: 0,
      currentPage: 1,

      page: 1,
      totalPages: 0,
      totalRecords: 0,
      recordsPerPage: 10,
      enterpageno: "",
    };
  },
  components: {
    VariantsCounter,
    // rfqIcon,
    StandingOrders,
    Paginate
  },
  methods: {
    /**
     * @vuese
     * add To Cart function
     */
    addToCart(item) {
      let data = {
        product_supplier_id: item.product_details_by_type.product_supplier_id,
        quantity:
          this.cartCounter > item.product_details_by_type.min_order_quantity
            ? this.cartCounter
            : item.product_details_by_type.min_order_quantity,
      };
      return globalAxios
        .post(`cart/add`, data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);

            this.$modal.show(
              () => import("@/components/cart/cartModal.vue"),
              {
                product: item,
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
     * add To Wishlist function
     */
    addToWishlist(item) {
      let data = {
        product_supplier_id: item.product_details_by_type.product_supplier_id,
      };
      return globalAxios
        .post(`members/profile/favorite`, data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        })
        .finally(() => {
          setTimeout(() => {
            this.getCategoryProducts();
            this.$store.dispatch("cart/getCartProducts");
          }, 500);
        });
    },
    /**
     * @vuese
     * closeModal function
     */
    closeModal() {
      this.showModal = false;
    },
    /**
     * @vuese
     * openModal function
     */
    openModal() {
      this.showModal = true;
    },
    /**
     * @vuese
     * Change cart Counter function
     */
    ChangeCounter(cartCounter, minimum) {
      if (cartCounter >= minimum) {
        this.cartCounter = cartCounter;
      }
    },
    /**
     * @vuese
     * change Variance function
     */
    changeVariance() {
      let myVariants = [];
      for (let index = 0; index < this.productInfo.variants.length; index++) {
        const element = this.productInfo.variants[index].selectedVariance;
        let myNewData = `category_options[${index}]=${element}`;

        if (!myNewData.includes("null")) {
          myVariants.push(myNewData);
        }
      }
      this.selectedVariants = myVariants.join("&");

      this.loading = true;
      categories
        .getCategoryProducts(
          this.pageId,
          this.sortType,
          this.selectedVariants,
          this.sortTypeCountry,
          this.sortTypeWeight,
          this.sortTypeUnit
        )
        .then((res) => {
          this.products = res.data.items.data;
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
     * get Category Products function
     */
    getCategoryProducts() {
      this.loading = true;
      categories
        .getCategoryProducts(
          this.pageId,
          this.sortType,
          this.selectedVariants,
          this.sortTypeCountry,
          this.sortTypeWeight,
          this.sortTypeUnit
        )
        .then((res) => {
          // this.getFilters()
          this.products = res.data.items.data;

          this.total = res.data.items.data.total;
          this.totalPages = Math.ceil(
            res.data.items.data.total / res.data.items.data.per_page
          ); // Calculate total records

          this.totalRecords = res.data.items.data.total;

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
     * get Single Product Details function
     */
    getSingleProductDetails() {
      if (this.$route.path.includes("details")) {
        this.pageId = this.$route.query.id;
      }
      categories
        .getSingleProductDetails(this.pageId)
        .then((res) => {
          this.productInfo = res.data.items;
          let variantData = res.data.items.variants;
          for (let index = 0; index < variantData.length; index++) {
            this.productInfo.variants[index].selectedVariance = null;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
     * updateId function
     */
    updateId() {
      this.pageId = this.$route.params.slug;
    },
    /**
     * @vuese
     * prev Page function
     */
    prevPage() {
      let prevUrl = this.pageId;
      if (prevUrl > 0) {
        this.pageId = parseInt(this.pageId) - 1;

        this.$router.replace(`/categories/${this.pageId}/variants`);
        this.getCategoryProducts();
        setTimeout(() => {
          location.reload();
        }, 200);
      }
    },
    /**
     * @vuese
     * on Row Selected function to mark selected row to get product id
     */
    onRowSelected(item) {
      this.$router.push({
        path: "/details",
        query: { id: item.id },
      });
    },
    /**
     * @vuese
     * go to next Page function
     */
    nextPage() {
      this.pageId = parseInt(this.pageId) + 1;

      this.$router.replace(`/categories/${this.pageId}/variants`);
      this.getCategoryProducts();

      setTimeout(() => {
        location.reload();
      }, 200);
    },
    /**
     * @vuese
     * request Quotation function
     */
    requestQuotation() {
      let payload = {
        qoute_name: this.requestData.name,
        product_supplier_id: this.supplierProductId,
        request_qty: this.requestData.request_qty,
        comment: this.requestData.comment,
      };
      suppliers
        .requestQuotation(payload)
        .then((resp) => {
          console.log(resp);
          this.errors = {};
          this.sucessMsg(resp.data.message);
          setTimeout(() => {
            document.querySelector(".close").click();
            this.requestData = [];
          }, 500);
          setTimeout(() => {
            this.$router.push({
              path: "/profile/quotationDetails",
              query: {
                id: resp.data.items.client_quote_id,
              },
            });
          }, 1000);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    /**
     * @vuese
     * store Product SupplierId function
     */
    storeProductSupplierId(product_supplier_id) {
      this.supplierProductId = product_supplier_id;
    },
    /**
     * @vuese
     * login First function if not logged in and want RFQ
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
     * get Filters function
     */
    getFilters() {
      suppliers
        .getFilters(
          this.pageId,
          this.sortType,
          this.selectedVariants,
          this.sortTypeCountry,
          this.sortTypeWeight,
          this.sortTypeUnit
        )
        .then((res) => {
          this.CountryOptions = res.data.items.countries;
          this.WeightOptions = res.data.items.weights;
          this.UnitOptions = res.data.items.units;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
     * select Standing oerder Product function
     */
    selectStandingProduct(order) {
      this.selectedStandingOrder = order;
    },

    /**
     * @vuese
     *  when page changed  ,  refresh data  , this function used for paginating
     */
     onPageChange(page) {
      this.page = page;
      this.getCategoryProducts();
    },
    /**
     * @vuese
     *  when paginate  , this function used for paginating
     */
    onChangeRecordsPerPage() {
      this.getCategoryProducts();
    },
    /**
     * @vuese
     *  when paginate  , this function used for paginating
     */
    gotoPage() {
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.getCategoryProducts();
      }
    },

  },
  mounted() {
    this.getCategoryProducts();
    this.getSingleProductDetails();
    this.getFilters();
  },
  watch: {
    $route: "updateId",
  },
  computed: {
    catId() {
      /**
       * @vuese
       * get selected categoty id from sessionStorage
       */

      return sessionStorage.getItem("catId")
        ? `/categories/${sessionStorage.getItem("catId")}`
        : "/";
    },
  },
};
</script>

<style lang="scss" scoped>
/**
  * page style
*/
.items-body {
  color: #000;

  .content {
    color: #000;
    margin: 4% 0;
    .des-holder {
      border: 2px solid #eeeeee;
      border-radius: 5px;
    }

    .item-content {
      color: #000;

      .link {
        color: #403a37;
        font-size: 11pt;
        margin-bottom: 0.5rem;
      }

      .name {
        color: #312620;
        font-weight: 600;
        margin-bottom: 2rem;
        font-size: 20pt;
      }

      .description {
        font-size: 11pt;
        color: #676565;
        margin-bottom: 1rem;
      }

      .readBtn {
        cursor: pointer;
      }

      .customize {
        color: #000;

        .customize-selection {
          label {
            color: #7e7e7e;
            cursor: pointer;
            font-size: 10pt;
            margin-bottom: 0;
            margin-top: 0.5rem;
          }

          select {
            height: 2.3rem;
          }
        }
      }
    }

    .item-media {
      color: #000;

      img {
        color: #000;
      }
    }
  }
}

.white-space-pre {
  white-space: pre !important;
}

.products {
  .header {
    color: #312620;
  }

  .add-to {
    color: #000;

    a {
      background: #fff;
      color: #312620;
      box-shadow: 0px 1px 5px 0px rgb(0 0 0 / 10%);
      padding: 1rem 1rem;
      border-radius: 0.2rem;
      margin: 0 0.3rem;

      height: 44px;
      line-height: 0;

      &:hover {
        color: $main-color;
      }

      span {
        margin-inline-end: 0.5rem;
      }
    }
  }
}

.product-image {
  width: 130px;
  height: 123px;
  object-fit: cover;
  border-radius: 5px;
}

.items-body .content .item-content .customize .customize-selection select {
  height: 3rem;
}
.customize-selection {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.link {
  color: #403a37;
  font-size: 14pt;
  margin-bottom: 0.5rem;

  @media (max-width: 767px) {
    font-size: 10pt;
  }
}

.products-table {
  @media (max-width: 992px) {
    width: 100% !important;
    overflow-y: scroll;
  }
}

.products-table {
  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3px;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

.item-media {
  img {
    height: 250px;
    width: 100%;
    object-fit: contain;
  }
}

.products-table {
  .table td {
    padding: 0.4rem !important;
  }
}

.add-cart {
  // border-radius: 0;
  font-size: 11pt;
  background: #36363b;
  color: #fff;
  padding: 1rem 2rem;
  height: fit-content;
  margin-inline-end: 0.5rem;
  display: block;
  // min-width: 10rem;
  text-align: center;
  padding: 11px 18px;
  border-radius: 3px;
  margin: 0 5px;

  &:hover {
    background: $main-color;
  }
}

.actions-holder {
  @media (min-width: 767px) {
    width: 30%;
  }
}

.cart-link {
  background: $main-color !important;
  color: #fff !important;
}

/*@media screen and (max-width: 767px) {
  table {
    tbody {
      tr {
        margin: 30px 0;
      }
    }
  }
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    position: absolute;
    width: 1px;
    padding: 0;
  }

  table td {
    display: block;
    font-size: 0.8rem;
    border-top: none !important;
  }
  .table-striped tbody tr:nth-of-type(odd) {
    margin: 30px 0;
    display: block;
  }
}*/
@media (max-width: 992px) {
  .table {
    width: 800px;
  }

  .product-info {
    order: 2;
  }

  .slider {
    order: 1;
  }
}

.sortBy {
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 12px 20px;
  border-radius: 5px;
}

.new-search {
  .field {
    position: relative;
    button {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }

  .field > input {
    width: 100%;
  }

  .field > button {
    width: 120px;
    border: none;
  }
}
.beside-search {
  min-width: 200px !important;
  display: inline-block;
}

.new-wishlist-method {
  // VARIABLES
  // colours
  $red: $main-color;
  $silver: #cccccc;
  // fireworks
  $fireworks--width: 3px;
  $fireworks--height: 3px;
  $fireworks--border: $fireworks--width/2;

  // button styles
  .button--secondary,
  .button--secondary:visited {
    border-radius: 5px;
    cursor: pointer;
    display: inline-block;
    //min-width: 64px;
    font-family: inherit;
    font-size: inherit;
    line-height: 15px;
    outline: none;
    text-align: center;
    text-decoration: none;
    text-shadow: none;
    transition: background 0.1s linear;
    font-weight: 400;
    color: $main-color;
    //background: #fff;
    border: 1px solid $main-color;
    box-shadow: none;
    padding: 12px;
    transition-property: border;
    transition-timing-function: ease-in-out;
    transition-duration: 0.15s;
  }
  .cart-add {
    background: $main-color;
    color: #fff;
    margin: 0 5px;
  }
}
.sec-hold {
  margin: 0px !important;
  button {
    min-width: 50px !important;
    height: 50px !important;
    line-height: 50px;
    padding: 0;
  }
}
</style>
