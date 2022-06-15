<template>
  <div class="product-info">
    <div class="content" v-if="myProduct">
      <b
        class="sort"
        v-for="type in myProduct.product.categories"
        :key="type.id"
      >
        {{ type.title }}
      </b>
      <h4 class="name" v-if="myProduct.product.title">
        {{ myProduct.product.title }}
      </h4>
      <!-- <p class="description" v-if="myProduct.short_description" v-html="myProduct.short_description">
        
      </p> -->
      <!-- <b-form-rating></b-form-rating> -->

      <div class="" v-if="myProduct.product_details_by_type">
        <p class="serial" v-if="myProduct.product_details_by_type.sku">
          SKU : {{ myProduct.product_details_by_type.sku }}
        </p>
        <p class="price">
          <span>
            {{ $t("singleProduct.price") }} :
            {{
              myProduct.product_details_by_type.customer_price | fixedCurrency
            }}
            {{ currency }}
          </span>
          <span
            class="price-after"
            v-if="
              myProduct.product_details_by_type.price_before_discount &&
              myProduct.product_details_by_type.price_before_discount >
                myProduct.product_details_by_type.customer_price
            "
          >
            {{
              myProduct.product_details_by_type.price_before_discount
                | fixedCurrency
            }}
            {{ currency }}
          </span>
        </p>

        <hr />
        <div class="supplier" v-if="myProduct.client.company_name">
          <!-- {{ $t("singleProduct.supplier") }} -->
          <!-- <b>:</b> -->
          <div class="row justify-content-center align-items-center">
            <div class="col-6 mb-2">
              <router-link :to="`/suppliers/${myProduct.client.id}`">
                <img
                  :src="myProduct.client.image_path"
                  class="supplier-image"
                  alt=""
                  srcset=""
                />
                {{ myProduct.client.company_name }}
              </router-link>
            </div>
            <div class="col-6 mb-2" v-if="buyerUserData">
              <b-button
                variant="outline-danger"
                id="show-btn"
                class="mx-2"
                @click="$bvModal.show('bv-modal-example')"
                >{{ $t("supplier.sendSupplierMessage") }}</b-button
              >
            </div>
            <div class="col-6 mb-2" v-else>
              <b-button
                variant="outline-danger"
                id="show-btn"
                class="mx-2"
                @click="loginFirst"
                >{{ $t("supplier.sendSupplierMessage") }}</b-button
              >
              <!-- <router-link to="/b2b-login">{{ $t("login.login") }}</router-link> -->
            </div>
            <b-modal id="bv-modal-example" centered hide-footer>
              <template #modal-title>
                {{ $t("profile.yourMessage") }}
              </template>
              <div class="d-block">
                <div class="data-holder">
                  <form>
                    <div class="form-group">
                      <label for="subject">
                        {{ $t("supplier.subject") }}
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="subject"
                      />
                      <div class="error mt-2">
                        <p
                          v-for="(error, index) in errors.subject"
                          :key="index"
                        >
                          {{ error }}
                        </p>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="message">
                        {{ $t("contactUs.formMessage") }}
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
                class="mt-3"
                variant="outline-success"
                block
                @click="sendSupplierMessage(myProduct.client.id)"
                >{{ $t("profile.send") }}</b-button
              >
              <!-- <b-button class="mt-3" variant="outline-success" block @click="$bvModal.hide('bv-modal-example')"
          >{{$t('cart.addToCart')}}</b-button
        > -->
            </b-modal>
          </div>
        </div>
        <div class="weight">
          <span
            class="title mr-3"
            v-if="myProduct.product_details_by_type.weight"
          >
            {{ $t("singleProduct.weight") }} :
          </span>

          <span>
            <div
              class="available-weight d-flex justify-content-end"
              v-if="myProduct.product_details_by_type"
            >
              <span v-if="myProduct.product_details_by_type.unit"
                >{{ myProduct.product_details_by_type.weight }}
                {{ myProduct.product_details_by_type.unit.title }}</span
              >
            </div>
          </span>
        </div>
      </div>
      <span
        class="is-available"
        v-if="myProduct.product_details_by_type.quantity > 0"
        >{{ $t("singleProduct.available") }} :
        <b>{{ myProduct.product_details_by_type.quantity }}</b></span
      >
      <span class="is-available text-danger" v-else>
        <b>{{ $t("singleProduct.outOfStock") }}</b></span
      >

      <!--  -->
      <div class="variants" v-if="myProduct.product.variants">
        <p
          class="sort"
          v-for="type in myProduct.product.variants"
          :key="type.id"
        >
          <b v-if="type.variant.title">
            {{ type.variant.title }}
          </b>
        </p>
        <div class="weight" v-if="myProduct.product_details_by_type">
          <div
            class="available-weight d-flex justify-content-end"
            v-for="option in myProduct.product_details_by_type.options"
            :key="option.id"
          >
            <span
              v-if="option.price"
              @click="selectedOption(option.price)"
              :class="mySelectedOption == option.price ? 'active' : ''"
            >
              {{ option.price }}
            </span>
          </div>
        </div>
      </div>
      <hr />
      <div
        v-if="myProduct.product_details_by_type"
        class="product-actions row justify-content-between align-items-center mt-4"
      >
        <div class="col-2">
          <div class="products mb-2 mr-1" v-if="buyerUserData">
            <a
              class="text-danger d-flex justify-content-center align-items-center bg-transparent text-white"
              :title="`product in favourite`"
              v-if="myProduct.is_favorite == true"
              ><font-awesome-icon icon="fa-solid fa-star"
            /></a>
            <a
              @click="addToWishlist(myProduct)"
              class="d-flex justify-content-center align-items-center text-dark"
              v-else
              ><font-awesome-icon icon="fa-solid fa-star"
            /></a>
          </div>
        </div>
        <div class="col-7">
          <div
            class="mb-2 mr-1"
            v-if="
              (buyerUserData &&
                buyerUserData.profile_percentage == 100 &&
                buyerUserData.type === 'buyer') ||
              buyerUserData.type === 'b2b' ||
              (buyerUserData.type === 'supplier' && buyerUserData.is_buyer == true)
            "
          >
            <b-button
              @ok="$refs.cartModal.onSubmit()"
              @click="addToCart(myProduct)"
              class="btn btn-loght border-0 outline-none shadow-none d-block add-cart cart-btn btn-block"
              v-if="
                myProduct.product_details_by_type.add_type === 'cart' ||
                myProduct.product_details_by_type.add_type === 'both'
              "
            >
              {{ $t("singleProduct.addCart") }}
            </b-button>

            <!-- <transition name="modal">
            <div class="modal-mask" v-if="showModal">
              <modal @close="closeModal" :product="myProduct" />
            </div>
          </transition> -->
          </div>
          <div
            class="mb-2"
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
          <div class="mb-2" v-else-if="!buyerUserData || buyerUserData.type === 'b2c'">
            <b-button
              @ok="$refs.cartModal.onSubmit()"
              @click="addToCart(myProduct)"
              class="btn btn-loght border-0 outline-none shadow-none d-block add-cart cart-btn"
              v-if="
                myProduct.product_details_by_type.add_type === 'cart' ||
                myProduct.product_details_by_type.add_type === 'both'
              "
            >
              {{ $t("singleProduct.addCart") }}
            </b-button>
          </div>
        </div>
        <div class="col-3">
          <div
            class="product-counter mb-2"
            v-if="
              myProduct.product_details_by_type.add_type === 'cart' ||
              myProduct.product_details_by_type.add_type === 'both'
            "
          >
            <div class="value">
              <span class="product-counter-number">
                {{ mySelectedOption }}</span
              >
            </div>
            <div class="actions d-flex flex-column">
              <button class="product-counter-btn" @click="incrementQuantity">
                <b-icon-plus />
              </button>
              <button class="product-counter-btn" @click="decrementQuantity">
                <b-icon-dash />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="product-actions short-links mb-2 mr-1">
        <button
          class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0 loged-in btn-block"
          v-if="
            (myProduct.product_details_by_type.add_type === 'rfq' ||
              myProduct.product_details_by_type.add_type === 'both') &&
            buyerUserData
          "
        >
          <div>
            <button
              id="show-btn"
              class="btn btn-loght border-0 outline-none shadow-none d-block add-cart w-100"
              @click="$bvModal.show('bv-bidRequest')"
            >
              <!-- <span role="button" @click="loggedBidRequest"> -->
              {{ $t("singleProduct.bidRequest") }}
              <font-awesome-icon icon="fa-solid fa-list" />
            </button>
          </div>
        </button>
        <button
          @click="loginFirst"
          class="btn btn-loght border-0 outline-none shadow-none d-block add-cart btn-block w-100"
          v-else-if="
            (myProduct.product_details_by_type.add_type === 'rfq' ||
              myProduct.product_details_by_type.add_type === 'both') &&
            !buyerUserData
          "
        >
          {{ $t("singleProduct.bidRequest") }}
          <span>
            <font-awesome-icon icon="fa-solid fa-list" />
          </span>
        </button>
        <button
          class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0 btn-block w-100"
          v-else-if="
            myProduct.product_details_by_type.add_type === 'rfq' ||
            myProduct.product_details_by_type.add_type === 'both'
          "
        >
          <!-- <router-link to="/b2b-login"> -->
          {{ $t("singleProduct.bidRequest") }}
          <span>
            <font-awesome-icon icon="fa-solid fa-list" />
          </span>
          <!-- </router-link> -->
        </button>
        <!-- <button
            @click="addToWishlist(myProduct)"
            v-if="myProduct.is_favorite == false"
            class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0 d-block mt-3"
          >
            {{ $t("singleProduct.addFavorites") }}
            <span>
              <font-awesome-icon icon="fa-solid fa-heart" />
            </span>
          </button>
          <div v-else class="font-weight-bold mt-3">
            <span class="text-danger">
              <font-awesome-icon icon="fa-solid fa-heart " />
            </span>
          </div> -->
        <!-- <button class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0" >
            {{ $t("singleProduct.addPurchase") }}
            <span>
              <font-awesome-icon icon="fa-solid fa-repeat" />
            </span>
          </button> -->
      </div>
      <hr />
      <div class="share-social d-flex align-items-center">
        <span>{{ $t("singleProduct.sharing") }}</span>
        <!-- <div class="social-sharing-icons">
          <a href="#">
            <font-awesome-icon icon="fa-brands fa-facebook-f" />
          </a>
          <a href="#">
            <font-awesome-icon icon="fa-brands fa-whatsapp" />
          </a>
          <a href="#">
            <font-awesome-icon icon="fa-brands fa-twitter" />
          </a>
        </div> -->
        <div class="social-sharing-icons">
          <facebook :url="url" scale="2"></facebook>
          <twitter :url="url" title="Check me on Github" scale="2"></twitter>
          <whats-app :url="url" title="Hello" scale="2"></whats-app>
          <!-- <linkedin :url="url" scale="3"></linkedin> -->
          <!-- <telegram :url="url" scale="3"></telegram> -->
          <!-- <pinterest :url="url" scale="3"></pinterest>
          <reddit :url="url" scale="3" title="My Github"></reddit>
          <google :url="url" scale="3"></google>
          <email :url="url" subject="Hello" scale="3"></email> -->
        </div>
      </div>
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
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);
import suppliers from "@/services/suppliers";
// import { mapActions } from "vuex";
import { BIconPlus, BIconDash } from "bootstrap-vue";
// import modal from "@/components/cart/cartModal.vue";
import globalAxios from "@/services/global-axios";
// import CartModal from "@/components/cart/cartModal.vue"

import categories from "@/services/categories";
import profile from "@/services/profile";
import {
  Facebook,
  Twitter,
  WhatsApp,
  // Linkedin,
  // Pinterest,
  // Reddit,
  // Telegram,
  // Email,
  // Google,
} from "vue-socialmedia-share";
export default {
  components: {
    BIconPlus,
    BIconDash,
    Facebook,
    Twitter,
    WhatsApp,
    // Linkedin,
    // Pinterest,
    // Reddit,
    // Telegram,
    // Email,
    // Google,
    // modal,
  },
  props: ["myProduct"],
  methods: {
    // ...mapActions("cart", ["cart/addProductToCart"]),
    addToCart(myProduct) {
      let data = {
        product_supplier_id:
          myProduct.product_details_by_type.product_supplier_id,
        quantity: this.mySelectedOption !== null ? this.mySelectedOption : 1,
      };
      // this.$store
      //   .dispatch("cart/addProductToCart", {
      //     product: item,
      //     quantity: this.cartCounter !== null ? this.cartCounter : 1,
      //   })
      //   .then((res) => {
      //     if (res.status == 200) {
      //       this.$modal.show(
      //         () => import("@/components/cart/cartModal.vue"),
      //         {
      //           product: item,
      //         },
      //         { width: "700", height: "auto", adaptive: true }
      //       );
      //     }
      //   });

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
    loggedBidRequest() {
      this.sucessMsg("request sent");
    },
    selectedOption(option) {
      this.mySelectedOption = option;
    },
    incrementQuantity() {
      this.mySelectedOption += 1;
    },
    decrementQuantity() {
      this.mySelectedOption > 1 ? this.mySelectedOption-- : null;
    },
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },
    addToWishlist(item) {
      let data = {
        product_supplier_id: item.product_details_by_type.product_supplier_id,
      };
      // this.addProductToWishlist({
      //   product: this.product,
      // });

      return globalAxios
        .post(`members/profile/favorite`, data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
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
    productDetails() {
      this.loading = true;
      categories
        .productDetails(this.id)
        .then((res) => {
          console.log("productDetails", res);
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
          }
        })
        .catch((error) => {
          let err = Object.values(error)[2].data;
          this.errors = err.items;
          console.log(error);
        });
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
      mySelectedOption: 1,
      showModal: false,
      suppliers: null,
      message: null,
      subject: null,
      // url: this.mainDoamin
    };
  },
  computed: {
    url() {
      return this.mainDoamin + `details?id=${this.id}`;
    },
  },
};
</script>
<style lang="scss" scoped>
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
          width: 6rem;
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
          //   background: #ff6000;
          //   border-color: #ff6000;
          //   color: #fff;
          // }
        }
        span.active {
          background: #ff6000;
          border-color: #ff6000;
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
            color: #ed2124;
          }
          span {
            margin-inline-start: 0.25rem;
          }
        }
      }
      .add-cart {
        border-radius: 0;
        font-size: 16px;
        background: #36363b;
        color: #fff;
        padding: 12px 16px;
        height: fit-content;
        -webkit-margin-end: 0.5rem;
        margin-inline-end: 0;
        display: block;
        text-align: center;
        width: 100%;

        &:hover {
          background: #ed2124;
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
            color: #ed2124;
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
    border: 1px solid #f0f0f0;
    color: #544842;
    font-weight: 500;
    width: 6rem;
    height: 3.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
}
.cart-btn {
  background: #ff6000 !important;
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
  box-shadow: 0px 0px 9px 0px #cccccccf;
  padding: 17px 17px;
  .header {
    color: #312620;
  }
  .add-to {
    color: #000;
    a {
      background: #fff;
      color: #312620;
      box-shadow: 0px 1px 5px 0px rgb(0 0 0 / 10%);
      padding: 1rem 2rem;
      border-radius: 0.2rem;
      margin: 0 0.3rem;
      &:hover {
        color: #ed2124;
      }
      span {
        margin-inline-end: 0.5rem;
      }
    }
  }
}
// @media screen and (max-width:1900px){
//   .product-counter .value{

//     font-weight: 500;
//     width: 4rem;

//   }
//   .add-cart{
//     padding: 12px 10px !important;
//   }
// }
</style>
