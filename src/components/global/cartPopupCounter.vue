<template>
  <!-- cart popup counter page  -->
  <div class="product-counter CartPopupCounter">
    <div
      class="actions d-flex justify-content-center align-items-center"
      :class="$i18n.locale"
    >
      <button
        class="product-counter-btn minus"
        @click="decrementQuantity"
        :disabled="countValue <= minimum"
        :class="{ disabledBtn: countValue <= minimum }"
      >
        <b-icon-dash />
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
      <button class="product-counter-btn" @click="incrementQuantity">
        <b-icon-plus />
      </button>
    </div>
  </div>
</template>
<script>
//cart popup counter component.
import { BIconPlus, BIconDash } from "bootstrap-vue";
export default {
  name: "CartPopupCounter",
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
     * @vuese
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
     * @vuese
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
    * component style 
  */
.product-counter {
  display: flex;
  align-items: center;
  justify-content: left;
  .actions {
    height: 45px;
    input,
    button {
      height: 100% !important;
    }
    .product-counter-btn {
      width: 1rem;
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
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    height: 100%;
  }
}
</style>
