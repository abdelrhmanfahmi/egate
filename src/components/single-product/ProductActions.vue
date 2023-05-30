<template>
  <div>
    <!-- product acctions that appera in single product page  -->
    <div class="supplier" v-if="myProduct.client.company_name">
      <div class="row justify-content-start align-items-center">
        <!-- supplier name and go to this supplier page  -->
        <div class="col-6 mb-2">
          <router-link :to="`/suppliers/${myProduct.client.id}`">
            <img
              :src="myProduct.client.image_path"
              class="supplier-image"
              alt=""
              srcset=""
            />
            <span class="mx-4">{{ myProduct.client.company_name }}</span>
          </router-link>
        </div>
        <!-- <div class="col-6 mb-2" v-if="buyerUserData">
          <b-button variant="outline-danger" id="show-btn" class="mx-2" @click="$bvModal.show('bv-modal-example')">{{
            $t("supplier.sendSupplierMessage")
          }}</b-button>
        </div>
        <div class="col-6 mb-2" v-else>
          <b-button variant="outline-danger" id="show-btn" class="mx-2" @click="loginFirst">{{
            $t("supplier.sendSupplierMessage")
          }}</b-button>
        </div> -->
        <!-- message supplier modal  -->
        <b-modal id="bv-modal-example" centered hide-footer>
          <template #modal-title>
            {{ $t("profile.yourMessage") }}
          </template>
          <div class="d-block">
            <div class="data-holder">
              <form>
                <div class="form-group required">
                  <label for="subject">
                    {{ $t("supplier.subject") }}
                    <span class="text-danger">*</span>
                  </label>
                  <input type="text" class="form-control" v-model="subject" />
                  <div class="error mt-2">
                    <p v-for="(error, index) in errors.subject" :key="index">
                      {{ error }}
                    </p>
                  </div>
                </div>
                <div class="form-group">
                  <label for="message">
                    {{ $t("contactUs.formMessage") }}
                    <span class="text-danger">*</span>
                  </label>
                  <textarea
                    class="form-control"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    v-model="message"
                    required
                  ></textarea>
                  <textarea
                    class="form-control"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    v-model="message"
                    required
                  ></textarea>
                </div>
                <div class="error mt-2">
                  <p v-for="(error, index) in errors.message" :key="index">
                    {{ error }}
                  </p>
                </div>
              </form>
            </div>
          </div>
          <b-button
            v-if="buyerUserData"
            class="mt-3"
            variant="outline-success"
            block
            @click="sendSupplierMessage(myProduct.client.id)"
            >{{ $t("profile.send") }}</b-button
          >
        </b-modal>
      </div>
    </div>
    <div
      v-if="myProduct.product_details_by_type"
      class="product-actions row align-items-center mt-4"
    >
      <div
        class="col-xl-4 col-lg-6 col-sm-6"
        v-if="
          add_to_cart == true && myProduct.product_details_by_type.quantity > 0
        "
      >
        <div
          class="product-counter mb-2"
          v-if="
            myProduct.product_details_by_type.add_type === 'cart' ||
            myProduct.product_details_by_type.add_type === 'both'
          "
        >
          <div class="actions d-flex" :class="$i18n.locale">
          
            <button
              class="product-counter-btn minus"
              @click="
                decrementQuantity(
                  myProduct.product_details_by_type.min_order_quantity
                )
              "
              :disabled="mySelectedOption == 1 || mySelectedOption <= myProduct.product_details_by_type.min_order_quantity"
            >
              <b-icon-dash />
            </button>
            <div class="value">
              <span class="product-counter-number">
                {{ mySelectedOption ? mySelectedOption : 1 }}</span
              >
            </div>
            <button class="product-counter-btn" @click="incrementQuantity">
              <b-icon-plus />
            </button>
          </div>
        </div>
      </div>

      <div class="col-xl-4 col-lg-6 col-sm-6">
        <div class="d-flex justify-content-start">
          <h4 class="">
            <span class="text-dark">{{ $t("payment.total") }} :</span>
            <span class="main-color"
              >{{
                (mySelectedOption *
                  myProduct.product_details_by_type.customer_price)
                  | fixedCurrency
              }}{{ currency }}/{{
                myProduct.product_details_by_type.unit.title
              }}</span
            >
          </h4>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 col-sm-12">
        <div class="d-flex justify-content-start align-items-center">
          <!-- cart-actions-holder -->
          <div
            class="cart-actions-holder sec-hold"
            v-if="myProduct.product_details_by_type.quantity > 0"
          >
            <!-- add to cart if logged in and profil percentage == 100 -->
            <div
              class="mr-1"
              v-if="
                (buyerUserData &&
                  buyerUserData.profile_percentage == 100 &&
                  buyerUserData.type === 'buyer') ||
                buyerUserData.type === 'b2b' ||
                (buyerUserData.type === 'supplier' &&
                  buyerUserData.is_buyer == true)
              "
            >
              <b-button
                @ok="$refs.CartModal.onSubmit()"
                @click="addToCart(myProduct)"
                class="br-5 btn btn-loght border-0 outline-none shadow-none d-block add-cart cart-btn btn-block"
                v-if="
                  (add_to_cart == true &&
                    myProduct.product_details_by_type.add_type === 'cart') ||
                  (add_to_cart == true &&
                    myProduct.product_details_by_type.add_type === 'both')
                "
              >
                <span>
                  <font-awesome-icon
                    icon="fa-solid fa-cart-shopping"
                    size="xl"
                  />
                </span>
              </b-button>
            </div>
            <!-- add to cart if logged in and profil percentage !== 100 -->
            <div
              class=""
              v-else-if="
                (buyerUserData && buyerUserData.profile_percentage !== 100) ||
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
            <!-- add to cart if b2c or guest -->
            <div
              class=""
              v-else-if="!buyerUserData || buyerUserData.type === 'b2c'"
            >
              <b-button
                @ok="$refs.CartModal.onSubmit()"
                @click="addToCart(myProduct)"
                class="br-5 btn btn-loght border-0 outline-none shadow-none d-block add-cart cart-btn"
                v-if="
                  (add_to_cart == true &&
                    myProduct.product_details_by_type.add_type === 'cart') ||
                  (add_to_cart == true &&
                    myProduct.product_details_by_type.add_type === 'both')
                "
              >
                <span>
                  <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                </span>
              </b-button>
            </div>
          </div>
          <!-- favorite-holder  -->
          <div class="favorite-holder sec-hold">
            <div
              v-if="myProduct.product_details_by_type.quantity > 0"
              class="new-wishlist-method"
            >
              <div class="products" v-if="buyerUserData">
                <!-- if product added to favorite  -->
                <a
                  class="button one active animate mobile button--secondary wishlist-btn m-0"
                  :title="`product in favourite`"
                  v-if="myProduct.is_favorite == true"
                >
                  <font-awesome-icon icon="fa-solid fa-star" size="xl" />
                </a>
                <!-- add product to favorite if not added to favorite  -->
                <a
                  class="button one inactive mobile button--secondary wishlist-btn"
                  @click="addToWishlist(myProduct)"
                  v-else
                >
                  <font-awesome-icon icon="fa-regular fa-star" size="xl" />
                </a>
              </div>
            </div>
          </div>
          <!-- rfq-holder  -->
          <div class="rfq-holder sec-hold">
            <div class="product-actions short-links mx-1">
              <!-- rfq request if logged in -->
              <button
                class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0 loged-in btn-block bg-gray"
                v-if="
                  RFQ == true &&
                  (myProduct.product_details_by_type.add_type === 'rfq' ||
                    (RFQ == true &&
                      myProduct.product_details_by_type.add_type === 'both')) &&
                  buyerUserData
                "
              >
                <div>
                  <button
                    id="show-btn"
                    class="btn btn-loght border-0 outline-none shadow-none d-block w-100"
                    @click="$bvModal.show('bv-bidRequest')"
                  >
                    <span>
                      <!-- <rfqIcon class="mx-2" /> -->
                      RFQ
                    </span>
                    <!-- {{ $t("singleProduct.bidRequest") }} -->
                  </button>
                </div>
              </button>
              <!-- rfq request if not logged in , login first  -->
              <button
                @click="loginFirst"
                class="btn btn-loght border-0 outline-none shadow-none d-block btn-block w-100 bg-gray"
                v-else-if="
                  RFQ == true &&
                  (myProduct.product_details_by_type.add_type === 'rfq' ||
                    myProduct.product_details_by_type.add_type === 'both') &&
                  !buyerUserData
                "
              >
                <span>
                  <!-- <rfqIcon class="mx-2" /> -->
                  RFQ
                </span>
                <!-- {{ $t("singleProduct.bidRequest") }} -->
              </button>
              <!-- rfq request if logged in  -->
              <button
                class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0 btn-block w-100 bg-gray mx-1"
                v-else-if="
                  (RFQ == true &&
                    myProduct.product_details_by_type.add_type === 'rfq') ||
                  (RFQ == true &&
                    myProduct.product_details_by_type.add_type === 'both')
                "
              >
                <span>
                  <!-- <rfqIcon class="mx-2" /> -->
                  RFQ
                </span>

                <!-- {{ $t("singleProduct.bidRequest") }} -->
              </button>
            </div>
          </div>

          <!-- stand-order-holder  -->
          <div class="stand-order-holder sec-hold">
            <!-- standing orders  -->
            <div class="products" v-if="buyerUserData">
              <!-- open standing orders modal if logged in    -->

              <button
                id="show-btn"
                class="button one inactive mobile button--secondary wishlist-btn add-cart"
                @click="$bvModal.show('bv-standingOrders')"
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

            <!-- open standing orders modal if logged not in , login first    -->
            <div class="products" v-else>
              <button
                id="show-btn"
                class="button one inactive mobile button--secondary wishlist-btn add-cart"
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
          </div>
        </div>
      </div>
      <div class="row align-items-center w-100">
        <div class="col-md-6 col-sm-12">

          <b-button
            @ok="$refs.CartModal.onSubmit()"
            @click="addPromotionToCart(myProduct)"
            class="btn btn-loght border-0 outline-none shadow-none d-block add-cart cart-btn m-2 mx-3"
            v-if="
              (add_to_cart &&
                myProduct.product_details_by_type.add_type === 'cart' &&
                myProduct.buy_get_promotion_running_by_type) ||
              (add_to_cart &&
                myProduct.product_details_by_type.add_type === 'both' &&
                myProduct.buy_get_promotion_running_by_type)
            "
          >
            <span>
              <font-awesome-icon icon="fa-solid fa-cart-shopping" />
            </span>
            <span class="mx-2">{{ $t("singleProduct.addCart") }}</span>
            <span v-if="dealType">({{dealType}})</span>
            <span v-else
              >({{
                `${$t("profile.buy")} 
              ${myProduct.buy_get_promotion_running_by_type.promotion.buy_x}
             ${$t("profile.get")} ${
                  myProduct.buy_get_promotion_running_by_type.promotion.get_y
                } `
              }})</span
            >
            
          </b-button>
        </div>
        <div class="col-md-6 col-sm-12" v-if="myProduct.buy_get_promotion_running_by_type && myProduct.buy_get_promotion_running_by_type.promotion.buy_x">

          <b-button
          @click="$bvModal.show('new-standing')"
          v-b-tooltip.hover
          :title="`${$t('items.standingOrders')} ( ${$t('profile.buy')} ${myProduct.buy_get_promotion_running_by_type.promotion.buy_x} ${$t('profile.get')} ${myProduct.buy_get_promotion_running_by_type.promotion.get_y} )`"
            class="btn btn btn-loght border-0 outline-none shadow-none d-block add-cart  m-2 mx-3 "
            v-if="buyerUserData"
           
          >
            <span>
              <img
                  src="@/assets/images/new-design/standing-order-sign.png"
                  class="standing-order-sign"
                  alt="standing-order-sign"
                />
            </span>
            <span class="mx-2">{{ $t("items.standingOrders") }}</span>
            <span
              >({{
                `${$t("profile.buy")} 
              ${myProduct.buy_get_promotion_running_by_type.promotion.buy_x}
             ${$t("profile.get")} ${
                  myProduct.buy_get_promotion_running_by_type.promotion.get_y
                } `
              }})</span
            >
          </b-button>
          <b-button
          @click="loginFirst()"
          v-b-tooltip.hover
          :title="`${$t('items.standingOrders')} ( ${$t('profile.buy')} ${myProduct.buy_get_promotion_running_by_type.promotion.buy_x} ${$t('profile.get')} ${myProduct.buy_get_promotion_running_by_type.promotion.get_y} )`"
            class="btn btn btn-loght border-0 outline-none shadow-none d-block add-cart  m-2 mx-3 "
            v-else
           
          >
          <div class="" v-if="myProduct.buy_get_promotion_running_by_type && myProduct.buy_get_promotion_running_by_type.promotion.buy_x">

            <span>
              <img
                  src="@/assets/images/new-design/standing-order-sign.png"
                  class="standing-order-sign"
                  alt="standing-order-sign"
                />
            </span>
            <span class="mx-2">{{ $t("items.standingOrders") }}</span>
            <span
              >({{
                `${$t("profile.buy")} 
              ${myProduct.buy_get_promotion_running_by_type.promotion.buy_x}
             ${$t("profile.get")} ${
                  myProduct.buy_get_promotion_running_by_type.promotion.get_y
                } `
              }})</span
            >
          </div>
          </b-button>
        </div>
      </div>
    </div>

    <!-- share product  -->
    <!-- <div class="mt-3 ml-0">
      <div class="p-0 m-0">
        <div class="share-social d-flex align-items-center">
          <span>{{ $t("singleProduct.sharing") }}</span>
          <div class="social-sharing-icons">
            <facebook :url="url" scale="2"></facebook>
            <twitter :url="url" title="Check me on Github" scale="2"></twitter>
            <whats-app :url="url" title="Hello" scale="2"></whats-app>
          </div>
        </div>
      </div>
    </div> -->

    <!-- rfq modal -->
    <b-modal id="bv-bidRequest" hide-footer>
      <template #modal-title>
        <!-- {{ $t("singleProduct.bidRequest") }} -->
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

    <!-- delete modal  -->
    <b-modal
      ref="delete-modal"
      id="modal-center"
      centered
      hide-footer
      :title="$t('singleProduct.addCart')"
    >
      <div class="d-block">
        <h5>
          <b>{{ $t("singleProduct.replaceRFQProduct") }}</b>
        </h5>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <b-button
            class="mt-3"
            variant="outline-danger"
            block
            @click="hideDeleteModal"
            >{{ $t("cart.cancel") }}
          </b-button>
        </div>
        <div class="col-md-6 col-sm-12">
          <b-button
            class="mt-3"
            variant="outline-success"
            block
            @click="addToCartWithRFQ(myProduct)"
            >{{ $t("singleProduct.addCart") }}
          </b-button>
        </div>
      </div>
    </b-modal>

    <!-- standing orders modal -->

    <b-modal id="bv-standingOrders" size="xl" hide-footer>
      <template #modal-title>
        {{ $t("items.standingOrders") }}
      </template>
      <standing-orders />
    </b-modal>
    <b-modal id="new-standing" size="xl" hide-footer>
      <template #modal-title>
        {{ $t("items.standingOrders") }}
      </template>
      <standing-orders :buy_get_promotion="true"/>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);
import suppliers from "@/services/suppliers";
import { BIconPlus, BIconDash } from "bootstrap-vue";
import globalAxios from "@/services/global-axios";

import categories from "@/services/categories";
import profile from "@/services/profile";

// import rfqIcon from "@/components/global/rfqIcon.vue";

import StandingOrders from "@/components/global/standingOrders.vue";

// import { Facebook, Twitter, WhatsApp } from "vue-socialmedia-share";
export default {
  components: {
    BIconPlus,
    BIconDash,
    // Facebook,
    // Twitter,
    // WhatsApp,
    // rfqIcon,
    StandingOrders,
  },
  /**
   *  pass product data as prop
   */
  props: {
    // selected Product prop
    myProduct: {
      type: Object,
      required: true,
    },
  },
  methods: {
    /**
     * @vuese
     *  add product to cart
     */
    addToCart(myProduct) {
      console.log("myProduct", myProduct);
      let data = {
        product_supplier_id:
          myProduct.product_details_by_type.product_supplier_id,
        quantity:
          this.mySelectedOption !== null || this.mySelectedOption > 0
            ? this.mySelectedOption
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
     * @vuese
     * add To Cart function
     */
    addPromotionToCart(item) {
      let data = {
        product_supplier_id: item.product_details_by_type.product_supplier_id,
        quantity:
          this.mySelectedOption !== null || this.mySelectedOption > 0
            ? this.mySelectedOption
            : 1,
        buy_get_promotion_id:
          item.buy_get_promotion_running_by_type.buy_get_promotion_id,
      };
      console.log("data", data);
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
     *  add product to cart with rfq
     */
    addToCartWithRFQ(myProduct) {
      let data = {
        product_supplier_id:
          myProduct.product_details_by_type.product_supplier_id,
        quantity:
          this.mySelectedOption !== null || this.mySelectedOption > 0
            ? this.mySelectedOption
            : 1,
        force_replace: true,
      };

      return globalAxios
        .post(`cart/add`, data)
        .then((res) => {
          if (res.status == 200) {
            this.hideDeleteModal();
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
        })
        .finally(() => {
          setTimeout(() => {
            this.$store.dispatch("cart/getCartProducts");
          }, 500);
        });
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
        // buttons: ["Oh noez!", true],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$router.push("/user-register");
        }
      });
    },

    /**
     * @vuese
     *  rfq request
     */
    requestQuotation() {
      let payload = {
        qoute_name: this.requestData.name,
        product_supplier_id:
          this.myProduct.product_details_by_type.product_supplier_id,
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
     *  login rfq request
     */

    loggedBidRequest() {
      this.sucessMsg("request sent");
    },
    /**
     * @vuese
     *  select standing order option
     */

    selectedOption(option) {
      this.mySelectedOption = option;
    },
    /**
     * @vuese
     *  increment Quantity
     */

    incrementQuantity() {
      this.mySelectedOption += 1;
    },
    /**
     * @vuese
     *  decrement Quantity
     */

    decrementQuantity(minimum) {
      if (minimum) {
        this.mySelectedOption > minimum ? this.mySelectedOption-- : null;
        console.log("no minimum");
        console.log("this.mySelectedOption", this.mySelectedOption);
      } else {
        this.mySelectedOption >= 1
          ? this.mySelectedOption--
          : this.mySelectedOption == 1;
        console.log("no minimum");
        console.log("this.mySelectedOption", this.mySelectedOption);
      }
    },
    /**
     * @vuese
     *  close Modal
     */
    closeModal() {
      this.showModal = false;
    },
    /**
     * @vuese
     *  open Modal
     */
    openModal() {
      this.showModal = true;
    },
    /**
     * @vuese
     *  add product to favorite
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

            let wishlistBtn = document.querySelector(".wishlist-btn");
            if (wishlistBtn.classList.contains("deactivate")) {
              wishlistBtn.classList.remove("deactivate");
            }
            if (wishlistBtn.classList.contains("active")) {
              wishlistBtn.classList.add("deactivate");
            }
            wishlistBtn.classList.toggle("animate");
            wishlistBtn.classList.toggle("active");
            wishlistBtn.classList.toggle("inactive");

            this.productDetails();
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
     *  get product details
     */
    productDetails() {
      this.loading = true;
      categories
        .productDetails(this.id)
        .then((res) => {
          // console.log("productDetails", res);
          this.myProduct = res.data.items;
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
     * @vuese
     *  send message to supplier
     */
    sendSupplierMessage(supplierId) {
      let data = {
        supplier_id: supplierId,
        message: this.message,
        subject: this.subject,
      };
      profile
        .sendSupplierMessage(data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
            document.querySelector(".close").click();
            this.message = "";
            this.subject = "";
          }
        })
        .catch((error) => {
          let err = Object.values(error)[2].data;
          this.errors = err.items;
          console.log(error);
        });
    },
    /**
     * @vuese
     *  remove product From Wishlist
     */
    removeFromWishlist(myProduct) {
      this.$store.dispatch("wishlist/removeProductFromWishlist", {
        myItem: myProduct.id,
      });
      setTimeout(() => {
        let wishlistBtn = document.querySelector(".wishlist-btn");
        if (wishlistBtn.classList.contains("deactivate")) {
          wishlistBtn.classList.remove("deactivate");
        }
        if (wishlistBtn.classList.contains("active")) {
          wishlistBtn.classList.add("deactivate");
        }
        wishlistBtn.classList.toggle("animate");
        wishlistBtn.classList.toggle("active");
        wishlistBtn.classList.toggle("inactive");

        this.productDetails();
      }, 500);
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
  },
  data() {
    return {
      requestData: {
        name: null,
        request_qty: null,
        comment: null,
      },
      id: this.$route.query.id,
      errors: {},
      mySelectedOption: this.myProduct.product_details_by_type
        .min_order_quantity
        ? this.myProduct.product_details_by_type.min_order_quantity
        : 1,
      changedValue: null,
      showModal: false,
      suppliers: null,
      message: null,
      subject: null,
      rfqCartAdd: null,
      dealType:this.$route.query.type
      // url: this.mainDoamin
    };
  },
  computed: {
    /**
     * @vuese
     *  get url to share socially
     */
    url() {
      return this.mainDoamin + `details?id=${this.id}`;
    },
    promotion() {
      return this.$route.query.type ? true : false;
    },
  },
};
</script>
<style lang="scss" scoped>
/**
    *  component style
*/
.product-info {
  .content {
    .category {
      color: #403a37;
      font-size: 11pt;
      margin-bottom: 0.3rem;
      display: block;
    }

    .name {
      color: #312620;
      font-weight: bold;
      font-size: 20pt;
      margin-bottom: 1rem;
    }

    .serial {
      font-size: 12pt;
      margin-bottom: 1rem;
      color: #403a37;
    }

    .price {
      font-size: 14pt;
      font-weight: bold;
      color: #312620;
      margin-bottom: 1rem;
    }

    .supplier {
      font-size: 12pt;
      color: #403a37;
      margin-bottom: 1.2rem;

      a {
        text-decoration: underline;
        color: #403a37;
        font-weight: bold;
      }
    }

    .weight {
      .title {
        font-size: 11pt;
        margin-bottom: 1.5rem;
        padding-inline-start: 2rem;
        font-weight: bold;
      }

      .available-weight {
        span {
          width: 4rem;
          height: 2rem;
          border: 3px solid #ebebeb;
          font-size: 11pt;
          color: #544842;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 0.2rem;
          // cursor: pointer;
          transition: all ease-out 0.3s;
          // &:hover {
          //   background: $main-color;
          //   border-color: $main-color;
          //   color: #fff;
          // }
        }

        span.active {
          background: $main-color;
          border-color: $main-color;
          color: #fff;
        }
      }
    }

    .is-available {
      font-size: 11pt;
      margin-bottom: 1.3rem;
      //padding-inline-start: 35px;
      font-weight: bold;
    }

    .product-actions {
      .short-links {
        // margin-inline-end: 0.5rem;
        // min-width: 10rem;
        a {
          display: block;
          color: #676565;
          font-size: 11pt;

          &:hover {
            color: $main-color;
          }

          span {
            margin-inline-start: 0.25rem;
          }
        }
      }

      .add-cart {
        font-size: 16px;
        background: #36363b;
        color: #fff;
        //padding: 12px 16px;
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
    }

    .share-social {
      span {
        color: #403a37;
        margin-inline-end: 1rem;
      }

      .social-sharing-icons {
        a {
          color: #898481;
          padding: 0.5rem;
          display: inline-block;
          margin-inline-end: 0.25rem;

          &:hover {
            color: $main-color;
          }
        }
      }
    }
  }

  .sort {
    background: #f6f6f6;
    padding: 16px !important;
    font-size: 19px;
    display: inline-block;
    margin: 10px 10px 20px 0;
  }
}

textarea {
  resize: none;
}

.submitBtn {
  background: #f57b22;
  color: #fff;
  font-size: 20px;
  border: none;
  box-shadow: none;
  outline: none;
}

.cancelBtn {
  background: transparent;
  font-size: 20px;
  border: none;
  box-shadow: none;
  outline: none;
  margin: 0 20px;
  color: #312620;
}

.product-counter {
  display: flex;
  align-items: center;
  justify-content: left;

  .actions {
    color: #606266;

    .product-counter-btn {
      width: 2rem;
      height: 1.55rem;
      border-radius: 0;
      border: 1px solid transparent;
      color: #606266;
      background: #eef1f2;
      display: flex;
      justify-content: center;
      align-items: center;

      &:first-child {
        border-bottom: 1px solid #dcdcdc;
      }
    }
  }

  .value {
    border-radius: 0;
    border: 1px solid $top-header-color;
    color: #544842;
    font-weight: 500;
    width: 4rem;
    height: 3.1rem !important;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
}

.cart-btn {
  background: $main-color !important;
}

.supplier-image {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  margin: 0 7px;
}

.social-sharing-icons {
  span {
    cursor: pointer;
  }
}

.products {
  // box-shadow: 0px 0px 9px 0px #cccccccf;
  // padding: 17px 17px;

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

      &:hover {
        color: $main-color;
      }

      span {
        margin-inline-end: 0.5rem;
      }
    }
  }
}

.svg-icon {
  width: 30px;

  svg {
    fill: #fff;
    width: inherit;
  }
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
    background: #fff;
    border: 1px solid $main-color;
    box-shadow: none;
    padding: 13px 13px;
    transition-property: border;
    transition-timing-function: ease-in-out;
    transition-duration: 0.15s;
  }

  .button--full-width {
    min-width: 385px;
  }

  .icon-with-text {
    display: inline-flex;
    align-items: flex-start;
  }

  .icon-with-text__icon {
    flex-shrink: 0;
    margin-right: 8px;
    margin-top: -2px;
  }

  .icon-svg--color-silver {
    fill: $silver;
    color: $silver;
  }

  .icon-svg--color-blue {
    fill: $main-color;
    color: $main-color;
  }

  .icon-svg {
    display: inline-block;
    vertical-align: middle;
    height: 16px;
    width: 16px;
  }

  // position the active state heart
  .heart-full {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }

  // firework effect styles
  .btn__effect {
    display: inline-block;
    position: relative;
  }

  .effect-group {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(25deg);

    .effect {
      display: block;
      position: absolute;
      top: 38%;
      left: 50%;
      width: 20px;
      transform-origin: 0px 2px;

      &:nth-child(2) {
        transform: rotate(72deg);
      }

      &:nth-child(3) {
        transform: rotate(72 * 2deg);
      }

      &:nth-child(4) {
        transform: rotate(72 * 3deg);
      }

      &:nth-child(5) {
        transform: rotate(72 * 4deg);
      }

      &:before {
        content: "";
        display: block;
        position: absolute;
        right: 0;
        border-radius: $fireworks--border;
        height: $fireworks--height;
        background: $main-color;
      }

      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 10px;
        right: 10%;
        border-radius: 50%;
        width: $fireworks--width;
        height: $fireworks--height;
        background: #ff6600;
        transform: scale(0, 0);
      }
    }
  }

  // TRIGGER ANIMATIONS
  // Generic
  .active {
    .heart-stroke {
      opacity: 0;
    }

    .heart-full {
      opacity: 1;
    }

    .icon-svg {
      animation: bounceIn 0.5s linear;
    }

    .effect:before {
      animation: fireworkLine 0.5s linear 0.1s;
    }

    .effect:after {
      animation: fireworkPoint 0.5s linear 0.1s;
    }
  }

  //cracking heart
  .broken-heart {
    position: absolute;
    left: -16px;
    top: 0;
    opacity: 0;

    &--left {
      transform: rotate(0deg);
      transform-origin: 60% 200%;
    }

    &--right {
      transform: rotate(0deg);
      transform-origin: 63% 200%;
    }

    &--crack {
      stroke-dasharray: 15;
      stroke-dashoffset: 15;
    }
  }

  .deactivate {
    .broken-heart {
      opacity: 1;
    }

    .broken-heart--left {
      animation: crackLeft 0.35s cubic-bezier(0.68, -0.55, 0.265, 2.85) 0.15s
          forwards,
        hide 0.25s ease-in 0.55s forwards;
    }

    .broken-heart--right {
      animation: crackRight 0.35s cubic-bezier(0.68, -0.55, 0.265, 2.85) 0.15s
          forwards,
        hide 0.25s ease-in 0.55s forwards;
    }

    .broken-heart--crack {
      animation: crack 0.2s ease-in forwards;
    }
  }

  // Variation One
  .button.one.desktop:not(.active):hover {
    .heart-stroke {
      animation: pulse 1s ease-out infinite;
    }
  }

  .button.one.inactive .heart-full {
    //animation: wiltT .5s ease-in forwards;
  }

  // Variation Two
  .button.two.desktop:not(.active):hover {
    .heart-stroke {
      animation: pulseBlue 1s ease-out infinite;
    }
  }

  // ANIMATIONS

  // subtle heart pulse on hover (grey)
  @keyframes pulse {
    0% {
      opacity: 1;
      transform-origin: center center;
      transform: scale(1);
    }

    50% {
      opacity: 0.6;
      transform: scale(1.15);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  // subtle heart pulse on hover (grey to blue)
  @keyframes pulseBlue {
    0% {
      transform-origin: center center;
      transform: scale(1);
      fill: $silver;
    }

    50% {
      transform: scale(1.15);
      fill: $main-color;
    }

    100% {
      transform: scale(1);
      fill: $silver;
    }
  }

  // fireworks animations
  @keyframes fireworkLine {
    0% {
      right: 20%;
      transform: scale(0, 0);
    }

    25% {
      right: 20%;
      width: 6px;
      transform: scale(1, 1);
    }

    35% {
      right: 0;
      width: 35%;
    }

    70% {
      right: 0;
      width: 4px;
      transform: scale(1, 1);
    }

    100% {
      right: 0;
      transform: scale(0, 0);
    }
  }

  @keyframes fireworkPoint {
    30% {
      transform: scale(0, 0);
    }

    60% {
      transform: scale(1, 1);
    }

    100% {
      transform: scale(0, 0);
    }
  }

  @keyframes bounceIn {
    0% {
      transform: scale(0);
    }

    30% {
      transform: scale(1.25);
    }

    50% {
      transform: scale(0.9);
    }

    70% {
      transform: scale(1.1);
    }

    80% {
      transform: scale(1);
    }
  }

  // WIP deactivate state
  @keyframes crackLeft {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-45deg);
    }
  }

  @keyframes crackRight {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(45deg);
    }
  }

  @keyframes crack {
    0% {
      stroke-dasharray: 15;
      stroke-dashoffset: 15;
    }

    80% {
      stroke-dasharray: 15;
      stroke-dashoffset: 0;
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes hide {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
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
