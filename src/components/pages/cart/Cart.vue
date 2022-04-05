<template>
  <div class="cart">
    <h5 class="heading py-5 text-center">{{ $t("cart.purchaseCart") }}</h5>
    <div class="cart-table p-4">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>{{ $t("cart.product") }}</th>
            <th>{{ $t("cart.price") }}</th>
            <th>{{ $t("cart.quantity") }}</th>
            <th>{{ $t("cart.total") }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="supplier" v-for="(supplier, index) in cartItems" :key="index">
          <h5 class="name">
            {{ supplier.supplier_name }}
          </h5>
          <tr
            class="item-content"
            v-for="(item, index) in supplier.products"
            :key="index"
          >
            <td class="media">
              <img :src="item.product_image" :alt="item.name + ' image'" />
            </td>
            <td>
              <a href="#">
                {{ item.product_name }}
              </a>
            </td>
            <td>{{ item.price }} </td>
            <td>
              <Counter
                :quantity="item.quantity"
                class="justify-content-center"
              ></Counter>
            </td>
            <td>{{ item.price * item.quantity }}</td> 
            
            <td>
              <a href="#"> <font-awesome-icon icon="fa-solid fa-trash" /></a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="coupon my-4">
        <div class="d-flex flex-wrap align-items-center">
          <a
            type="submit"
            class="login-button dark my-2 py-3 px-4 text-white text-center w-auto"
          >
            {{ $t("cart.UpdateDelivery") }}
          </a>
          <b-button type="submit" class="login-button my-2 py-3 px-4 w-auto">
            {{ $t("cart.couponDiscount") }}
          </b-button>
          <input
            type="text"
            :placeholder="$t('cart.addCoupon')"
            class="my-2 h-100 p-4"
          />
        </div>
      </div>
    </div>
    <div class="cart-detail p-4">
      <h5 class="heading mb-3">{{ $t("cart.totalCart") }}</h5>
      <div class="data">
        <table class="w-100">
          <tbody>
            <tr>
              <th>{{ $t("cart.total") }}</th>
              <td>6.00 {{ $t("cart.priceUnit") }}</td>
            </tr>
            <tr>
              <th>{{ $t("cart.discount") }}</th>
              <td>6.00 {{ $t("cart.priceUnit") }}</td>
            </tr>
            <tr>
              <th>{{ $t("cart.delivery") }}</th>
              <td>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="freeDelivery"
                  />
                  <label class="custom-control-label" for="freeDelivery">
                    {{ $t("cart.free") }}
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{{ $t("cart.total") }}</th>
              <td>6.00 {{ $t("cart.priceUnit") }}</td>
            </tr>
          </tbody>
        </table>
        <div class="checkout d-flex">
          <a
            href="#"
            class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto"
          >
            {{ $t("cart.checkout") }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Counter from "../../global/Counter.vue";
export default {
  components: { Counter },
  data() {
    return {
      cart: [
        {
          supplier: this.$t("cart.supplier"),
          items: [
            {
              img: require("@/assets/images/p1.png"),
              name: this.$t("cart.itemName"),
              price: 3.7,
              quantity: 2,
            },
            {
              img: require("@/assets/images/p1.png"),
              name: this.$t("cart.itemName"),
              price: 3.5,
              quantity: 4,
            },
          ],
        },
        {
          supplier: this.$t("cart.supplier"),
          items: [
            {
              img: require("@/assets/images/p1.png"),
              name: this.$t("cart.itemName"),
              price: 3.7,
              quantity: 2,
            },
            {
              img: require("@/assets/images/p1.png"),
              name: this.$t("cart.itemName"),
              price: 3.5,
              quantity: 4,
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.getCartProducts();
  },
  methods: {
    getCartProducts() {
      this.$store.dispatch("cart/getCartProducts");
    },
    removeFromCart(product) {
      // this.removeProductFromCart({
      //   product: product,
      // });
      this.$store.dispatch("cart/removeProductFromCart", {
        product: product,
      });
      setTimeout(() => {
        this.$store.dispatch("cart/getCartProducts");
      }, 1000);
    },
  },
  computed: {
    cartItems() {
      return this.$store.state.cart.cartItems;
    },
    cart_sub_total() {
      return this.$store.state.cart.cart_sub_total;
    },
  },
};
</script>
<style lang="scss" scoped>
.cart {
  .heading {
    color: #312620;
    font-size: 28pt;
  }
  .cart-table {
    table {
      thead {
        tr {
          th {
            font-size: 11pt;
            font-weight: bold;
            color: #565656;
            border-bottom: 1px solid #dee2e6;
          }
        }
      }
      .supplier + .supplier {
        border: none;
      }
      .supplier {
        position: relative;
        &::before {
          content: "";
          display: block;
          height: 3rem;
        }
        .name {
          padding-inline-start: 1.5rem;
          position: absolute;
          top: 1rem;
          font-weight: bold;
          font-size: 12pt;
          color: #312620;
        }
        .item-content {
          &:first-of-type {
            td:first-child {
              border-top-left-radius: 0.5rem;
            }
            td:last-child {
              border-top-right-radius: 0.5rem;
            }
          }
          &:last-child {
            td:first-child {
              border-bottom-left-radius: 0.5rem;
            }
            td:last-child {
              border-bottom-right-radius: 0.5rem;
            }
          }
          td {
            text-align: center;
            vertical-align: middle;
            background: rgb(236 240 241 / 20%);
            border: none;
            color: #312620;
            img {
              width: 4rem;
              margin: 0 auto;
            }
            a {
              color: #a0a0a0;
              &:hover {
                color: #ed2124;
              }
            }
          }
        }
      }
    }
    .coupon {
      a {
        margin: 0;
        margin-inline-end: 1rem;
      }
      button {
        margin: 0;
        margin-inline-end: 1rem;
      }
      input {
        border: none;
        border-bottom: 1px solid #7d7d7d;
        color: #544842;
        min-width: 20rem;
      }
    }
  }
  .cart-detail {
    .heading {
      font-size: 18pt;
    }
    .data {
      background: #ecf0f1;
      padding: 2.5rem;
      border-radius: 0.5rem;
      table {
        tbody {
          tr {
            color: #312620;
            font-weight: 600;
            border-bottom: 1px dashed #c5c6c6;
            th {
              padding: 1rem 0;
              width: 25%;
            }
          }
        }
      }
    }
  }
}
</style>
