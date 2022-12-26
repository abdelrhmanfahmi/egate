<template>
  <!-- cart popup counter page  -->
  <div class="product-counter CartPopupCounter">
    <div class="actions d-flex">
      <button class="product-counter-btn" @click="incrementQuantity">
        <b-icon-plus />
      </button>
      <div class="value">
        <main>
          <!-- @slot Use this slot header -->
          <slot name="main">
            <span class="product-counter-number">
              {{ quantity == 0 ? countValue : quantity }}</span
            >
          </slot>
        </main>
      </div>
      <button class="product-counter-btn" @click="decrementQuantity">
        <b-icon-dash />
      </button>
    </div>
  </div>
</template>
<script>
//cart popup counter component.
import { BIconPlus, BIconDash } from "bootstrap-vue";
export default {
  name:'CartPopupCounter',
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
    /**
     * quantity
     */
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    /**
     * product
     */
    product: {
      type: Object,
    },
    /**
     * minimum
     */
    minimum: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  mounted() {
    /**
     * set countValue = quantity
     */
    this.countValue = this.quantity;
  },
  methods: {
    /**
     * increament function
     */
    incrementQuantity() {
      this.countValue = Number(this.quantity) + 1;

      let data = {
        quantity: this.countValue,
        uuid: this.product.uuid,
      };
      this.$store.dispatch("cart/updateProductFromCart", data);
      setTimeout(() => {
        this.$store.dispatch("cart/getCartProducts");
        // this event affected on the component main page
        this.$emit("changeTitle", this.countValue);
        // this.quantity = this.countValue;
      }, 300);
      // this.$emit('changeTitle',this.countValue)
    },
    /**
     * decreament function
     */
    decrementQuantity() {
      this.countValue > this.minimum ? this.countValue-- : null;

      let data = {
        quantity: this.countValue,
        uuid: this.product.uuid,
      };

      // this.$emit('changeTitle',this.countValue)
      this.$store.dispatch("cart/updateProductFromCart", data);
      setTimeout(() => {
        this.$store.dispatch("cart/getCartProducts");
        this.$emit("changeTitle", this.countValue);
        // this.quantity = this.countValue;
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
/**
    * page style  
  */
.product-counter {
  display: flex;
  align-items: center;
  justify-content: left;

  .actions {
    color: #606266;

    .product-counter-btn {
      width: 2rem;
      height: 1.75rem;
      border-radius: 50%;
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
    border-radius: 50%;
    border: none;
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

.product-counter .value {
  width: 1.5rem !important;
  height: 1.5rem !important;
}

.product-counter .actions .product-counter-btn {
  width: 1.5rem !important;
  height: 1.5rem !important;
}
</style>
