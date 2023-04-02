<template>
  <div class="action-holder mb-2">
    <!-- if cart items data  -->
    <div
      class="d-flex justify-content-center align-items-center"
      v-if="loading"
    >
      <img
        src="@/assets/images/BeanLoading2.gif"
        alt="cart-image"
        class="w-25"
      />
    </div>
    <!-- else  -->
    <div class="" v-else>
      <div
        class="cart-item"
        v-for="product in products.products"
        :key="product.id"
      >
        <div class="row">
          <div class="col-md-8 col-sm-12 mb-3">
            <div class="d-flex justify-content-start align-items-center">
              <a @click="goProduct(product)" class="product-img-container ">
                <img
                  :src="product.product_image"
                  alt="Cart Item"
                  class="product-image"
                  v-if="product.product_image"
                />
                <img
                  v-else-if="product.basket_image"
                  :src="product.basket_image"
                  alt="Cart Item"
                  class="product-image"
                />
              </a>
              <div class="product-info">
                <a @click="goProduct(product)" class="name">
                  <span v-if="product.product_name">{{
                    product.product_name
                  }}</span>
                  <span v-else-if="product.basket_name">{{
                    product.basket_name
                  }}</span>
                </a>
                <Counter
                  :minimum="
                    product.min_order_quantity ? product.min_order_quantity : 1
                  "
                  :quantity="product.quantity"
                  :product="product"
                  class="justify-content-center"
                  v-if="!product.gift_promotion_id"
                ></Counter>

                <span
                  class="text-danger font-weight-bold"
                  v-if="product.gift_promotion_id"
                  >{{ product.quantity }}</span
                >
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-12">

            <div class="total mx-1 text-center">
              <!-- <span class="price" v-if="product.price || product.price >=0" >
                <span v-if="!product.gift_promotion_id">{{ product.price | fixedCurrency }}</span>
              </span>
              <span class="price" v-if="!product.gift_promotion_id"> x </span>
              <span class="price" v-if="!product.gift_promotion_id">
                <b class="text-danger font-weight-bold">{{ product.quantity }} </b>
              </span> -->
    
              <p class="product_sub_total mt-0" v-if="!product.gift_promotion_id">
                {{ product.product_sub_total | fixedCurrency }} {{ currency }}
              </p>
              <img
                src="@/assets/images/giftbox.png"
                v-if="product.gift_promotion_id"
                class="gift-product"
                alt="gift-product"
              />
              <div
                class="actions mx-1"
                @click="removeFromCart(product)"
                v-if="!product.gift_promotion_id"
              >
                <span class="action-icon">
                  <!-- <b-icon-trash></b-icon-trash> -->
                  {{ $t("items.remove") }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// This is a description of the cart items data
// import { BIconTrash } from "bootstrap-vue";
/**
 * import cart counter
 */

import Counter from "@/components/global/cartPopupCounter";
export default {
  data() {
    return { count: 0, loading: false };
  },
  components: {
    // BIconTrash,
    Counter,
  },
  /**
   * products
   * @values products
   * */
  props: {
    // products prop
    products: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removeFromCart(product) {
      this.$store.dispatch("cart/removeProductFromCart", {
        product: product,
      });
      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch("cart/getCartProducts");
      }, 500);
      setTimeout(() => {
        this.loading = false;
      }, 1200);
      return (this.$store.state.cartItems = []);
    },

    /**
     * got to product page
     */

    goProduct(product) {
      this.$router.push(
        {
          path: product.basket_promotion_id
            ? "/basketOfferDetails"
            : "/details",
          query: {
            id: product.basket_promotion_id
              ? product.basket_promotion_id
              : product.product_supplier_id,
          },
        },
        // reload after go to product page
        () => {
          this.$router.go(0);
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.action-holder {
  max-height: 430px;
  overflow-x: hidden;
  width:100%
}

.action-holder {
  scrollbar-color: transparent transparent;
  scrollbar-width: 1px;
}
.cart-item {
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  // .thumb {
  //   width: 100px;
  //   margin-inline-end: 0.8rem;
  // }
  .product-info {
    .name {
      color: #312620;
      font-size: 11pt;
      font-weight: 600;
      margin-bottom: 0.8rem;
      display: block;
      &:hover {
        color: $main-color;
      }
    }
    .price {
      color: #676565;
      font-size: 11pt;
      //margin-inline-start: 6px;
      opacity: 0.7;
    }
  }
  .actions {
    color: #000;
    .action-icon {
      font-size: 12pt;
      cursor: pointer;
    }
  }
}

.product-img-container {
  width: 90px;
  height: 45px;
  border-radius: 8px;
  box-shadow: 0 0 4px grey;
  margin-inline-end: 15px;
  margin-inline-start: 1px;
  .product-image {
    width: 100%;
    height: 70px;
    object-fit: cover;
    border-radius: 8px;
  }
}
.product_sub_total {
  font-size: 13px;
  word-break: break-word;
}
.cart-item .product-info .name {
  margin-bottom: 0.5rem;
}
</style>
