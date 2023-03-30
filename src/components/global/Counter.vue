<template>
  <div class="product-counter">
    
    <div class="actions d-flex justify-content-center align-items-center" :class="$i18n.locale">
      <button class="product-counter-btn" @click="incrementQuantity">
        <b-icon-plus />
      </button>
      <div class="value">
        <!-- counter that appear in tables for cart  -->
        <main>
          <!-- @slot Use this slot header -->
          <slot name="main">
            <!-- <span class="product-counter-number"> {{ countValue }}</span> -->
            <input
              class="form-control text-center border-0"
              type="text"
              name=""
              id=""
              min="1"
              @keyup="CustomIncrementQuantity"
              v-model="countValue"
            />
          </slot>
        </main>
      </div>
      <button
        class="product-counter-btn"
        @click="decrementQuantity"
        :disabled="countValue <= minimum"
        :class="{ disabledBtn: countValue <= minimum }"
      >
        <b-icon-dash />
      </button>
    </div>
  </div>
</template>
<script>
import { BIconPlus, BIconDash } from "bootstrap-vue";

export default {
  components: {
    BIconPlus,
    BIconDash,
  },
  data() {
    return {
      countValue: 1,
    };
  },
  /**
   * props
   */
  props: {
    // quantity prop
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    product: {
      // product prop
      type: Object,
      required: true,
    },
    minimum: {
      // minimum prop
      type: Number,
      required: false,
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
     * @vuese
     * this function user for increment Quantity
     */
    incrementQuantity() {
      this.countValue += 1;

      let data = {
        quantity: this.countValue,
        uuid: this.product.uuid,
      };
      this.$store.dispatch("cart/updateProductFromCart", data);
      setTimeout(() => {
        this.$store.dispatch("cart/getCartProducts");
      }, 500);
      // this.$emit('changeTitle',this.countValue)

      setTimeout(() => {
        this.$emit("changeTitle", this.countValue);
      }, 500);
    },
    /**
     * @vuese
     * this function user for decrement Quantity
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
      }, 300);

      setTimeout(() => {
        this.$emit("changeTitle", this.countValue);
      }, 500);
    },
    /**
     * @vuese
     * custom increament for input
     */
    CustomIncrementQuantity() {
      setTimeout(() => {
        if (this.countValue > 0) {
          let data = {
            quantity: this.countValue,
            uuid: this.product.uuid,
          };
          this.$store.dispatch("cart/updateProductFromCart", data);
          setTimeout(() => {
            this.$store.dispatch("cart/getCartProducts");
          }, 300);

          setTimeout(() => {
            this.$emit("changeTitle", this.countValue);
          }, 500);
        }
        if (this.countValue == 0) {
          let data = {
            quantity: 1,
            uuid: this.product.uuid,
          };
          this.$store.dispatch("cart/updateProductFromCart", data);
          setTimeout(() => {
            this.$store.dispatch("cart/getCartProducts");
          }, 300);

          setTimeout(() => {
            this.$emit("changeTitle", this.countValue);
          }, 500);
        }
      }, 500);
    },
    /**
     * @vuese
     * this function user for delay Change
     */
    delayChange() {
      let timeout = null;
      clearTimeout(timeout);
      // Make a new timeout set to go off in 800ms
      timeout = setTimeout(() => {
        this.CustomIncrementQuantity();
      }, 1500);
    },
  },
};
</script>

<style lang="scss" scoped>
/**
    * component style 
  */
  .product-counter {
    display: flex;
    align-items: center;
    justify-content: left;
    .actions {
      //color: #606266;
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
      width: 4rem;
      //height: 3.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
    }
  }
</style>
