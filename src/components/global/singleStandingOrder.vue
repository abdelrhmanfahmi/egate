<template>
  <div class="fav">
    <!-- single standing order design  -->
    <div class="">
      <div class="" v-if="orders !== null">
        <h5 class="heading py-5 text-center">
          {{ $t("items.standingOrderProducts") }}
        </h5>
        <div class="d-flex float-right px-5 pb-5" v-if="ordersLength > 0">
          <b-button @click="showCartModal()" variant="outline-success" class="mx-2"
            v-if="!checkedProduct || checkedProduct.length <= 0">
            {{ $t("items.addAllToCart") }}
            <font-awesome-icon icon="fa-solid fa-cart-shopping" />
          </b-button>
          <b-button variant="outline-success" class="mx-2" @click="addCheckedProductToCart" v-else>
            {{ $t("singleProduct.addcheckedProductToCart") }}
            <font-awesome-icon icon="fa-solid fa-cart-shopping" />
          </b-button>

          <div class="" v-if="checkedProduct && checkedProduct.length > 0">
            <b-button variant="outline-danger" class="mx-2" @click="removeCheckedProductFromCart">
              {{ $t("singleProduct.removecheckedProductToCart") }}
              <font-awesome-icon icon="fa-solid fa-trash-can" />
            </b-button>
          </div>
          <b-button @click="showDeleteModal()" variant="outline-danger" class="mx-2">
            {{ $t("items.removeGroup") }}
            <font-awesome-icon icon="fa-solid fa-trash-can" />
          </b-button>
        </div>

        <div class="cart-table" v-if="ordersLength > 0">
          <div class="suppliers py-4">
            <div class="container">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">{{ $t("profile.productImage") }}</th>
                    <th scope="col">{{ $t("profile.productName") }}</th>
                    <th scope="col">{{ $t("cart.quantity") }}</th>
                    <th scope="col">{{ $t("items.price") }}</th>
                    <th scope="col">{{ $t("profile.actions") }}</th>
                  </tr>
                </thead>
                <tbody v-for="(item, index) in orders" :key="index">
                  <tr v-if="item.product_supplier">
                    <td class="text-center">
                      <div class="d-flex justify-content-around align-items-center">
                        <input type="checkbox" class="myproject--checkbox" :value="item.product_supplier.id"
                          v-model="checkedProduct" />
                        <router-link :to="{
                          path: '/details',
                          query: { id: item.product_supplier_id },
                        }">
                          <div class="d-block text-center" v-if="item.product_supplier.current_main_image_path">
                            <img :src="
                              item.product_supplier.current_main_image_path
                            " alt="wishlist-product-image" class="product-img" />
                          </div>
                          <div class="d-block text-center" v-else>
                            <img :src="logoEnv" v-if="logoEnv" class="product-img" alt="logo">
                            <img src="@/assets/images/logo.png" v-else alt="logo" class="product-img" />
                          </div>
                        </router-link>
                      </div>
                    </td>
                    <td class="text-center">
                      <router-link class="text-dark" :to="{
                        path: '/details',
                        query: { id: item.product_supplier_id },
                      }">
                        <p v-if="item.product_supplier.product"
                          class="supplier-name text-center mt-3 text-capitalize mb-0 font-weight-bold mb-3">
                          <span>{{ item.product_supplier.product.title }}
                          </span>
                        </p>
                      </router-link>
                    </td>
                    <!-- <td class="text-center">{{ item.quantity }}</td> -->
                    <td class="text-center">
                      <Variants-Counter :minimum="1" class="justify-content-center" :quantity="item.quantity"
                        @changeCount="ChangeCounter($event, item)"></Variants-Counter>
                    </td>
                    <td class="text-center">
                      <p class="price" v-if="item.product_supplier.product_details_by_type">
                        <span v-if="
                          item.product_supplier.product_details_by_type.customer_price
                        ">
                          {{
                            item.product_supplier.product_details_by_type.customer_price
                              | fixedCurrency
                          }}
                          {{ currency }}
                        </span>
                        <br />
                        <span class="price-after" v-if="
                          item.product_supplier.product_details_by_type
                            .price_before_discount &&
                          item.product_supplier.product_details_by_type
                            .price_before_discount >
                          item.product_supplier.product_details_by_type
                            .price
                        ">
                          {{
                            item.product_supplier.product_details_by_type
                              .price_before_discount | fixedCurrency
                          }}
                          {{ currency }}
                        </span>
                      </p>
                    </td>
                    <td class="text-center">
                      <div v-if="item.product_supplier.product_details_by_type"
                        class="actions d-flex justify-content-center align-items-center">
                        <div class="" v-if="favourite">

                          <a class="text-danger d-flex justify-content-center align-items-center"
                            @click="addToWishlist(item)" v-if="item.product_supplier.is_favorite == true"
                            v-b-tooltip.hover :title="$t('items.addedToFavourite')">
                            <font-awesome-icon icon="fa-solid fa-star" />
                          </a>
                          <a @click="addToWishlist(item)" v-b-tooltip.hover :title="$t('items.addToFavourite')"
                            class="d-flex justify-content-center align-items-center text-dark" v-else>
                            <font-awesome-icon icon="fa-solid fa-star" />
                          </a>
                        </div>

                        <b-button @click="addToCart(item)" v-if="
                          (add_to_cart &&
                            item.product_supplier.product_details_by_type
                              .add_type === 'cart') ||
                          (add_to_cart &&
                            item.product_supplier.product_details_by_type
                              .add_type === 'both')
                        ">
                          <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                        </b-button>
                        <button @click="chooseProduct(item.product_supplier)"
                          class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0 loged-in add-cart-rfq"
                          v-if="
                            RFQ == 'available' &&
                            (item.product_supplier.product_details_by_type
                              .add_type === 'rfq' ||
                              (RFQ == 'available' &&
                                item.product_supplier.product_details_by_type
                                  .add_type === 'both')) &&
                            buyerUserData
                          ">
                          <div>
                            <button id="show-btn"
                              class="btn btn-loght border-0 outline-none shadow-none d-block add-cart w-100 add-cart-rfq"
                              @click="$bvModal.show('bv-bidRequest')">
                              <!-- <span role="button" @click="loggedBidRequest"> -->
                              <span>
                                <rfqIcon class="mx-2" />
                              </span>
                            </button>
                          </div>
                        </button>
                        <b-button @click="removeProduct(item)">
                          <font-awesome-icon icon="fa-solid fa-trash-can" />
                        </b-button>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="!item.product_supplier && item.basket_promotion_id || item.basket_promotion">
                    <td class="text-center">
                      <div class="d-flex justify-content-around align-items-center">
                        <input type="checkbox" class="myproject--checkbox" :value="item.id"
                          v-model="checkedProduct" />
                        <router-link :to="{
                          path: '/basketOfferDetails',
                          query: { id: item.basket_promotion.id },
                        }">
                          <div class="d-block text-center" v-if="item.basket_promotion.image_path">
                            <img :src="
                              item.basket_promotion.image_path
                            " alt="wishlist-product-image" class="product-img" />
                          </div>
                          <div class="d-block text-center" v-else>
                            <img :src="logoEnv" v-if="logoEnv" class="product-img" alt="logo">
                            <img src="@/assets/images/logo.png" v-else alt="logo" class="product-img" />
                          </div>
                        </router-link>
                      </div>
                    </td>
                    <td class="text-center">
                      <router-link class="text-dark" :to="{
                        path: '/basketOfferDetails',
                        query: { id: item.basket_promotion.id },
                      }">
                        <p v-if="item.basket_promotion.id"
                          class="supplier-name text-center mt-3 text-capitalize mb-0 font-weight-bold mb-3">
                          <span>{{ item.basket_promotion.title }}
                          </span>
                        </p>
                      </router-link>
                    </td>
                    <!-- <td class="text-center">{{ item.quantity }}</td> -->
                    <td class="text-center">
                      <span v-if="item.basket_promotion.quantity">

                        <Variants-Counter :minimum="1" class="justify-content-center" :quantity="item.basket_promotion.quantity"
                          @changeCount="ChangeCounter($event, item)"></Variants-Counter>
                      </span>
                        <span v-else>-</span>
                    </td>
                    <td class="text-center">
                      <p class="price" v-if="item">
                        <span v-if="
                          item.basket_promotion.basket_price
                        ">
                          {{
                            item.basket_promotion.basket_price
                              | fixedCurrency
                          }}
                          {{ currency }}
                        </span>
                        <br />
                      </p>
                    </td>
                    <td class="text-center">
                      <div 
                        class="actions d-flex justify-content-center align-items-center">
                        <div class="" v-if="favourite">

                          <a class="text-danger d-flex justify-content-center align-items-center"
                            @click="basketAddToWishlist(item)" v-if="item.basket_promotion.is_favorite == true"
                            v-b-tooltip.hover :title="$t('items.addedToFavourite')">
                            <font-awesome-icon icon="fa-solid fa-star" />
                          </a>
                          <a @click="basketAddToWishlist(item)" v-b-tooltip.hover :title="$t('items.addToFavourite')"
                            class="d-flex justify-content-center align-items-center text-dark" v-else>
                            <font-awesome-icon icon="fa-solid fa-star" />
                          </a>
                        </div>

                        <b-button @click="basketAddToCart(item)" v-if="item.basket_promotion.in_stock == true">
                          <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                        </b-button>
                        <b-button @click="basketRemoveProduct(item)">
                          <font-awesome-icon icon="fa-solid fa-trash-can" />
                        </b-button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="text-center d-flex justify-content-center align-items-center mt-5">
                <Paginate v-if="wishlistItems" :total-pages="totalPages" :per-page="totalPages" :current-page="page"
                  @pagechanged="onPageChange" />
              </div>
            </div>
          </div>
        </div>
        <div class="text-center" v-else>
          <h6>{{ $t("cart.noData") }}</h6>
          <b-button variant="outline-success" to="/profile/StandingOrders">{{ $t("items.backToStrandingList") }}
            <font-awesome-icon icon="fa-sharp fa-solid fa-bag-shopping" />
          </b-button>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center flex-column" v-else>
        <img src="@/assets/images/wishlist.png" alt="cart-image" />
        <div class="spinner-border text-secondary" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    </div>
    <!-- rfq modal  -->

    <!-- rfq modal  -->
    <b-modal id="bv-bidRequest" hide-footer>
      <template #modal-title>
        {{ $t("singleProduct.bidRequest") }}
      </template>
      <form>
        <div class="form-group">
          <label for="">{{ $t("singleProduct.nameInput") }}
            <span class="text-danger">*</span></label>
          <input type="text" class="form-control" v-model="requestData.name" />
          <div class="text-danger" v-for="(error, index) in errors.qoute_name" :key="index">
            {{ error }}
          </div>
        </div>
        <div class="form-group">
          <label for="">{{ $t("singleProduct.min_order_quantity") }}
            <span class="text-danger">*</span></label>
          <input type="number" min="1" class="form-control" v-model="requestData.request_qty" />
          <div class="text-danger" v-for="(error, index) in errors.request_qty" :key="index">
            {{ error }}
          </div>
        </div>
        <div class="form-group">
          <label for="">{{ $t("singleProduct.reviewInput") }}
            <span class="text-danger">*</span></label>
          <textarea class="form-control" v-model="requestData.comment"></textarea>
          <div class="text-danger" v-for="(error, index) in errors.comment" :key="index">
            {{ error }}
          </div>
        </div>
      </form>
      <b-button class="btn-lg btn-block" block @click="requestQuotation">{{
        $t("cart.submit")
      }}</b-button>
    </b-modal>

    <!-- delete modal  -->
    <b-modal ref="delete-modal" id="modal-center" centered hide-footer :title="$t('items.deleteGroup')">
      <div class="d-block"></div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <b-button class="mt-3" variant="outline-danger" block @click="hideDeleteModal">{{ $t("cart.cancel") }}
          </b-button>
        </div>
        <div class="col-md-6 col-sm-12">
          <b-button class="mt-3" variant="outline-success" block @click="deleteStandingOrder">{{ $t("items.remove") }}
          </b-button>
        </div>
      </div>
    </b-modal>
    <!-- add to cart modal  -->
    <b-modal ref="cart-modal" id="modal-center" centered hide-footer :title="$t('items.addAllToCart')">
      <div class="d-block"></div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <b-button class="mt-3" variant="outline-danger" block @click="hideCartModal">{{ $t("cart.cancel") }}
          </b-button>
        </div>
        <div class="col-md-6 col-sm-12">
          <b-button class="mt-3" variant="outline-success" block @click="addAllToCart">{{ $t("items.addAllToCart") }}
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import globalAxios from "@/services/global-axios";
import Paginate from "@/components/global/Paginate.vue";
import rfqIcon from "@/components/global/rfqIcon.vue";
import suppliers from "@/services/suppliers";
import profile from "@/services/profile";
import VariantsCounter from "@/components/global/variantsCounter.vue";
export default {
  data() {
    return {
      id: this.$route.query.id,
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
      cartCounter: null,
      checkedProduct: [],
    };
  },
  components: {
    Paginate,
    rfqIcon,
    VariantsCounter,
  },
  methods: {
    /**
     * @vuese
     * add To favorite function
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
     * add basket To favorite function
     */
     basketAddToWishlist(item) {
      let data = {
        basket_promotion_id: item.basket_promotion.id,
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
     * add To cart function
     */
    addToCart(item) {
      let data = {
        product_supplier_id: item.product_supplier_id,
        quantity: this.handleQuantity(item),
        client_standing_id: this.id
        // quantity: item.product_supplier.product_details_by_type
        //   .min_order_quantity
        //   ? item.product_supplier.product_details_by_type.min_order_quantity
        //   : 1,
      };
      console.log('quantity', data.quantity);

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
          // setTimeout(() => {
          //   this.$router.go(this.$router.RouterLink);
          // }, 600);
        });
    },
    /**
     * @vuese
     * add To cart function
     */
    basketAddToCart(item) {
      let data = {
        basket_promotion_id: item.basket_promotion.id,
        quantity: this.handleQuantity(item),
        client_standing_id: this.id
        // quantity: item.product_supplier.product_details_by_type
        //   .min_order_quantity
        //   ? item.product_supplier.product_details_by_type.min_order_quantity
        //   : 1,
      };
      console.log('quantity', data.quantity);

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
          // setTimeout(() => {
          //   this.$router.go(this.$router.RouterLink);
          // }, 600);
        });
    },
    /**
     * @vuese
     * handle Quantity to add to cart function
     */
    handleQuantity(item) {
      if (this.cartCounter) {
        if (this.cartCounter) {
          return this.cartCounter
        } else {
          return 1
        }
      } else {
        if (item.quantity) {
          return item.quantity
        } else {
          if (this.cartCounter) {
            return this.cartCounter
          } else {
            return 1
          }
        }
      }


    },
    /**
     * @vuese
     * this function used for pagination
     */
    onPageChange(page) {
      this.page = page;
      this.getWishlistProducts();
    },
    /**
     * @vuese
     * this function used for pagination
     */
    onChangeRecordsPerPage() {
      this.getWishlistProducts();
    },
    /**
     * @vuese
     * this function used for pagination
     */
    gotoPage() {
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.getWishlistProducts();
      }
    },
    /**
     * @vuese
     * this function used to choose Product
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
    /**
     * @vuese
     * this function used to remove Product from standing orders
     */
    removeProduct(item) {
      let payload = {
        product_supplier_id: item.product_supplier.id,
        client_standing_id: this.id,
      };
      profile
        .removeProductFromStandingOrder(payload)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.$emit("removeItem");
        })
        .catch((err) => {
          let errors = Object.values(err)[2].data;
          this.errors = errors.items;
          this.errMsg(err.message);
        });
    },
    /**
     * @vuese
     * this function used to remove Product from standing orders
     */
     basketRemoveProduct(item) {
      let payload = {
        basket_promotion_id: item.basket_promotion_id,
        client_standing_id: this.id,
      };
      profile
        .removeProductFromStandingOrder(payload)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.$emit("removeItem");
        })
        .catch((err) => {
          let errors = Object.values(err)[2].data;
          this.errors = errors.items;
          this.errMsg(err.message);
        });
    },
    /**
     * @vuese
     * this function used to add All ToCart
     */
    addAllToCart() {
      let payload = {
        client_standing_id: this.id,
      };
      profile
        .addAllToCart(payload)
        .then((res) => {
          if (res.data.message) {
            this.sucessMsg(res.data.message);
          }
          this.hideCartModal();
          this.$store.dispatch("cart/getCartProducts");
        })
        .catch((err) => {
          this.errMsg(err.message);
          console.log(err);
        });
    },
    /**
     * @vuese
     * this function used to delete Standing Order
     */
    deleteStandingOrder() {
      profile
        .deleteStandingOrder(this.id)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
            this.hideDeleteModal();
            setTimeout(() => {
              this.$router.push("/profile/StandingOrders");
            }, 500);
          }
        })
        .catch((err) => {
          this.errMsg(err.message);
          console.log(err);
        });
    },
    /**
     * @vuese
     * this function used to show Delete Modal
     */
    showDeleteModal() {
      this.$refs["delete-modal"].show();
    },
    /**
     * @vuese
     * this function used to hide Delete Modal
     */
    hideDeleteModal() {
      this.$refs["delete-modal"].hide();
    },
    /**
     * @vuese
     * this function used to show Cart Modal
     */
    showCartModal() {
      this.$refs["cart-modal"].show();
    },
    /**
     * @vuese
     * this function used to hide Cart Modal
     */
    hideCartModal() {
      this.$refs["cart-modal"].hide();
    },
    /**
     * @vuese
     * this function used to Change Counter
     */
    ChangeCounter(cartCounter, item) {
      this.cartCounter = cartCounter;
      this.changeProductQuantity(item);
    },
    /**
     * @vuese
     * this function used to change Product Quantity
     */
    changeProductQuantity(product) {
      let data = {
        item_id: product.id,
        quantity: this.cartCounter,
      };
      profile
        .changeStandingOrderQuantity(data)
        .then((res) => {
          this.sucessMsg(res.data.message);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },

    /**
     * @vuese
     * add Checked Product To Cart
     */

    addCheckedProductToCart() {
      let payload = {
        client_standing_id: this.id,
        product_supplier_ids: this.checkedProduct,
      };
      profile
        .addCheckedProductToCart(payload)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.$store.dispatch("cart/getCartProducts");
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },

    /**
     * @vuese
     * remove Checked Products From Cart
     */

    removeCheckedProductFromCart() {
      let payload = {
        product_supplier_id: this.checkedProduct,
        client_standing_id: this.id,
      };
      profile
        .removeCheckedProductFromCart(payload)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.$emit("removeItem");
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
  },
  /**
   * props
   */
  // props: ["orders", "ordersLength"],
  props: {
    orders: {
      // orders prop
      type: Array,
      required: false,
    },
    ordersLength: {
      // orders Length prop
      type: Number,
      required: false,
    },
  },
};
</script>
<style lang="scss" scoped>
/**
    * component style 
  */
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
    color: #000 !important;
    background-color: transparent !important;
    border: 0 !important;
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

/* checkbox */
.myproject--checkbox {
  height: 20px;
  width: 20px;
  accent-color: red;
  display: inline-block;
  cursor: pointer;
}
</style>
