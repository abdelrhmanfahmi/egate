<template>
  <!-- product information  -->
  <div class="product-info">
    <div class="content" v-if="myProduct">
      <div class="row">
        <div class="col-xl-7 col-ms-12">
          <h4 class="name" v-if="myProduct.product.title">
            {{ myProduct.product.title }}
          </h4>
          <div class="" v-if="myProduct.product_details_by_type">
            <p class="serial" v-if="myProduct.product_details_by_type.sku">
              SKU : {{ myProduct.product_details_by_type.sku }}
            </p>
            <!-- show price when product not rfq only  -->
            <p class="price" v-if="
              myProduct.product_details_by_type.add_type !== 'rfq'
            ">
              <span>
                {{ $t("singleProduct.price") }} :
                {{
                  myProduct.product_details_by_type.customer_price
                    | fixedCurrency
                }}
                {{ currency }}
              </span>
              <span class="price-after" v-if="
                myProduct.product_details_by_type.price_before_discount &&
                myProduct.product_details_by_type.price_before_discount >
                myProduct.product_details_by_type.customer_price
              ">
                {{
                  myProduct.product_details_by_type.price_before_discount
                    | fixedCurrency
                }}
                {{ currency }}
              </span>
            </p>
            <p>-</p>

            <hr />

            <div class="weight">
              <span class="title mr-3" v-if="myProduct.product_details_by_type.weight">
                {{ $t("singleProduct.weight") }} :
              </span>

              <span>
                <div class="available-weight d-flex justify-content-end" v-if="myProduct.product_details_by_type">
                  <span v-if="myProduct.product_details_by_type.unit">{{ myProduct.product_details_by_type.weight }}
                    {{ myProduct.product_details_by_type.unit.title }}</span>
                </div>
              </span>
            </div>
          </div>
          <span class="is-available" v-if="myProduct.product_details_by_type.quantity > 0">{{
            $t("singleProduct.available")
          }} :
            <b>{{ myProduct.product_details_by_type.quantity }}</b></span>
          <span class="is-available text-danger" v-else>
            <b>{{ $t("singleProduct.outOfStock") }}</b></span>
          <hr />
          <div class="" v-if="myProduct.brand">
            <span><p>{{ $t('singleProduct.brand') }} :</p></span> <span><img v-if="myProduct.brand.image_path" :src="myProduct.brand.image_path" class="brand-image" :alt="myProduct.brand.title"></span>
            <hr />
          </div>
          <ProductDescription :myProduct="myProduct" />
          <!--  -->
          <div class="variants" v-if="myProduct.product.variants">
            <p class="sort" v-for="mytype in myProduct.product.variants" :key="mytype.id">
              <b v-if="mytype.variant.title">
                {{ mytype.variant.title }}
              </b>
            </p>
            <div class="weight" v-if="myProduct.product_details_by_type">
              <div class="available-weight d-flex justify-content-end"
                v-for="option in myProduct.product_details_by_type.options" :key="option.id">
                <span v-if="option.price" @click="selectedOption(option.price)"
                  :class="mySelectedOption == option.price ? 'active' : ''">
                  {{ option.price }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-5 col-sm-12">
          <ProductActions :myProduct="myProduct" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);


import ProductActions from "./ProductActions.vue";
import ProductDescription from "./ProductDescription.vue";

export default {
  components: {
    ProductActions,
    ProductDescription,
  },
  /**
   * @vuese
   *  pass product data as prop
   */

  props: {
    // selected Product prop
    myProduct: {
      type: Object,
      required: true,
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
        padding-inline-start: 0rem;
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
      padding: 1rem 1rem;
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
.svg-icon {
  width: 30px;

  svg {
    fill: #fff;
    width: inherit;
  }
}
.brand-image{
  width: 50px;
  height: 50px;
  object-fit: contain;
}
</style>
