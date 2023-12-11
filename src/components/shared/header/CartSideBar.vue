<template>
  <span class="iconHolder cart" role="button" @click.stop="sideVisible = !sideVisible">
    <v-badge :content="count" color="error">
      <v-icon icon="mdi-cart-outline styleCartImg"></v-icon>
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
      <div class="floatingAction" v-if="cartItems?.length > 0">
        <p class="text-gray" role="button" @click="removeAll">remove all</p>
      </div>

      <!-- cartItems: {{ cartItems }} -->
      <section class="products" v-if="cartItems?.length > 0">
        <div class="product mb-4" v-for="(product, index) in cartItems" :key="index">
          <v-row justify="center" align="center">
            <v-col cols="12" lg="8" md="8" sm="12">
              <router-link :to="{ name: 'productPage', params: { id: product.product.id } }">
                <div class="productInfo">
                  <p class="productName">{{ product.product.name }}</p>
                  <p class="text-gray product-q-p">
                    <span class="product-quantity">{{ product.quantity }} </span>
                    <span> X </span>
                    <span class="product-price text-gray-dark">{{
                      product.product.product_price
                    }} EGP</span>
                  </p>
                </div>
              </router-link>
            </v-col>
            <v-col cols="12" lg="4" md="4" sm="12">
              <div class="productInfo">
                <div class="product-image" v-if="product.product.image != null">
                  <router-link :to="{ name: 'productPage', params: { id: product.product.id } }">
                    <img :src="product.product.image" class="product-image" alt="product-image"
                      :srcset="product.product.image">
                  </router-link>
                </div>
                <div class="product-image" v-else>
                  <router-link :to="{ name: 'productPage', params: { id: product.product.id } }">
                    <img :src="require('@/assets/images/logo.png')" class="product-image" alt="product-image"
                      :srcset="require('@/assets/images/logo.png')">
                  </router-link>
                </div>
              </div>
            </v-col>
          </v-row>
          <div class="removeProduct" @click.prevent="removeFromCart(product)">x</div>
        </div>
        <hr />
        <div class="total mt-5 text-center" v-if="cartTotalPrice">
          <v-row>
            <v-col cols="12" lg="6" md="6" sm="12">
              <p>Total</p>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="12">
              <p class="product-price">{{ cartTotalPrice }} EGP</p>
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
      </section>

      <section class="products d-flex aligned-row justify-center flex-column h-50  " v-else>
        <EmptyCart :sideVisible="sideVisible" @onUpdateSideVisible="updateSideVisible" />
      </section>
    </div>
  </div>
</template>

<script>
import EmptyCart from "@/components/shared/Checkout/EmptyCart.vue"
export default {
  data() {
    return {
      sideVisible: false,
      cartItems: [],
      cartIdsDeleted: []
    };
  },

  methods: {
    removeFromCart(product) {
      let payload = {
        product: product,
        message: this.$t('cart.removedFromCart')
      }
      this.$store.dispatch("cart/removeProductFromCart", payload);
      this.sideVisible = !this.sideVisible;
    },

    removeAll() {
      let cartIds = this.$store.getters['cart/cartItems'];
      cartIds.filter(el => {
        this.cartIdsDeleted.push(el.id);
      });
      this.$store.dispatch("cart/clearCartItems", this.cartIdsDeleted);
    },

    updateSideVisible(sidebar) {
      this.sideVisible = sidebar;
    }

  },
  computed: {
    count() {
      try {
        return this.$store.getters['cart/cartItemCount'];
      } catch (e) {
        console.log(e);
      }

    },
    cartItems() {
      try {
        return this.$store.getters['cart/cartItems'];
      } catch (e) {
        console.log(e);
      }

    },
    cartTotalPrice() {
      try {
        return this.$store.getters['cart/cartTotalPrice'];
      } catch (e) {
        console.log(e);
      }
    }
  },
  watch: {
    count(newCount, oldCount) {
      console.log(`We have ${newCount} fruits now, yay!`)
    },
    cartItems(newCartItems, oldCartItems) {
      console.log(newCartItems);
    },
    cartTotalPrice(newCartTotalPrice, oldCartTotalPrice) {
      console.log(newCartTotalPrice);
    }
  },
  components: {
    EmptyCart
  }
};
</script>

<style lang="scss" scoped>
p {
  color: #000;
}

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
  right: 405px;
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
  width: 400px;
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
  color: #000;
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

@media only screen and (max-width: 600px) {
  .cartSideMenu {
    width: 345px;
  }

  .closeMenuX {
    right: 355px;
  }
  .styleCartImg{
    font-size:20px;
    position: relative;
    top:4px;
  }
}

@media only screen and (width: 360px) {
  .cartSideMenu {
    width: 335px;
  }

  .closeMenuX {
    right: 342px;
  }

  .floatingAction {
    font-size: 15px;
  }
}

@media only screen and (width: 414px) {
  .cartSideMenu {
    width: 360px;
  }

  .closeMenuX {
    right: 365px;
  }
}
</style>
