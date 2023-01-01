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
        class="d-flex cart-item"
        v-for="product in products.products"
        :key="product.id"
      >
        <a
          @click="goProduct(product.product_supplier_id)"
          class="product-img-container w-25"
        >
          <img
            :src="product.product_image"
            alt="Cart Item"
            class="product-image"
          />
        </a>
        <div class="product-info w-50">
          <a @click="goProduct(product.product_supplier_id)" class="name">
            {{ product.product_name }}
          </a>

          <span class="price" v-if="product.price">
            {{ product.price | fixedCurrency }}
          </span>
          <span class="price"> x </span>
          <span class="price">
            <b class="text-danger font-weight-bold">{{ product.quantity }} </b>
          </span>
        </div>
        <div class="total mx-1 text-center w-50">
          <Counter
            :minimum="
              product.min_order_quantity ? product.min_order_quantity : 1
            "
            :quantity="product.quantity"
            :product="product"
            class="justify-content-center"
          ></Counter>
          <p class="product_sub_total mt-2">
            {{ product.product_sub_total | fixedCurrency }} {{ currency }}
          </p>
        </div>
        <div class="actions mx-1" @click="removeFromCart(product)">
          <span class="action-icon">
            <b-icon-trash></b-icon-trash>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

// This is a description of the cart items data
import { BIconTrash } from "bootstrap-vue";
/**
 * import cart counter
 */

import Counter from "@/components/global/cartPopupCounter";
export default {
  data() {
    return { count: 0, loading: false };
  },
  components: {
    BIconTrash,
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
      this.$router.push({
        path: "/details",
        query: { id: product },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.action-holder {
  max-height: 400px;
  overflow-y: scroll;
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
        color: #ed2124;
      }
    }
    .price {
      color: #676565;
      font-size: 11pt;
      margin-inline-start: 6px;
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
    height: 100%;
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
