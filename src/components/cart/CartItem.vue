<template>
  <div class="action-holder mb-2">
    <div
      class="d-flex justify-content-center align-items-center"
      v-if="loading"
    >
      <img src="@/assets/images/Loader.gif" alt="cart-image" class="w-25" />
    </div>
    <div class="" v-else>
      <div
        class="d-flex cart-item"
        v-for="product in products.products"
        :key="product.id"
      >
        <a @click="goProduct(product.product_supplier_id)" class="product-img-container">
          <img
            :src="product.product_image"
            alt="Cart Item"
            class="product-image"
          />
        </a>
        <div class="product-info w-100">
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
        <!-- <div class="product-info w-100" v-else>
          <router-link
            class="name"
            :to="{
              path: '/details',
              query: { id: `${product.product_supplier_id}` },
            }"
          >
            {{ product.product_name }}
          </router-link>

          <span class="price">
            {{ product.price }} x
            <b class="text-success">{{ product.quantity }} </b>
          </span>
        </div> -->
        <div class="total mr-2">
          {{ product.product_sub_total | fixedCurrency }} {{ currency }}
        </div>
        <div class="actions mr-2" @click="removeFromCart(product)">
          <span class="action-icon">
            <b-icon-trash></b-icon-trash>
          </span>
        </div>
        <!-- <ul>
        <li v-for="product in products" :key="product.id">
          product.supplier_name : {{ product.product_name }}
        </li>
        <li>
          {{ products.supplier_name }}
          {{ products.supplier_sub_total }}
          {{ products.products[0].product_name }}
        </li>
      </ul> -->
      </div>
    </div>
  </div>
</template>
<script>
import { BIconTrash } from "bootstrap-vue";
// import { mapActions } from "vuex";
export default {
  data() {
    return { count: 0, loading: false };
  },
  components: {
    BIconTrash,
  },
  props: ["products"],
  methods: {
    // ...mapActions("cart", ["removeProductFromCart"]),
    removeFromCart(product) {
      // this.removeProductFromCart({
      //   product: product,
      // });
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
    goProduct(product) {
      this.$router.push({
        path: "/details",
        query: { id: product },
      });
      window.location.reload()
    },
  },
};
</script>
<style lang="scss" scoped>
.action-holder {
  max-height: 400px;
  overflow-y: scroll;
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

.product-img-container{
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
</style>
