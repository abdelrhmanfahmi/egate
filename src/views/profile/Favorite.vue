<template>
  <!-- favorite page  -->
  <div class="fav">
    <div class="">
      <!-- if data exist  -->
      <div class="" v-if="wishlistItems !== null">
        <h5 class="heading py-5 text-center">{{ $t("profile.favorite") }}</h5>
        <div class="cart-table" v-if="wishlistItems.length">
          <div class="suppliers py-4">
            <div class="container">
              <!-- table contain favorite data  -->
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">{{ $t("profile.productImage") }}</th>
                    <th scope="col">{{ $t("profile.productName") }}</th>
                    <th scope="col">{{ $t("profile.itemPrice") }}</th>
                    <th scope="col">{{ $t("profile.actions") }}</th>
                  </tr>
                </thead>
                <tbody v-for="(item, index) in wishlistItems" :key="index">
                  <tr v-if="item.product_supplier">
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
                          v-if="
                            (cartAvailable == 'available' &&
                              item.product_supplier.product_details_by_type
                                .add_type === 'cart') ||
                            (cartAvailable == 'available' &&
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
                            RfqAvailable == 'available' &&
                            (item.product_supplier.product_details_by_type
                              .add_type === 'rfq' ||
                              (RfqAvailable == 'available' &&
                                item.product_supplier.product_details_by_type
                                  .add_type === 'both')) &&
                            buyerUserData
                          "
                        >
                          <div>
                            <button
                              id="show-btn"
                              class="btn btn-loght border-0 outline-none shadow-none d-block add-cart w-100 add-cart-rfq"
                              @click="$bvModal.show('bv-bidRequest')"
                            >
                              <span>
                                <rfqIcon class="mx-2" />
                              </span>
                            </button>
                          </div>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr
                    class="item-content text-center"
                    v-for="(item, index) in wishlistItems"
                    :key="index"
                  >
                    <!-- product image and go to pproduct page with click  -->
                    <td class="media">
                      <router-link
                        :to="{
                          path: '/basketOfferDetails',
                          query: { id: `${item.basket_promotion_id}` },
                        }"
                        class="thumb w-100"
                      >
                        <img
                          :src="item.basket_promotion.image_path"
                          :alt="item.basket_promotion.image_path + ' image'"
                          class="product-image"
                        />
                      </router-link>
                    </td>
                    <!-- product name  and go to pproduct page with click  -->
                    <td>
                      <router-link
                        :to="{
                          path: '/basketOfferDetails',
                          query: { id: `${item.basket_promotion_id}` },
                        }"
                      >
                        {{ item.basket_promotion.title }}
                      </router-link>
                    </td>
                    <!-- if product price exist -->
                    <td
                      v-if="
                        item.basket_promotion.basket_price ||
                        item.basket_promotion.basket_price >= 0
                      "
                    >
                      {{ item.basket_promotion.basket_price | fixedCurrency }}
                      {{ currency }}
                    </td>
                    <!-- if product price not exist -->
                    <td v-else>-</td>
                    <!-- counter to update product quantity -->
                    <!-- product price * product quantity = total product price -->

                    <!-- remove product from cart -->

                    <td >
                      <div class="actions d-flex justify-content-center align-items-center">
                        
                        <div
                          @click="addBasketToCart(item)"
                          class="action"
                          v-if="item.basket_promotion.in_stock == true"
                        >
                          <span class="action-icon">
                            <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                          </span>
                        </div>
                        <div class="actions" @click="removebasketFromCart(item)">
                          <span class="action-icon">
                            <font-awesome-icon icon="fa-solid fa-trash" />
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                class="text-center d-flex justify-content-center align-items-center mt-5"
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
            <h2>{{$t('cart.noProducts')}}</h2>
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
  </div>
</template>

<script>
//  favorite page
import globalAxios from "@/services/global-axios";
import Paginate from "@/components/global/Paginate.vue";
import rfqIcon from "@/components/global/rfqIcon.vue";
import suppliers from "@/services/suppliers";
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
    };
  },
  components: {
    Paginate,
    rfqIcon,
  },
  methods: {
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
          console.log(resp);
          this.wishlistItems = resp.data.items.data;
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
      console.log(item.product_supplier_id);
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
      console.log('myProduct' , myProduct);
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
  },
  mounted() {
    if (this.buyerUserData) {
      this.getWishlistProducts();
    }
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
</style>
