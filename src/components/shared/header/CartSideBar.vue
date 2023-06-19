<template>
  <span class="iconHolder cart" role="button" @click.stop="sideVisible = !sideVisible">
    <v-badge :content="cartItemCount" color="error">
      <v-icon icon="mdi-cart-outline"></v-icon>
    </v-badge>
  </span>
  <div class="sideCartHolder">
    <div class="shadedMenu" @click.stop="sideVisible = !sideVisible" v-show="sideVisible"></div>
    <div class="closeMenuX" role="button" v-if="sideVisible" @click.stop="sideVisible = !sideVisible">
      x
    </div>
    <div class="cartSideMenu" :class="{ sideOpened: sideVisible, sideClosed: !sideVisible }">
      <div class="text-center my-8">
        <h4>{{ $t("cart.shopping") }}</h4>
      </div>
      <div class="floatingAction" v-if="cartItemCount">
        <p class="text-gray" role="button" @click="removeAll">remove all</p>
      </div>

      <!-- cartItems: {{ cartItems }} -->
      <section class="products" v-if="cartItemCount">
        <div class="product mb-4" v-for="(product, index) in cartItems" :key="index">
          <v-row justify="center" align="center">
            <v-col cols="12" lg="8" md="8" sm="12">
              <router-link :to="{ name: 'productPage', params: { id: product.product.id } }">

                <div class="productInfo">
                  <p class="productName">{{ product.name }}</p>
                  <p class="text-gray product-q-p">
                    <span class="product-quantity">{{ product.quantity }} </span>
                    <span> X </span>
                    <span class="product-price text-gray-dark">{{
                      product.formatted_price
                    }}</span>
                  </p>
                </div>
              </router-link>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12">
              <div class="productInfo">
                <div class="product-image">
                  <router-link :to="{ name: 'productPage', params: { id: product.product.id } }">

                    <img :src="product.product.images[0].url" class="product-image" alt="product-image"
                      :srcset="product.product.images[0].url">
                  </router-link>
                </div>
              </div>
            </v-col>
          </v-row>
          <div class="removeProduct" @click="removeFromCart(product)">x</div>
        </div>
      </section>
      <section class="products d-flex aligned-row justify-center flex-column h-50  " v-else>
        <EmptyCart />
      </section>
      <hr />
      <div class="total mt-5 text-center" v-if="cart_sub_total">
        <v-row>
          <v-col cols="12" lg="6" md="6" sm="12">
            <p>Subtotal</p>
          </v-col>
          <v-col cols="12" lg="6" md="6" sm="12">
            <p class="product-price">{{ cart_sub_total }}</p>
          </v-col>
        </v-row>
      </div>
      <div class="actions mt-5 text-center">
        <v-row class="flex-column">
          <v-col cols="12">
            <v-btn class="bg-main d-flex checkout text-white" block to="/checkout"
              @click.stop="sideVisible = !sideVisible">Proceed To Shipping Address</v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn class="bg-light text-gray d-flex shadow-0 viewCart" block to="/cart"
              @click.stop="sideVisible = !sideVisible">View Cart</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import myMixin from "@/mixins.js";
import EmptyCart from "@/components/shared/Checkout/EmptyCart.vue"
export default {
  mixins: [myMixin],
  data() {
    return {
      sideVisible: false,
    };
  },
  computed: {
    ...mapGetters({ cartItems: "cart/cartItems" }),
    ...mapGetters({ cart_sub_total: "cart/cart_sub_total" }),
    ...mapGetters({ cartItemCount: "cart/cartItemCount" }),
  },
  methods: {
    removeFromCart(product) {
      let payload = {
        product: product,
        message: this.$t('cart.removedFromCart')
      }
      this.$store.dispatch("cart/removeProductFromCart", payload)
    },
    removeAll() {
      this.$store.dispatch("cart/clearCartItems")
    }
  },
  components:{
    EmptyCart
  }
};
</script>

<style lang="scss" scoped>
.sideCartHolder,
.shadedMenu,
.cartSideMenu {
  transition: all 0.3s ease-in-out;
  position: relative;

  .floatingAction {
    position: absolute;
    top: 46px;
    right: 5px;
  }
}

.closeMenuX {
  position: fixed;
  top: 46px;
  right: 360px;
  color: #fff;
  font-size: 25px;
  z-index: 100;
}

.cartSideMenu {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 350px;
  background: #fff;
  z-index: 99;
  padding: 15px;
  overflow-y: scroll;
}

.shadedMenu {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 90;
}

.sideOpened {
  opacity: 1;

  transform: translateX(0);
}

.sideClosed {
  opacity: 0;

  transform: translateX(100%);
}

.products {
  .product {
    border: 1px solid #a3a3a1;
    border-radius: 16px;
    padding: 15px;
    position: relative;

    .removeProduct {
      position: absolute;
      top: -10px;
      right: -5px;
      width: 29px;
      height: 29px;
      background: #b5140e;
      color: #fff;
      text-align: center;
      border-radius: 50%;
      line-height: 29px;
      font-size: 20px;
      cursor: pointer;
    }
  }
}

.actions {

  button,
  a {
    box-shadow: none !important;
    padding: 20px !important;
  }

  .viewCart {
    border: 1px solid $gray;
  }
}

.product-image {
  max-width: 100%;
  max-height: 1;
  height: 75px;
  object-fit: cover;
}
</style>
