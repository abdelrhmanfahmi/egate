<template>
  <div
    id="modal-center"
    centered
    class=" modal-dialog-centered modal-dialog-scrollable"
  >
    <div class="modal-content">
      <div class="header-holder">
        <!-- <div class="modal-header">Header</div> -->
        <span>{{ $t("cart.success") }}</span>
        <div class="cls-button">
          <!-- <button class="btn btn-outline-danger" @click="handleClose">x</button> -->
          <button title="Close (Esc)" type="button" class="mfp-close btn btn-outline-danger" @click="$emit('close')">
            <span>×</span>
          </button>
        </div>
      </div>
      <div
        class="modal-body d-flex justify-content-center align-items-center flex-column"
      >
        <h5>
          {{ $t("cart.addedToCart") }}
        </h5>
        <h2 v-if="product.product">
          {{ product.product.title }}
        </h2>
        <img v-if="product.image_path"
          :src="
            product.image_path ? product.image_path : product.product.image_path
          "
          alt="product-image"
        />
        <div class="mt-2">
          <span class="h5" v-if="cart_sub_total > 0">
            {{ $t("cart.cartCount") }}
            <router-link to="/cart">
              {{ cartItemsLength }} {{ $t("cart.items") }}
            </router-link>
            {{ $t("cart.cartInCart") }}
          </span>
          <span class="h5" v-else>
            {{ $t("cart.cartCount") }}
            <router-link to="/cart"> 1 {{ $t("cart.items") }} </router-link>
            {{ $t("cart.cartInCart") }}
          </span>
        </div>
        <h5>{{ $t("cart.cartSubTotal") }} : {{ cart_sub_total  | fixedCurrency }} {{currency}}</h5>
      </div>
      <div
        class="modal-footer d-flex justify-content-center align-items-center"
      >
        <button
          class="btn dark event-btn continue-shopping"
          title="Close (Esc)" type="button" @click="$emit('close')"
        >
          {{ $t("cart.contShopping") }}
        </button>
        <button class="btn dark event-btn view-cart">
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
      // dataObj: {
      //   title: "",
      //   body: "",
      // },
    };
  },
  methods: {
    // handleSave() {
    //   console.log(this.dataObj);
    //   this.handleClose();
    // },
    // handleClose() {
    //   this.$emit("close");
    // },
  },
  props: ["product"],
  computed: {
    cartItems() {
      return this.$store.state.cart.cartItems;
    },
    cartItemsLength() {
      return this.cart_sub_total > 0 ? this.$store.state.cart.cartLength : 0;
    },
    cart_sub_total() {
      return this.$store.state.cart.cart_sub_total;
    },
  },
  mounted() {
    console.log(this.product);
  },
  watch: {
    $route: function () {
      this.$modal.hideAll();
    },
  },
};
</script>
<style lang="scss" scoped>
.header-holder {
  position: relative;
  background: $main-color;
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
  background: #000;
  color: #fff;
  padding: 5px 10px;
  text-transform: uppercase;
  letter-spacing: 3px;
  a {
    color: inherit;
    &:hover {
      text-decoration: none;
      color: #fff;
    }
  }
}

img{
  height: 400px;
}

</style>
