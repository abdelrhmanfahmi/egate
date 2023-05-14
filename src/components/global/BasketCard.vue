<template>
  <div class="product-cart slide-holder">
    <!-- <small
      class="ribbon ribbon-top-left"
      :class="{ 'long-rebbon': dealType.trim().length > 20 }"
      v-if="dealType"
      ><span :class="{ 'long-rebbon-span': dealType.trim().length > 20 }">{{
        dealType
      }}</span></small
    > -->
    <div
      class="row"
      :class="{
        'text-left': $i18n.locale == 'en',
        'text-right': $i18n.locale == 'ar',
      }"
    >
      <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12">
        <div class="time-holder" v-if="slider.image_path !== null">
          <!-- <router-link
          class="img-holder"
          :to="{ path: '/basketOfferDetails', query: { id: `${slider.id}` } }"
          v-if="slider.image_path && dealType"
        >
          <b-img :src="slider.image_path"> </b-img>
        </router-link>
        <router-link
          class="img-holder"
          :to="{ path: '/basketOfferDetails', query: { id: `${slider.id}` } }"
          v-else-if="slider.image_path && !dealType"
        >
          <b-img :src="slider.image_path"> </b-img>
        </router-link>
        <span v-else class="null-img-holder"></span> -->
          <b-img :src="slider.image_path" class="offer-image w-100"> </b-img>
          <div class="time-count" v-if="dealType">
            {{ dealType }}
          </div>
        </div>
      </div>
      <div
        class="col-xl-6 col-lg-12 col-md-12 col-sm-12 d-flex flex-column align-items-start justify-content-between"
      >
        <div v-if="slider">
          <!-- <router-link
            class="img-holder"
            :to="{ path: '/basketOfferDetails', query: { id: `${slider.id}` } }"
            v-if="slider.image_path && dealType"
          >
            <b-img :src="slider.image_path"> </b-img>
          </router-link>
          <router-link
            class="img-holder"
            :to="{ path: '/basketOfferDetails', query: { id: `${slider.id}` } }"
            v-else-if="slider.image_path && !dealType"
          >
            <b-img :src="slider.image_path"> </b-img>
          </router-link>
          <span v-else class="null-img-holder"></span> -->
          <div class="card-info">
            <h4
              class="main-header my-2"
              v-if="slider && slider.title && dealType"
            >
              <router-link
                :to="{
                  path: '/basketOfferDetails',
                  query: { id: `${slider.id}` },
                }"
              >
                {{ slider.title }}
              </router-link>
              <!-- {{ slider.title }} -->
            </h4>
            <h4
              class="main-header my-2"
              v-else-if="slider.product && slider.product.title && !dealType"
            >
              <router-link
                :to="{
                  path: '/basketOfferDetails',
                  query: { id: `${slider.id}` },
                }"
              >
                {{ slider.title }}
              </router-link>
              <!-- {{ slider.product.title }} -->
            </h4>
            <!-- <p v-if="slider.description" v-html="slider.description"></p> -->
            <h5 class="price m-0" v-if="slider && slider.basket_price">
              {{ slider.basket_price | fixedCurrency }}
              {{ currency }}
            </h5>
            <p
              class="price-after price m-0"
              v-if="
                slider &&
                slider.price_before_discount &&
                slider.price_before_discount > slider.basket_price
              "
            >
              {{ slider.price_before_discount | fixedCurrency }}
              {{ currency }}
            </p>
            <!-- <p v-else class="py-3"></p> -->
          </div>
        </div>
        <div class="row mb-3 align-items-center">
          <div class="col-12 px-1">
            <router-link
            :to="{ path: '/basketOfferDetails', query: { id: `${slider.id}` } }"
              v-if="slider"
            >
              <button class="outline-main">
                {{ $t("profile.details") }}
              </button>
            </router-link>
          </div>
          <div
            class="col-12 px-1"
            v-if="slider.in_stock == true"
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
      class="border-main main-color br-5 btn btn-block"
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
  },
  methods: {
    /**
     * @vuese
     * add To Cart function
     */
    addToCart(myProduct) {
      let data = {
        basket_promotion_id: myProduct.id,
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
          path: "/basketOfferDetails",
          query: { id: `${slider.id}` },
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
/**
    * component style 
  */
  .product-cart {
    padding: 0;
    margin: 0 10px;
    text-align: center;
    display: inline-block;
    position: relative;
    overflow: hidden;
    //background: #ebebeb52;
    min-width: 250px;
    overflow: hidden;
    a {
      display: inline-block;
      opacity: 1;
  
      border-radius: 50%;
      width: 95%;
      @media(max-width:992px){
        width:100%
      }
      &:hover {
        opacity: 0.5;
      }
      img {
        // width: 150px;
        min-width: 250px;
        height: 150px;
        border-radius: 0%;
        display: block;
        object-fit: cover;
      }
      button{
        width:100%;
        margin: 5px 0;
      }
    }
    .card-info {
      //padding: 25px;
      //background: #ebebeb52;
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
  @media (max-width:992px) {
  .slide-holder{
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
