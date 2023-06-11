<template>
  <div class="product-cart slide-holder">
    <div
      class="row"
      :class="{
        'text-left': $i18n.locale == 'en',
        'text-right': $i18n.locale == 'ar',
      }"
    >
      <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12">
        <div class="time-holder" v-if="slider.current_main_image_path !== null">
          <b-img
            :src="slider.current_main_image_path"
            class="offer-image w-100"
          >
          </b-img>
          <div class="time-count" v-if="dealType">
            {{ dealType }}
          </div>
        </div>
      </div>
      <div
        class="col-xl-6 col-lg-12 col-md-12 col-sm-12 d-flex flex-column align-items-start justify-content-between"
      >
        <div v-if="slider">
          <div class="card-info">
            <h4
              class="main-header my-2"
              v-if="slider.product && slider.product.title && dealType"
            >
              <router-link
                :to="{
                  path: '/details',
                  query: { id: `${slider.id}`, type: dealType },
                }"
              >
                {{ slider.product.title }}
              </router-link>
            </h4>
            <h4
              class="main-header my-2"
              v-else-if="slider.product && slider.product.title && !dealType"
            >
              <router-link
                :to="{ path: '/details', query: { id: `${slider.id}` } }"
              >
                {{ slider.product.title }}
              </router-link>
            </h4>
            <h5
              class="price m-0"
              v-if="
                slider.product_details_by_type &&
                slider.product_details_by_type.customer_price
              "
            >
              {{
                slider.product_details_by_type.customer_price | fixedCurrency
              }}
              {{ currency }}
            </h5>
            <p
              class="price-after price m-0"
              v-if="
                slider.product_details_by_type &&
                slider.product_details_by_type.price_before_discount &&
                slider.product_details_by_type.price_before_discount >
                  slider.product_details_by_type.customer_price
              "
            >
              {{
                slider.product_details_by_type.price_before_discount
                  | fixedCurrency
              }}
              {{ currency }}
            </p>
          </div>
        </div>
        <div class="row mb-3 align-items-center">
          <div class="col-12 px-1">
            <router-link
              :to="{
                path: '/details',
                query: { id: `${slider.id}`, type: dealType },
              }"
              v-if="slider"
            >
              <button class="outline-main">
                {{ $t("profile.details") }}
              </button>
            </router-link>
          </div>
          <div
            class="col-12 px-1"
            v-if="
              (add_to_cart == true &&
                slider.product_details_by_type.add_type === 'cart') ||
              (add_to_cart == true &&
                slider.product_details_by_type.add_type === 'both')
            "
          >
            <a>
              <button class="bg-main text-white" @click="addToCart(slider)">
                {{ $t("items.addToCart") }}
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>

    <button
      class="border-main main-color br-5 btn btn-block mt-2"
      v-if="buttonTrue == true"
      @click="getOffer(slider)"
    >
      {{ $t("singleProduct.getOffer") }}
    </button>
  </div>
</template>

<script>
import globalAxios from "@/services/global-axios";
import suppliers from "@/services/suppliers";

/**
 * import VueSweetalert2 for popups
 */

import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);
export default {
  /**
   * props
   */
  props: {
    slider: {
      // slider prop
      type: Object,
      required: true,
    },
    dealType: {
      type: String,
    },
    buttonTrue: {
      type: Boolean,
    },
    sort: {
      type: String,
    },
  },
  methods: {
    /**
     * @vuese
     * add To Cart function
     */

    addToCart(myProduct) {
      if (this.sort == "buyXgetY") {
        let data = {
          product_supplier_id:
            myProduct.product_details_by_type.product_supplier_id,
          quantity: this.selected > 0 ? this.selected : 1,
          buy_get_promotion_id:myProduct.buy_get_promotion_running_by_type.buy_get_promotion_id
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
      } else if (this.sort == "buXGetGift") {
        let data = {
          product_supplier_id:
            myProduct.product_details_by_type.product_supplier_id,
          quantity: myProduct.buy_gift_promotions_running_by_type.buy_x ? myProduct.buy_gift_promotions_running_by_type.buy_x : 1,
          buy_product_supplier_id:myProduct.buy_gift_promotions_running_by_type
                  .buy_product_supplier_id
             
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
      } else {
        let data = {
          product_supplier_id:
            myProduct.product_details_by_type.product_supplier_id,
          quantity: this.selected > 0 ? this.selected : 1,
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
      }
    },
    /**
     * @vuese
     * request for Quotation function
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
    storeProductSupplierId(product_supplier_id) {
      this.supplierProductId = product_supplier_id;
    },
    /**
     * @vuese
     * login first if not logged in function
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
    getOffer(slider) {
      this.$router.push(
        {
          path: "/details",
          query: { id: `${slider.id}`, type: this.dealType },
        },
        () => {
          this.$router.go(0);
        }
      );
    },
  },
  data() {
    return {
      cartCounter: 1,
      requestData: {
        name: null,
        request_qty: null,
        comment: null,
      },
      errors: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.product-cart {
  padding: 0;
  margin: 0 10px;
  text-align: center;
  display: inline-block;
  position: relative;
  overflow: hidden;
  min-width: 250px;
  overflow: hidden;
  a {
    display: inline-block;
    opacity: 1;

    border-radius: 50%;
    width: 95%;
    @media (max-width: 992px) {
      width: 100%;
    }
    &:hover {
      opacity: 0.5;
    }
    img {
      min-width: 250px;
      height: 150px;
      border-radius: 0%;
      display: block;
      object-fit: cover;
    }
    button {
      width: 100%;
      margin: 5px 0;
    }
  }
  .card-info {
    margin: auto;
    margin-bottom: 10px;
    text-align: start;
    min-height: 100px;
    h4 {
      a {
        opacity: 1;
        color: #312620;
        font-size: 18px;
        &:hover {
          color: #2b96cc;
        }
      }
    }
  }
  .null-img-holder {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: block;
  }
}
.product-silder button:not(:disabled) {
  display: block !important;
}
button.new {
  background: $main-color;
}
.rfqBtn {
  background: #000;
}

.offer-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
}

.slide-holder {
  background-color: #eff0f0;
  border-radius: 10px;
  padding: 15px;
  width: 95% !important;
}
@media (max-width: 992px) {
  .slide-holder {
    width: 100% !important;
  }
}

button {
  border-radius: 8px;
  padding: 10px 20px;
  border: none;
  box-shadow: none;
  outline: none;
}

.outline-main {
  border: 2px solid $main-color;
  background: transparent;
  color: $main-color;
}

.supplier-name {
  text-decoration: underline !important;
  color: inherit;
}

.time-holder {
  position: relative;
  text-align: center;
  padding: 0 5px;
}

.time-count {
  position: absolute;
  top: 0;
  left: 10px;
  font-size: 14px;
  background: $main-color;
  border-radius: 0 0 20px 20px;
  color: #fff;
  right: 10px;
  padding: 0 5px;
}

.row {
  @media (max-width: 1200px) {
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
  }
}
</style>
