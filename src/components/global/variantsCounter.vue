<template>
  <div class="product-counter">
    <div
      class="actions d-flex justify-content-center align-items-center"
      :class="$i18n.locale"
    >
      <button class="product-counter-btn minus" @click="decrementQuantity">
        <b-icon-dash />
      </button>
      <div class="value">
        <!-- variants page counter that exist in table  -->
        <main>
          <!-- @slot Use this slot header -->
          <slot name="main">
            <input
              class="form-control text-center border-0 counter-input"
              type="number"
              name=""
              id=""
              min="1"
              @keyup="CustomIncrementQuantity"
              v-model="countValue"
            />
          </slot>
        </main>
      </div>
      <button class="product-counter-btn" @click="incrementQuantity">
        <b-icon-plus />
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
    quantity: {
      // quantity prop
      type: Number,
      required: true,
      default: 1,
    },
    minimum: {
      // minimum prop
      type: Number,
      required: true,
      default: 1,
    },
  },
  mounted() {
    /**
     * @vuese
     * set countValue = quantity;
     */
    this.countValue = this.quantity;
  },
  methods: {
    /**
     * @vuese
     * this function used to increment Quantity
     */
    incrementQuantity() {
      this.countValue = Number(this.countValue) + 1;
      this.$emit("changeCount", this.countValue);
    },
    /**
     * @vuese
     * this function used to decrement Quantity
     */
    decrementQuantity() {
      this.countValue > this.minimum ? this.countValue-- : null;
      this.$emit("changeCount", this.countValue);
    },
    /**
     * @vuese
     * custom increament for input not buttons
     */
    CustomIncrementQuantity() {
      if (this.countValue > 0) {
        this.$emit("changeCount", this.countValue);
        setTimeout(() => {
          this.$store.dispatch("cart/getCartProducts");
        }, 300);
      }
      if (this.countValue <= 0) {
        this.$emit("changeCount", 1);
        setTimeout(() => {
          this.$store.dispatch("cart/getCartProducts");
        }, 300);
      }
    },
    /**
     * @vuese
     * this function used to check if isNumber or not
     */
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
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
    border: 1px solid $top-header-color;
    color: #544842;
    font-weight: 500;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
}
</style>
