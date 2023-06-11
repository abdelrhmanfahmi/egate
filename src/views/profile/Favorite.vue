<template>
  <!-- favorite page  -->
  <div class="fav products">
    <div class="">
      <!-- if data exist  -->
      <div class="" v-if="wishlistItems !== null">
        <h5 class="heading py-5">{{ $t("profile.favorite") }} ({{ total }})</h5>
        <div class="cart-table" v-if="wishlistItems.length">
          <div class="suppliers py-4">
            <div class="container">
              <div class="d-flex align-items-center">
                <div class="">
                  <span>
                    <input
                      type="checkbox"
                      class="myproject--checkbox"
                      v-model="checkAll"
                    />
                  </span>
                  <span class="h5 mx-2">{{ $t("profile.selectAll") }}</span>
                </div>
                <div class="d-flex align-items-start mx-4 bulk-actions-holder">
                  <div class="select-holder">
                    <b-form-select v-model="selectedAction" class="mb-3">
                      <b-form-select-option :value="null" disabled selected>{{
                        $t("profile.bulkAction")
                      }}</b-form-select-option>
                      <b-form-select-option value="bulk-addToCart">{{
                        $t("items.addToCart")
                      }}</b-form-select-option>
                      <b-form-select-option value="bulk-removeFromWishlist">{{
                        $t("items.removeFromWishlist")
                      }}</b-form-select-option>
                      <b-form-select-option value="bulk-addStandingOrders">{{
                        $t("items.addStandingOrders")
                      }}</b-form-select-option>
                    </b-form-select>
                  </div>
                  <div class="mx-4">
                    <button class="bg-main br-5" @click.prevent="bulkAction">
                      {{ $t("payment.Apply") }}
                    </button>
                  </div>
                </div>
              </div>
              <!-- table contain favorite data  -->
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">{{ $t("profile.productImage") }}</th>
                    <th scope="col">{{ $t("profile.productName") }}</th>
                    <th scope="col">{{ $t("profile.itemPrice") }}</th>
                    <th scope="col">
                      {{ $t("singleProduct.available") }}
                      {{ $t("cart.quantity") }}
                    </th>
                    <th>{{ $t("cart.supplier") }}</th>
                    <th>{{ $t("items.unit") }}</th>
                    <th>{{ $t("profile.countryOrigin") }}</th>
                    <th scope="col">{{ $t("profile.actions") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in wishlistItems.filter(
                      (item) =>
                        !item.basket_promotion_id && item.product_supplier
                    )"
                    :key="item.id"
                  >
                    <td>
                      <div
                        class="d-flex justify-content-around align-items-center"
                      >
                        <input
                          type="checkbox"
                          class="myproject--checkbox"
                          :value="item.product_supplier_id"
                          v-model="checkedItems"
                        />
                      </div>
                    </td>
                    <td class="text-center">
                      <!-- go to product page  -->
                      <router-link
                        :to="{
                          path: '/details',
                          query: { id: item.product_supplier_id },
                        }"
                      >
                        <div
                          class="d-block text-center"
                          v-if="item.product_supplier.product.image_path"
                        >
                          <img
                            :src="item.product_supplier.product.image_path"
                            alt="wishlist-product-image"
                            class="product-img"
                          />
                        </div>
                        <div class="d-block text-center" v-else>
                          <img
                            :src="logoEnv"
                            alt="wishlist-product-image"
                            class="product-img"
                          />
                        </div>
                      </router-link>
                    </td>
                    <td class="text-center">
                      <!-- go to product page  -->
                      <router-link
                        class="text-dark"
                        :to="{
                          path: '/details',
                          query: { id: item.product_supplier_id },
                        }"
                      >
                        <p
                          v-if="item.product_supplier.product"
                          class="supplier-name text-center mt-3 text-capitalize mb-0 font-weight-bold mb-3"
                        >
                          <span v-if="$i18n.locale == 'en'"
                            >{{ item.product_supplier.product.title_en }}
                          </span>
                          <span v-if="$i18n.locale == 'ar'"
                            >{{ item.product_supplier.product.title_ar }}
                          </span>
                        </p>
                      </router-link>
                    </td>
                    <td class="text-center">
                      <p
                        class="price"
                        v-if="item.product_supplier.product_details_by_type"
                      >
                        <span
                          v-if="
                            item.product_supplier.product_details_by_type.price
                          "
                        >
                          {{
                            item.product_supplier.product_details_by_type.price
                              | fixedCurrency
                          }}
                          {{ currency }}
                        </span>

                        <br />
                        <!-- if price exist & check discount  -->
                        <span
                          class="price-after"
                          v-if="
                            item.product_supplier.product_details_by_type
                              .price_before_discount &&
                            item.product_supplier.product_details_by_type
                              .price_before_discount >
                              item.product_supplier.product_details_by_type
                                .price
                          "
                        >
                          {{
                            item.product_supplier.product_details_by_type
                              .price_before_discount | fixedCurrency
                          }}
                          {{ currency }}
                        </span>
                      </p>
                      <p v-else>-</p>
                    </td>
                    <td class="text-center">
                      <span
                        v-if="
                          item.product_supplier.product_details_by_type &&
                          item.product_supplier.product_details_by_type.quantity
                        "
                        >{{
                          item.product_supplier.product_details_by_type.quantity
                        }}</span
                      >
                      <span v-else>-</span>
                    </td>

                    <td class="text-center">
                      <router-link
                        :to="`/suppliers/${item.product_supplier.client.id}`"
                      >
                        {{ item.product_supplier.client.company_name }}
                      </router-link>
                    </td>
                    <td class="text-center">
                      <span
                        v-if="
                          item.product_supplier.product_details_by_type &&
                          item.product_supplier.product_details_by_type.unit
                        "
                        >{{
                          item.product_supplier.product_details_by_type.unit
                            .title
                        }}</span
                      >
                      <span v-else>-</span>
                    </td>
                    <td class="text-center">
                      <span v-if="item.product_supplier.country">{{
                        item.product_supplier.country.title
                      }}</span>
                      <span v-else>-</span>
                    </td>
                    <td class="text-center">
                      <div
                        v-if="item.product_supplier.product_details_by_type"
                        class="actions d-flex justify-content-center align-items-center"
                      >
                        <b-button @click="removeFromWishlist(item)">
                          <font-awesome-icon icon="fa-solid fa-trash-can" />
                        </b-button>

                        <b-button
                          @click="addToCart(item)"
                          class="cart-link"
                          v-if="
                            (add_to_cart == true &&
                              item.product_supplier.product_details_by_type
                                .add_type === 'cart') ||
                            (add_to_cart == true &&
                              item.product_supplier.product_details_by_type
                                .add_type === 'both')
                          "
                        >
                          <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                        </b-button>
                        <button
                          @click="chooseProduct(item.product_supplier)"
                          class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0 loged-in add-cart-rfq"
                          v-if="
                            RFQ == true &&
                            (item.product_supplier.product_details_by_type
                              .add_type === 'rfq' ||
                              (RFQ == true &&
                                item.product_supplier.product_details_by_type
                                  .add_type === 'both')) &&
                            buyerUserData
                          "
                        >
                          <div>
                            <button
                              id="show-btn"
                              class="btn btn-loght border-0 outline-none shadow-none d-block add-cart w-100 add-cart-rfq bg-gray"
                              @click="$bvModal.show('bv-bidRequest')"
                            >
                              <span> RFQ </span>
                            </button>
                          </div>
                        </button>
                        <button
                          id="show-btn"
                          class="button one inactive mobile button--secondary wishlist-btn add-cart bg-dark mx-3 px-3"
                          @click="
                            selectStandId(item.product_supplier_id);
                            $bvModal.show('bv-standingOrders');
                          "
                          v-b-tooltip.hover
                          :title="$t('items.standingOrders')"
                          v-if="buyerUserData"
                        >
                          <img
                            src="@/assets/images/new-design/standing-order-sign.png"
                            class="standing-order-sign"
                            alt="standing-order-sign"
                          />
                        </button>
                        <button
                          v-else
                          class="button one inactive mobile button--secondary wishlist-btn add-cart bg-dark mx-3 px-3"
                          @click="loginFirst()"
                          v-b-tooltip.hover
                          :title="$t('items.standingOrders')"
                        >
                          <img
                            src="@/assets/images/new-design/standing-order-sign.png"
                            class="standing-order-sign"
                            alt="standing-order-sign"
                          />
                        </button>
                      </div>
                      <div v-else>-</div>
                    </td>
                  </tr>
                  <tr
                    class="item-content text-center"
                    v-for="(item, index) in wishlistItems.filter(
                      (item) =>
                        item.basket_promotion_id || !item.product_supplier
                    )"
                    :key="index"
                  >
                    <td>
                      <div
                        class="d-flex justify-content-around align-items-center"
                      >
                        <input
                          type="checkbox"
                          class="myproject--checkbox"
                          :value="item.id"
                          v-model="checkedItems"
                        />
                      </div>
                    </td>
                    <!-- product image and go to pproduct page with click  -->
                    <td class="media">
                      <router-link
                        :to="{
                          path: '/basketOfferDetails',
                          query: { id: `${item.basket_promotion_id}` },
                        }"
                        class="thumb w-100"
                        v-if="
                          item.basket_promotion &&
                          item.basket_promotion.image_path
                        "
                      >
                        <img
                          :src="item.basket_promotion.image_path"
                          :alt="item.basket_promotion.image_path + ' image'"
                          class="product-image"
                        />
                      </router-link>
                      <span v-else>-</span>
                    </td>
                    <!-- product name  and go to pproduct page with click  -->
                    <td>
                      <router-link
                        class="supplier-name text-center mt-3 text-dark text-capitalize mb-0 font-weight-bold mb-3"
                        v-if="
                          item.basket_promotion && item.basket_promotion.title
                        "
                        :to="{
                          path: '/basketOfferDetails',
                          query: { id: `${item.basket_promotion_id}` },
                        }"
                      >
                        {{ item.basket_promotion.title }}
                      </router-link>
                      <span v-else>-</span>
                    </td>
                    <!-- if product price exist -->
                    <td>
                      <span
                        class="price"
                        v-if="
                          (item.basket_promotion &&
                            item.basket_promotion.basket_price) ||
                          (item.basket_promotion &&
                            item.basket_promotion.basket_price >= 0)
                        "
                      >
                        {{ item.basket_promotion.basket_price | fixedCurrency }}
                        {{ currency }}
                      </span>
                      <span v-else>-</span>
                    </td>

                    <td class="text-center">
                      <span>-</span>
                    </td>
                    <td class="text-center">
                      <span v-if="item.basket_promotion.client">{{
                        item.basket_promotion.client.company_name
                      }}</span>
                      <span v-else>-</span>
                    </td>
                    <td class="text-center">
                      <span>-</span>
                    </td>
                    <td class="text-center">
                      <span>-</span>
                    </td>

                    <!-- remove product from cart -->

                    <td>
                      <div
                        class="actions d-flex justify-content-center align-items-center"
                      >
                        <button
                          @click="addBasketToCart(item)"
                          class="action cart-link btn"
                          v-if="
                            item.basket_promotion &&
                            item.basket_promotion.in_stock == true
                          "
                        >
                          <span class="action-icon">
                            <font-awesome-icon
                              icon="fa-solid fa-cart-shopping"
                            />
                          </span>
                        </button>
                        <button
                          class="actions btn"
                          @click="removebasketFromCart(item)"
                        >
                          <span class="action-icon">
                            <font-awesome-icon icon="fa-solid fa-trash-can" />
                          </span>
                        </button>

                        <button
                          id="show-btn"
                          class="button one inactive mobile button--secondary wishlist-btn add-cart bg-dark mx-3 px-3"
                          @click="
                            chooseBasketProduct(item);
                            $bvModal.show('bv-basketstandingOrders');
                          "
                          v-b-tooltip.hover
                          :title="$t('items.standingOrders')"
                          v-if="buyerUserData"
                        >
                          <img
                            src="@/assets/images/new-design/standing-order-sign.png"
                            class="standing-order-sign"
                            alt="standing-order-sign"
                          />
                        </button>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                class="text-center d-flex justify-content-start align-items-center mt-5"
              >
                <!-- Pagination  -->
                <Paginate
                  v-if="wishlistItems"
                  :total-pages="totalPages"
                  :per-page="totalPages"
                  :current-page="page"
                  @pagechanged="onPageChange"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="" v-else>
          <div class="text-center">
            <h2>{{ $t("cart.noProducts") }}</h2>
          </div>
        </div>
      </div>
      <!-- if data not exist  -->
      <div
        class="d-flex justify-content-center align-items-center flex-column"
        v-else
      >
        <img src="@/assets/images/wishlist.png" alt="cart-image" />
        <div class="spinner-border text-secondary" role="status">
          <span class="sr-only"></span>
        </div>
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
          <input type="text" class="form-control" v-model="requestData.name" />
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
    <b-modal
      ref="standingOrdersModal"
      id="bv-standingOrders"
      size="xl"
      hide-footer
    >
      <template #modal-title>
        {{ $t("items.standingOrders") }}
      </template>
      <standing-orders :passedId="selectedId" :checkedItems="checkedItems" />
    </b-modal>
    <!-- standing orders modal -->

    <b-modal id="bv-basketstandingOrders" size="xl" hide-footer>
      <template #modal-title>
        {{ $t("items.standingOrders") }}
      </template>
      <WishlistStandingOrders :selectedBasketProduct="selectedBasketProduct" />
    </b-modal>
  </div>
</template>

<script>
//  favorite page
import globalAxios from "@/services/global-axios";
import Paginate from "@/components/global/Paginate.vue";
import suppliers from "@/services/suppliers";
import StandingOrders from "@/components/global/standingOrders.vue";
import profile from "@/services/profile";

import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

import WishlistStandingOrders from "@/components/pages/wishlist/WishlistStandingOrders.vue";
Vue.use(VueSweetalert2);
export default {
  data() {
    return {
      fields: [
        {
          key: "image",
          label: "image",
        },
        {
          key: "product",
          label: this.$t("profile.product"),
        },
        {
          key: "price",
          label: this.$t("profile.price"),
        },
        {
          key: "action",
          label: "",
        },
      ],
      items: [
        {
          image: "http://dummyimage.com/122x100.png/cc0000/ffffff",
          product: "Ginger - Fresh",
          price: 11.2,
          quantity: 10,
          totalPrice: 112.0,
        },
        {
          image: "http://dummyimage.com/234x100.png/ff4444/ffffff",
          product: "Spice - Onion Powder Granulated",
          price: 11.2,
          quantity: 8,
          totalPrice: 89.6,
        },
        {
          image: "http://dummyimage.com/228x100.png/dddddd/000000",
          product: "Wine - Sauvignon Blanc",
          price: 5.0,
          quantity: 9,
          totalPrice: 45.0,
        },
        {
          image: "http://dummyimage.com/114x100.png/5fa2dd/ffffff",
          product: "Sorrel - Fresh",
          price: 1.2,
          quantity: 10,
          totalPrice: 12.0,
        },
        {
          image: "http://dummyimage.com/189x100.png/ff4444/ffffff",
          product: "Soup - Campbells Chicken",
          price: 9.3,
          quantity: 3,
          totalPrice: 27.9,
        },
        {
          image: "http://dummyimage.com/234x100.png/5fa2dd/ffffff",
          product: "Pasta - Bauletti, Chicken White",
          price: 21.8,
          quantity: 3,
          totalPrice: 65.4,
        },
        {
          image: "http://dummyimage.com/189x100.png/dddddd/000000",
          product: "Wine - Shiraz Wolf Blass Premium",
          price: 0.4,
          quantity: 10,
          totalPrice: 4.0,
        },
        {
          image: "http://dummyimage.com/162x100.png/5fa2dd/ffffff",
          product: "Soup Campbells - Italian Wedding",
          price: 2.4,
          quantity: 9,
          totalPrice: 21.6,
        },
        {
          image: "http://dummyimage.com/201x100.png/5fa2dd/ffffff",
          product: "Sprouts - Bean",
          price: 24.0,
          quantity: 4,
          totalPrice: 96.0,
        },
        {
          image: "http://dummyimage.com/132x100.png/dddddd/000000",
          product: "Bag - Clear 7 Lb",
          price: 7.1,
          quantity: 9,
          totalPrice: 63.9,
        },
      ],
      loading: false,
      perPage: 5,
      total: 0,
      currentPage: 1,

      page: 1,
      totalPages: 0,
      totalRecords: 0,
      recordsPerPage: 10,
      enterpageno: "",
      wishlistItems: null,
      myQuantity: 1,
      requestData: {
        name: null,
        request_qty: null,
        comment: null,
      },
      errors: [],
      selectedProduct: null,
      selectedId: null,
      checkedItems: [],
      selectedAction: null,
      selectedBasketProduct: null,
    };
  },
  components: {
    Paginate,
    StandingOrders,
    WishlistStandingOrders
  },
  methods: {
    bulkAction() {
      if (this.selectedAction == "bulk-addToCart") {
        this.favoriteBulkAddToCart();
        this.getWishlistProducts();
        this.checkedItems = [];
      } else if (this.selectedAction == "bulk-removeFromWishlist") {
        this.favoriteBulkRemoveFav();
        this.getWishlistProducts();
        this.checkedItems = [];
      } else if (this.selectedAction == "bulk-addStandingOrders") {
        this.favoriteBulkStandingOrder();
        this.getWishlistProducts();
      } else {
        if (this.$i18n.locale == "en") {
          this.errMsg("Choose Action First");
        } else {
          this.errMsg("قم باختيار الاجراء اولا");
        }
      }
    },
    favoriteBulkAddToCart() {
      let data = {
        product_supplier_id: this.checkedItems,
        quantity: 1,
      };

      return globalAxios
        .post(`cart/bulk/add`, data)
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
            this.$store.dispatch("cart/getCartProducts");
          }, 500);
        });
    },
    favoriteBulkRemoveFav() {
      let payload = {
        favorite_ids: this.checkedItems,
      };
      profile
        .favoriteBulkRemoveFav(payload)
        .then((res) => {
          this.sucessMsg(res.data.message);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    favoriteBulkStandingOrder() {
      this.$refs["standingOrdersModal"].show();
    },

    /**
     * get favorite products
     * @vuese
     */
    getWishlistProducts() {
      this.loadingOne = false;
      this.loading = true;
      globalAxios
        .get(`members/profile/favorite`)
        .then((resp) => {
          this.wishlistItems = resp.data.items.data;
          this.total = resp.data.items.total;
          this.totalPages = Math.ceil(
            resp.data.items.total / resp.data.items.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * remove product from  favorite
     * @vuese
     */
    removeFromWishlist(product) {
      this.$store.dispatch("wishlist/removeProductFromWishlist", {
        myItem: product.id,
      });
      this.loading = true;
      this.wishlistItems = null;
      setTimeout(() => {
        this.getWishlistProducts();
      }, 1000);
      setTimeout(() => {
        this.loading = false;
      }, 1200);
    },
    /**
     * add product to  cart
     * @vuese
     */
    addToCart(item) {
      let data = {
        product_supplier_id: item.product_supplier_id,
        quantity: item.product_supplier.product_details_by_type
          .min_order_quantity
          ? item.product_supplier.product_details_by_type.min_order_quantity
          : 1,
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
     * function for pagination
     * @vuese
     */
    onPageChange(page) {
      this.page = page;
      this.getWishlistProducts();
    },
    /**
     * function for pagination
     * @vuese
     */
    onChangeRecordsPerPage() {
      this.getWishlistProducts();
    },
    /**
     * function for pagination
     * @vuese
     */
    gotoPage() {
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.getWishlistProducts();
      }
    },
    /**
     * choose product
     * @vuese
     */
    chooseProduct(product) {
      this.selectedProduct = product;
    },
    chooseBasketProduct(product) {
      this.selectedBasketProduct = product;
    },
    /**
     * request Quotation function
     * @vuese
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
    /**
     * @vuese
     *  add basket to cart
     */
    addBasketToCart(myProduct) {
      let data = {
        basket_promotion_id: myProduct.basket_promotion_id,
        quantity: 1,
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
          if (error.response.status == 401 || error.response.status == 403) {
            location.reload();
          }
          if (
            error.response.status == 400 &&
            error?.response?.data?.items?.exist_from_rfq == true
          ) {
            this.force_replace = true;
            this.showDeleteModal();
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.$store.dispatch("cart/getCartProducts");
          }, 500);
        });
    },
    /**
     * remove basket from  favorite
     * @vuese
     */
    removebasketFromCart(product) {
      this.$store.dispatch("wishlist/removeProductFromWishlist", {
        myItem: product.basket_promotion.favorite_id,
      });
      this.loading = true;
      this.wishlistItems = null;
      setTimeout(() => {
        this.getWishlistProducts();
      }, 1000);
      setTimeout(() => {
        this.loading = false;
      }, 1200);
    },
    /**
     * @vuese
     *  login first
     */
    loginFirst() {
      Vue.swal({
        title: this.$t("singleProduct.loginFirst"),
        text: this.$t("singleProduct.registerNow"),
        icon: "warning",
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$router.push("/user-register");
        }
      });
    },
    selectId(elementId) {
      this.selectedId = elementId;
    },
    selectStandId(elementId) {
      this.selectedId = elementId;
    },
  },
  mounted() {
    if (this.buyerUserData) {
      this.getWishlistProducts();
    }
  },
  computed: {
    checkAll: {
      get: function () {
        return this.wishlistItems
          ? this.checkedItems.length == this.wishlistItems.length
          : false;
      },
      set: function (value) {
        var checkedItems = [];
        if (value) {
          this.wishlistItems.forEach(function (order) {
            checkedItems.push(order.product_supplier_id);
          });
        }
        this.checkedItems = checkedItems;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.product-img {
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
}

.product-name {
  color: #312620;
  font-weight: 600;
  font-size: 12pt;
}

.actions {
  text-align: center;

  button {
    color: #000;
    border: none;
    background: #fff;
    color: #312620;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0.2rem;
    margin: 0 0.3rem;
    height: 44px;
    line-height: 0;
  }
  .cart-link {
    background: $main-color !important;
    color: #fff !important;
  }

  svg {
    font-size: 1.2rem;
    margin: 0 5px;
    cursor: pointer;
  }
}

.heading {
  color: #312620;
  font-size: 28pt;
}

@media screen and (max-width: 767px) {
  table {
    text-align: center;

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

  .actions {
    justify-content: center;
    align-items: center;
  }
}

.product-image {
  border-radius: 0.5rem;
}
.price {
  font-weight: bold;
}

.bulk-actions-holder {
  .select-holder {
    min-width: 200px;
    min-height: 65px;
  }

  button {
    width: 85px;
    height: 50px !important;
    padding: 8px;
  }
}
</style>
