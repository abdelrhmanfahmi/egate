<template>
  <div class="cart">
    <div class="" v-if="!loading">
      <div class="" v-if="cartItems">
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
            <tbody
              class="supplier"
              v-for="(supplier, index) in cartItems"
              :key="index"
            >
              <h5 class="name">
                {{ supplier.supplier_name }}
              </h5>
              <tr
                class="item-content"
                v-for="(item, index) in supplier.products"
                :key="index"
              >
                <td class="media">
                  <router-link
                    :to="{
                      path: '/details',
                      query: { id: `${item.product_supplier_id}` },
                    }"
                    class="thumb"
                  >
                    <img
                      :src="item.product_image"
                      :alt="item.name + ' image'"
                      class="product-image"
                    />
                  </router-link>
                </td>
                <td>
                  <router-link
                    :to="{
                      path: '/details',
                      query: { id: `${item.product_supplier_id}` },
                    }"
                  >
                    {{ item.product_name }}
                  </router-link>
                </td>
                <td>{{ item.price }}</td>
                <td>
                  <Counter
                    :quantity="item.quantity"
                    :product="item"
                    class="justify-content-center"
                  ></Counter>
                </td>
                <td>
                  {{ item.product_sub_total }}
                </td>

                <td>
                  <div class="actions" @click="removeFromCart(item)">
                    <span class="action-icon">
                      <font-awesome-icon icon="fa-solid fa-trash" />
                    </span>
                  </div>
                </td>
              </tr>
              <br />
              <tr>
                <div
                  class="coupon my-4"
                  v-for="item in supplier.products"
                  :key="item.id"
                >
                  <div class="d-flex flex-wrap align-items-center">
                    <router-link
                      to="/profile/account-information-b2b"
                      type="submit"
                      class="login-button dark my-2 py-3 px-4 text-white text-center w-auto"
                    >
                      {{ $t("cart.UpdateDelivery") }}
                    </router-link>
                    <!-- <b-button
                      
                      type="submit"
                      @click="enableButton"
                      class="login-button my-2 py-3 px-4 w-auto"
                    >
                      {{ $t("cart.couponDiscount") }}
                    </b-button> -->
                    <b-button
                      
                      type="submit"
                      @click="checkCoupon(supplier)"
                      class="login-button my-2 py-3 px-4 w-auto"
                    >
                      {{ $t("cart.couponDiscount") }}
                    </b-button>
                    <input
                      type="text"
                      :placeholder="$t('cart.addCoupon')"
                      class="my-2 h-100 p-4"
                      id="itemInput"
                      @input="changeCoupon($event)"
                    />
                  </div>
                  <div class="text-danger">
                    <ul>
                      <li v-for="(error, index) in errors" :key="index">
                        {{ error }}
                      </li>
                    </ul>
                  </div>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="cart-detail p-4">
          <h5 class="heading mb-3">{{ $t("cart.totalCart") }}</h5>
          <div class="data">
            <table class="w-100">
              <tbody>
                <tr>
                  <th>{{ $t("cart.total") }}</th>
                  <td>{{ cart_sub_total }}</td>
                </tr>
                <tr>
                  <th>{{ $t("cart.discount") }}</th>
                  <td>{{ totalDiscount }}</td>
                </tr>
                <!-- <tr>
                  <th>{{ $t("cart.delivery") }}</th>
                  <td>
                    <div class="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="freeDelivery"
                        v-model="freeDelivery"
                      />
                      {{ freeDeliveryStatus }}
                      <label class="custom-control-label" for="freeDelivery">
                        {{ $t("cart.free") }}
                      </label>
                    </div>
                  </td>
                </tr> -->
                <tr>
                  <th>{{ $t("cart.total") }}</th>
                  <td>
                    {{ totalPayment }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="checkout d-flex">
              <router-link
                to="/payment"
                class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto"
              >
                {{ $t("cart.checkout") }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div
        class="d-flex justify-content-center align-items-center flex-column"
        v-else
      >
        <img src="@/assets/images/empty-cart.png" alt="cart-image" />
        <h3 class="m-0">
          {{ $t("cart.noCartProducts") }}
        </h3>
      </div>
    </div>
    <div
      class="d-flex justify-content-center align-items-center flex-column"
      v-else
    >
      <img src="@/assets/images/Loader.gif" alt="cart-image" class="w-25" />
    </div>
  </div>
</template>

<script>
import Counter from "../../global/Counter.vue";
import suppliers from "@/services/suppliers";
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
      coupon: null,
      discount: 0,
      loading: false,
      errors: null,
      freeDelivery: false,
      total_cart: [],
      newCartData: null,
      selectedCoupon: null,
      buttonDisabled: false,
    };
  },
  mounted() {
    this.getCartProducts();
  },
  methods: {
    changeCoupon($event) {
      // console.log($event.target.value);
      this.selectedCoupon = $event.target.value;
    },

    getCartProducts() {
      this.loading = true;
      this.$store.dispatch("cart/getCartProducts");
      this.loading = false;
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
    checkCoupon(supplier) {
      // let data = {
      //   supplier_id: supplier.supplier_id,
      //   coupon: this.coupon,
      // };

      var data = {
        coupons: [
          {
            coupon: this.selectedCoupon,
            supplier_id: supplier.supplier_id,
          },
        ],
      };

      suppliers
        .checkCoupon(data)
        .then((res) => {
          console.log(res);
          // let coupons = [];
          if (res.status == 200) {
            this.discount = res.data.items.discount;
            this.sucessMsg(res.data.message);
            // coupons.push(res.data.items.uuid);

            // var existing = localStorage.getItem("coupons");
            // existing = existing ? existing.split(",") : [];
            // existing.push(res.data.items.uuid);
            // localStorage.setItem("my_coupons", existing);

            // localStorage.setItem("discount", res.data.items.discount);

            // if (existing) {
            //   alert("exist");
            //   if (data !== existing) {
            //     existing.push(data);
            //   }
            // } else {
            //   alert("not exist");
            // }
            // console.log(data);
            // this.newCartData = res.data.items.suppliers
            this.total_cart = res.data.items.total_cart;
            // console.log("total_cart", this.total_cart);

            // this.productInfo = res.data.items;
            // this.total_cart = res.data.items.total_cart;

            // let variantData = res.data.items.products;
            // for (let index = 0; index < variantData.length; index++) {
            //   // this.variants = variantData[index];
            //   this.productInfo.suppliers[index].selectedCoupon = null;
            // }

            let myInput = document.getElementById("itemInput");

            let prevButton = myInput.previousElementSibling;

            if (myInput.value.length > 0) {
              myInput.setAttribute("disabled", "true");
              // prevButton.setAttribute("disabled","true")


            console.log(prevButton);
              prevButton.innerHTML = this.$t('cart.enableButton')
              this.buttonDisabled = true;
            }
            prevButton.onclick = function(){
              // location.reload()

              return this.totalPayment = 200
            }
          }
        })
        .catch((error) => {
          if (error) {
            const err = Object.values(error)[2].data;
            this.errors = err.items;
            this.errMsg(err.message);
          }
        })
        .finally(() => {
          this.coupon = "";
        });
    },
    enableButton() {
      alert("enabled");
      let myInput = document.getElementById("itemInput");
      if (myInput.value.length > 0) {
        myInput.removeAttribute("disabled");
        this.buttonDisabled = false;
      }
    },
  },
  computed: {
    cartItems() {
      return this.newCartData
        ? this.newCartData
        : this.$store.state.cart.cartItems;
    },
    cart_sub_total() {
      return this.total_cart.total_price
        ? this.total_cart.total_price
        : this.$store.state.cart.cart_sub_total;
    },
    totalDiscount() {
      return this.total_cart.total_discount
        ? this.total_cart.total_discount
        : this.discount;
    },
    totalPayment() {
      return this.total_cart.price_after_discount
        ? this.total_cart.price_after_discount
        : this.cart_sub_total;
    },
    newPrice() {
      return this.total_cart;
    },

    freeDeliveryStatus() {
      return sessionStorage.setItem("freeDelivery", this.freeDelivery);
    },
  },
  // beforeDestroy(){
  //   localStorage.removeItem('coupons')
  // }
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
              width: 8rem;
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
.actions {
  color: #000;
  .action-icon {
    font-size: 12pt;
    cursor: pointer;
  }
}
input[type="text"]:disabled {
  cursor: no-drop;
}
</style>
