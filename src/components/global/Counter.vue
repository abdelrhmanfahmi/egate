<template>
  <div class="product-counter">
    <div class="value">
      <main>
        <slot name="main">
          <span class="product-counter-number"> {{ countValue }}</span>
        </slot>
      </main>
    </div>
    <div class="actions d-flex flex-column">
      <button class="product-counter-btn" @click="incrementQuantity">
        <b-icon-plus />
      </button>
      <button class="product-counter-btn" @click="decrementQuantity">
        <b-icon-dash />
      </button>
    </div>
  </div>
</template>
<script>
import { BIconPlus, BIconDash } from "bootstrap-vue";

export default {
  // name: "CCounter",
  components: {
    BIconPlus,
    BIconDash,
  },
  data() {
    return {
      countValue: 1,
    };
  },
  props: {
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    product: {
      type: Object,
    },
    minimum:{
      type:Number,
      required:true,
      default: 1,
    }
  },
  mounted() {
    this.countValue = this.quantity;
  },
  methods: {
    incrementQuantity() {
      this.countValue += 1;

      let data = {
        quantity: this.countValue,
        uuid: this.product.uuid,
      };
      this.$store.dispatch("cart/updateProductFromCart", data);
      setTimeout(() => {
        this.$store.dispatch("cart/getCartProducts")
      }, 300);
      this.$emit('changeTitle',this.countValue)
    },
    decrementQuantity() {
      this.countValue > this.minimum ? this.countValue-- : null;

      let data = {
        quantity: this.countValue,
        uuid: this.product.uuid,
      };

      this.$store.dispatch("cart/updateProductFromCart", data);
      setTimeout(() => {
        this.$store.dispatch("cart/getCartProducts");
      }, 300);
      this.$emit('changeTitle',this.countValue)
    },
  },
};
</script>

<style lang="scss" scoped>
.product-counter {
  display: flex;
  align-items: center;
  justify-content: left;
  .actions {
    color: #606266;
    .product-counter-btn {
      width: 2rem;
      height: 1.75rem;
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
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
}
</style>
