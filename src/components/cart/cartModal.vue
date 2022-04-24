<template>
  <div
    id="modal-center"
    centered
    class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
  >
    <div class="modal-content">
      <div class="header-holder">
        <!-- <div class="modal-header">Header</div> -->
        <span>{{ $t("cart.success") }}</span>
        <div class="cls-button">
          <button class="btn btn-outline-danger" @click="handleClose">x</button>
        </div>
      </div>
      <div
        class="modal-body d-flex justify-content-center align-items-center flex-column"
      >
        <h5>
          {{ $t("cart.addedToCart") }}
        </h5>
        <h2>
          {{ product.product.title }}
        </h2>
        <img
          :src="
            product.image_path ? product.image_path : product.product.image_path
          "
          alt="product-image"
        />
        <div class="mt-2">
          <span class="h5">
            {{ $t("cart.cartCount") }}
            <router-link to="/cart"> {{ cartItemsLength }} items </router-link>
            {{ $t("cart.cartInCart") }}
          </span>
        </div>
        <h5>{{ $t("cart.cartSubTotal") }} : {{ cart_sub_total }}</h5>
      </div>
      <div
        class="modal-footer d-flex justify-content-center align-items-center"
      >
        <button class="btn event-btn continue-shopping" @click="handleClose">
          {{ $t("cart.contShopping") }}
        </button>
        <button class="btn event-btn view-cart">
          <router-link to="/cart"> {{ $t("cart.viewCart") }} </router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data: function () {
    return {
      dataObj: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    handleSave() {
      console.log(this.dataObj);
      this.handleClose();
    },
    handleClose() {
      this.$emit("close");
    },
  },
  props: ["product"],
  computed: {
    cartItems() {
      return this.$store.state.cart.cartItems;
    },
    cartItemsLength() {
      return this.cartItems.length;
    },
    cart_sub_total() {
      return this.$store.state.cart.cart_sub_total;
    },
  },
  mounted() {
    console.log(this.product);
  },
};
</script>
<style lang="scss" scoped>
.header-holder {
  position: relative;
  background: #f57b21;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 10px;
  font-size: 19px;
  .cls-button {
    position: absolute;
    right: 4px;
    padding: 0 5px !important;
    button {
      background: #fff;
    }
  }
  .btn-outline-danger:hover {
    color: #dc3545;
  }
}
.event-btn {
  background: #f57b21;
  color: #fff;
  padding: 5px 10px;
  text-transform: uppercase;
  letter-spacing: 3px;
  a {
    color: inherit;
    &:hover {
      text-decoration: none;
      color: inherit;
    }
  }
}
</style>
