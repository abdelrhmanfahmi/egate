<template>
  <div class="cart-wrapper" v-if="cartItems">

    <v-table>
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

                  <v-img v-if="product.product.images[0].url" :src="product.product.images[0].url"
                    :lazy-src="product.product.images[0].url" width="100"></v-img>
                </router-link>
              </div>
            </div>
          </td>
          <td class="border-0">
            <div class="product-price text-gray">{{ product.price }} Le</div>
          </td>
          <td class="border-0 ">
            <div class="counter">
              <Counter @changValue="updateValue(product, $event)" :quantity="product.quantity" />
            </div>
          </td>
          <td class="border-0">
            <div class="total product-price text-gray">{{ product.total }} Le</div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script>
import Counter from "./Counter.vue"
import { mapGetters } from "vuex";
import Favorite from "@/components/shared/Products/Favorite.vue"
export default {
  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          name: "Eclair",
          calories: 262,
        },
        {
          name: "Cupcake",
          calories: 305,
        },
        {
          name: "Gingerbread",
          calories: 356,
        },
        {
          name: "Jelly bean",
          calories: 375,
        },
        {
          name: "Lollipop",
          calories: 392,
        },
        {
          name: "Honeycomb",
          calories: 408,
        },
        {
          name: "Donut",
          calories: 452,
        },
        {
          name: "KitKat",
          calories: 518,
        },
      ],
      totalPrice: 550,
      productPrice: 550
    };
  },
  components: {
    Counter,
    Favorite
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
    },
    addProductToCart(product) {
      let data = {
        product: product,
        quantity: this.quantity,
      }
      this.$store.dispatch('cart/addProductToCart', data)
    },
    

    updateValue(product, value) {
      let qty = {
        qty: {
          [product.id]: value
        }
      };

      this.$store.dispatch('cart/updateProductFromCart', qty).then(() => {
        setTimeout(() => {
          this.$store.dispatch('cart/getCartProducts')
        }, 200);
      })

    }
  },
};
</script>
<style lang="scss" scoped>
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
