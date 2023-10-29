<template>
  <div class="cart-wrapper" v-if="cartItems">

    <v-table class="styleCart">
      <thead>
        <tr>
          <th class="text-center">PRODUCT</th>
          <th class="text-center">PRICE</th>
          <th class="text-center">QUANTITY</th>
          <th class="text-center">SUBTOTAL</th>
        </tr>
      </thead>
      <tbody class="text-center border-0">
        <tr class="border-0 mb-11" v-for="(product, index) in cartItems" :key="index">
          <td class="border-0">
            <div class="productImage-actions">
              <div class="product-image">
                <div class="removeProduct" role=button @click="removeFromCart(product)">x</div>
                <Favorite :product="product" />
                <router-link :to="{ name: 'productPage', params: { id: product.product.id } }">

                  <v-img v-if="product.product.image" :src="product.product.image" :lazy-src="product.product.image"
                    width="100"></v-img>
                  <v-img v-else :src="require('@/assets/images/logo.png')" :lazy-src="product.product.image"
                    width="100"></v-img>
                </router-link>
              </div>
            </div>
          </td>
          <td class="border-0">
            <div class="product-price text-gray">{{ product.product.product_price }} EGP</div>
          </td>
          <td class="border-0 ">
            <div class="counter">
              <Counter @changValue="updateValue(product, $event)" :quantity="product.quantity" />
            </div>
          </td>
          <td class="border-0">
            <div class="total product-price text-gray">{{ product.product.product_price *
              product.quantity }} EGP</div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script>
import Counter from "./Counter.vue";
import Favorite from "@/components/shared/Products/Favorite.vue";
export default {
  props: ['cartItems'],
  data() {
    return {
      cartIdsDeleted: []
    };
  },

  components: {
    Counter,
    Favorite
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
      let cartIds = this.$store.getters['cart/cartItems'];
      cartIds.filter(el => {
        this.cartIdsDeleted.push(el.id);
      });
      this.$store.dispatch("cart/clearCartItems", this.cartIdsDeleted);
    },

    addProductToCart(product) {
      let data = {
        product: product,
        quantity: this.quantity,
      }
      this.$store.dispatch('cart/addProductToCart', data);
    },

    updateValue(product, value) {
      let dataUpdated = {
        quantity: value,
        product_id: product.id
      };

      this.$store.dispatch('cart/updateProductFromCart', dataUpdated).then(() => {
        setTimeout(() => {
          this.$store.dispatch('cart/getCartProducts');
        }, 200);
      });
    }
  }

};
</script>
<style lang="scss" scoped>
.styleCart {
  padding: 10px;
}

.productImage-actions {
  .product-image {
    position: relative;
    max-width: 60%;
    text-align: center;
    margin: auto;

    .removeProduct {
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      background: #b5140e;
      color: #fff;
      text-align: center;
      border-radius: 50%;
      line-height: 20px;
      font-size: 15px;
      cursor: pointer;
    }

    .addProductToFav {
      position: absolute;
      right: 0;
      top: 0;
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: contain;
    }
  }
}

td {
  padding-top: 15px !important;
}

.v-responsive,
.v-img {
  margin: auto !important;
}

.counter {
  display: flex;
  justify-content: center;
  align-items: center;
}

.svg-icon {
  width: 30px;

  svg {
    fill: #fff;
    width: inherit;
  }
}
</style>
