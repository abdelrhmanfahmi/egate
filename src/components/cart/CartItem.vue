<template>
  <div>
    <div
      class="d-flex cart-item"
      v-for="product in products.products"
      :key="product.id"
    >
      <router-link
        :to="{ path: '/details', query: { id: `${product.id}` } }"
        class="thumb"
      >
        <img
          :src="product.product_image"
          alt="Cart Item"
          class="product-image"
        />
      </router-link>
      <div class="product-info w-100">
        <router-link class="name"
          :to="{ path: '/details', query: { id: `${product.id}` } }"
         
        >
          {{ product.product_name }}
        </router-link>

        <span class="price">
          {{ product.price }} x <b class="text-success">{{ product.quantity }}</b>
        </span>
      </div>
      <div class="total mr-2">
        {{ products.supplier_sub_total }}
      </div>
      <div class="actions">
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
</template>
<script>
import { BIconTrash } from "bootstrap-vue";
export default {
  data() {
    return { count: 0 };
  },
  components: {
    BIconTrash,
  },
  props: ["products"],
};
</script>
<style lang="scss" scoped>
.cart-item {
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  .thumb {
    width: 100px;
    margin-inline-end: 0.8rem;
  }
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
.product-image {
  width: 100px;
  height: 75px;
}
</style>
