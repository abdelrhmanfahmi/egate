<template>
  <div class="product-cart">
    <div v-if="slider">
      <router-link
        class="img-holder"
        :to="{ path: '/details', query: { id: `${slider.id}` } }"
        v-if="slider.current_main_image_path"
      >
        <b-img :src="slider.current_main_image_path"> </b-img>
      </router-link>
      <span v-else class="null-img-holder"></span>
      <div class="card-info">
        <h4 class="main-header my-2" v-if="slider.product.title">
          <router-link
            :to="{ path: '/details', query: { id: `${slider.id}` } }"
          >
            {{ slider.product.title }}
          </router-link>
          <!-- {{ slider.product.title }} -->
        </h4>
        <h5
          class="price m-0"
          v-if="slider.product_details_by_type.customer_price"
        >
          {{ slider.product_details_by_type.customer_price | fixedCurrency }}
          {{ currency }}
        </h5>
        <p
          class="price-after price m-0"
          v-if="
            slider.product_details_by_type.price_before_discount &&
            slider.product_details_by_type.price_before_discount >
              slider.product_details_by_type.customer_price
          "
        >
          {{
            slider.product_details_by_type.price_before_discount | fixedCurrency
          }}
          {{ currency }}
        </p>
      </div>
      <!-- <div class="card-actions my-3">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-6 col-sm-12">
            <div class="" v-if="buyerUserData">
              <button
                id="show-btn"
                class="btn btn-loght border-0 outline-none shadow-none d-block add-cart rfqBtn"
                @click="$bvModal.show('bv-bidRequest')"
                v-b-tooltip.hover
                :title="$t('singleProduct.bidRequest')"
              >

                <rfqIcon />
              </button>
            </div>
            <div v-else>
              <button
                id="show-btn"
                class="btn btn-loght border-0 outline-none shadow-none d-block add-cart rfqBtn"
                @click="loginFirst"
                v-b-tooltip.hover
                :title="$t('singleProduct.bidRequest')"
              >

                <rfqIcon />
              </button>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <b-button
              @click="addToCart(slider)"
              class="btn btn-loght border-0 outline-none shadow-none d-block add-cart cart-btn btn-block new"
              v-if="
                slider.product_details_by_type.add_type === 'cart' ||
                slider.product_details_by_type.add_type === 'both'
              "
            >
              <span>
                <font-awesome-icon icon="fa-sharp fa-solid fa-cart-plus" />
              </span>
            </b-button>
          </div>
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
      </b-modal> -->
    </div>
  </div>
</template>

<script>
import globalAxios from "@/services/global-axios";
import suppliers from "@/services/suppliers";
// import modal from "@/components/cart/cartModal.vue";
// import { mapActions } from "vuex";

import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);

// import rfqIcon from "@/components/global/rfqIcon.vue";
export default {
  props: ["slider"],
  methods: {
    addToCart(myProduct) {
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
    },
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
    storeProductSupplierId(product_supplier_id) {
      this.supplierProductId = product_supplier_id;
    },
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
  },
  components: {
    // rfqIcon,
  },
  data() {
    return {
      cartCounter: 1,
      requestData: {
        name: null,
        request_qty: null,
        comment: null,
      },
      errors:[]
    };
  },
};
</script>

<style lang="scss" scoped>
.product-cart {
  margin: 0 10px;
  text-align: center;
  display: inline-block;
  a {
    display: inline-block;
    opacity: 1;

    border-radius: 50%;
    &:hover {
      opacity: 0.5;
    }
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      display: block;
    }
  }
  .card-info {
    h4 {
      a {
        opacity: 1;
        color: #312620;
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
.product-silder button:not(:disabled){
  display: block !important;
}
button.new {
  background: red;
}
.rfqBtn{
  background: #000;
}
</style>
