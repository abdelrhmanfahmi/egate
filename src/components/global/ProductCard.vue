<template>
  <div class="product-cart">
    <small class="cr cr-top cr-left cr-sticky cr-red" v-if="dealType">{{dealType}}</small>
    <div v-if="slider">
      <router-link
        class="img-holder"
        :to="{ path: '/details', query: { id: `${slider.id}` , type:dealType } }"
        v-if="slider.current_main_image_path && dealType"
      >
        <b-img :src="slider.current_main_image_path"> </b-img>
      </router-link>
      <router-link
        class="img-holder"
        :to="{ path: '/details', query: { id: `${slider.id}` } }"
        v-else-if="slider.current_main_image_path && !dealType "
      >
        <b-img :src="slider.current_main_image_path"> </b-img>
      </router-link>
      <span v-else class="null-img-holder"></span>
      <div class="card-info">
        
        <h4 class="main-header my-2" v-if="slider.product && slider.product.title && dealType">
          <router-link
            :to="{ path: '/details', query: { id: `${slider.id}` , type:dealType } }"
          >
            {{ slider.product.title }}
          </router-link>
          <!-- {{ slider.product.title }} -->
        </h4>
        <h4 class="main-header my-2" v-else-if="slider.product && slider.product.title && !dealType">
          <router-link
            :to="{ path: '/details', query: { id: `${slider.id}` } }"
          >
            {{ slider.product.title }}
          </router-link>
          <!-- {{ slider.product.title }} -->
        </h4>
        <h5
          class="price m-0"
          v-if="slider.product_details_by_type && slider.product_details_by_type.customer_price"
        >
          {{ slider.product_details_by_type.customer_price | fixedCurrency }}
          {{ currency }}
        </h5>
        <p
          class="price-after price m-0"
          v-if="slider.product_details_by_type && 
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
    </div>
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
  props:{
    slider:{
      // slider prop 
      type:Object,
      required:true
    },
    dealType:{
      type:String
    }
  },
  methods: {
     /**
     * @vuese
     * add To Cart function
     */
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
    background: #ebebeb52;
    min-width:250px;
    overflow: hidden;
  a {
    display: inline-block;
    opacity: 1;

    border-radius: 50%;
    &:hover {
      opacity: 0.5;
    }
    img {
       // width: 150px;
       width: 100%;
        height: 150px;
        border-radius: 0%;
        display: block;
        object-fit: cover;
    }
  }
  .card-info {  
    padding: 25px; 
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
