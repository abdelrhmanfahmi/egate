<template>
  <div class="d-flex cart-item">
    <a href="#" class="thumb">
      <img :src="require('@/assets/images/p1.png')" alt="Cart Item" />
    </a>
    <div class="product-info w-100">
      <a href="#" class="name">{{ $t("cart.itemName") }}</a>
      <span class="price">3.700 KD</span>
    </div>
    <div class="actions">
      <span class="action-icon">
        <b-icon-trash></b-icon-trash>
      </span>
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
</style>
