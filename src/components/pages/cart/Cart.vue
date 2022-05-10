<template>
  <div class="cart">
    <div
      class="d-flex justify-content-center align-items-center flex-column"
      v-if="loading"
    >
      <img src="@/assets/images/Loader.gif" alt="cart-image" class="w-25" />
    </div>
    <div class="" v-else>
      <div class="" v-if="cartItems !== null">
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
                <td v-if="item.price">
                  {{ item.price | fixedCurrency }} {{ currency }}
                </td>
                <td v-else>-</td>
                <td>
                  <Counter
                    :quantity="item.quantity"
                    :product="item"
                    class="justify-content-center"
                    @changeTitle="ChangeQ($event)"
                  ></Counter>
                </td>
                <td v-if="item.product_sub_total">
                  {{ item.product_sub_total | fixedCurrency }} {{ currency }}
                </td>
                <td v-else>-</td>

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
                    <!-- <router-link
                      to="/profile/account-information-b2b"
                      type="submit"
                      class="login-button dark my-2 py-3 px-4 text-white text-center w-auto"
                    >
                      {{ $t("cart.UpdateDelivery") }}
                    </router-link> -->
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
                    <div class="input-holder">
                      <input
                        type="text"
                        :placeholder="$t('cart.addCoupon')"
                        class="my-2 h-100 p-4 itemInput"
                        @input="changeCoupon($event)"
                      />
                      <span
                        :title="$t('cart.enableButton')"
                        class="close"
                        @click="removeDisabled"
                        >x</span
                      >
                    </div>
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
            <!-- <div class="proceAfterDisc" v-if="couponChecked">
              {{ $t("cart.proceAfterDisc") }} :
              <span
                ><b>{{ totalPayment }}</b></span
              >
            </div> -->
          </table>
        </div>
        <div class="cart-detail p-4">
          <h5 class="heading mb-3">{{ $t("cart.totalCart") }}</h5>
          <div class="data">
            <table class="w-100">
              <tbody>
                <tr>
                  <th>{{ $t("cart.total") }}</th>
                  <td v-if="cart_sub_total">{{ cart_sub_total | fixedCurrency }} {{ currency }}</td>
                </tr>
                <tr>
                  <th>{{ $t("cart.discount") }}</th>
                  <td v-if="totalDiscount">{{ totalDiscount | fixedCurrency }} {{ currency }}</td>
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
                  <td>{{ totalPayment | fixedCurrency }} {{ currency }}</td>
                </tr>
              </tbody>
            </table>
            <div class="checkout d-flex">
              <router-link
                v-if="userData"
                to="/order-shipping"
                class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto"
              >
                {{ $t("cart.next") }}
              </router-link>
              <button
                @click="showModal = true"
                @ok="$refs.cartModal.onSubmit()"
                v-else
                class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto"
              >
                {{ $t("cart.next") }}
              </button>

              <transition name="modal">
                <div class="modal-mask" v-if="showModal">
                  <login-modal @close="closeModal" />
                </div>
              </transition>
              <!-- <router-link
                to="/payment"
                class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto"
              >
                {{ $t("cart.checkout") }}
              </router-link> -->
            </div>
          </div>
        </div>
      </div>
      <div
        class="d-flex justify-content-center align-items-center flex-column"
        v-else
      >
        <img src="@/assets/images/empty-cart.png" alt="cart-image" />
        <!-- <h3 class="m-0">
          {{ $t("cart.noCartProducts") }}
        </h3> -->
      </div>
    </div>
  </div>
</template>

<script>
import Counter from "@/components/global/Counter.vue";
import suppliers from "@/services/suppliers";
import globalAxios from "@/services/global-axios";
import loginModal from "@/components/global/loginModal.vue";
export default {
  components: { Counter, loginModal },
  data() {
    return {
      coupon: null,
      discount: 0,
      loading: false,
      productLoading: false,
      errors: null,
      freeDelivery: false,
      total_cart: [],
      newCartData: null,
      selectedCoupon: null,
      buttonDisabled: false,
      cartItems: null,
      price_after_discount: null,
      couponChecked: false,
      seletedInput: null,
      selectedButton: null,
      selectedSpan: null,
      myQuantity: null,
      showModal: false,
    };
  },
  mounted() {
    this.getCartProducts();
    localStorage.removeItem("discount");
  },
  methods: {
    changeCoupon($event) {
      // console.log($event.target.value);
      this.selectedCoupon = $event.target.value;
      // $event.target.setAttribute('disabled' , 'true')

      let input = $event.target;

      this.seletedInput = input;

      let button = input.parentElement.previousElementSibling;

      this.selectedButton = button;

      let span = input.nextElementSibling;

      this.selectedSpan = span;
    },

    getCartProducts() {
      this.loading = true;
      globalAxios.post(`cart`).then((res) => {
        this.cartItems = res.data.items.cart_items;
      });
      this.loading = false;
    },
    removeFromCart(product) {
      // this.removeProductFromCart({
      //   product: product,
      // });
      this.$store.dispatch("cart/removeProductFromCart", {
        product: product,
      });
      this.loading = true;
      this.cartItems = null;
      setTimeout(() => {
        this.getCartProducts();
      }, 1000);
      setTimeout(() => {
        this.loading = false;
      }, 1200);
    },
    removeDisabled() {
      let myInput = this.seletedInput;

      myInput.removeAttribute("disabled");
      myInput.value = "";
      let button = this.selectedButton;
      button.removeAttribute("disabled");

      this.couponChecked = false;
      globalAxios.post(`cart`).then((res) => {
        this.total_cart = res.data.items;
      });

      this.selectedSpan.style.display = "none";
      document.querySelector(".itemInput").removeAttribute("disabled");
      document.querySelector(".login-button").removeAttribute("disabled");
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
          // let coupons = [];
          if (res.status == 200) {
            this.total_cart = res.data.items;
            this.sucessMsg(res.data.message);
            this.couponChecked = true;
            // let myInput = document.querySelector("input");
            // myInput.setAttribute("disabled", "true");
            this.cartItems = res.data.items.cart_items;

            ///

            let myInput = this.seletedInput;
            let button = this.selectedButton;

            let span = this.selectedSpan;

            span.style.display = "block";
            button.setAttribute("disabled", "true");
            // button.innerHTML = this.$t("cart.enableButton");
            myInput.setAttribute("disabled", "true");
            localStorage.setItem(
              "discount",
              res.data.items.cart_sub_total_disc
            );
          }
        })
        .catch((error) => {
          if (error) {
            const err = Object.values(error)[2].data;
            this.errors = err.items;
            this.errMsg(err.message);
          }
        });
    },
    ChangeQ(myQuantity) {
      this.myQuantity = myQuantity;
      // console.log(myQuantity);
      this.cartItems = null;
      setTimeout(() => {
        this.getCartProducts();
      }, 300);
    },
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },
  },
  computed: {
    // cartItems() {
    //   return this.newCartData
    //     ? this.newCartData
    //     : this.$store.state.cart.cartItems;
    // },
    cart_sub_total() {
      return this.total_cart.cart_sub_total
        ? this.total_cart.cart_sub_total
        : this.$store.state.cart.cart_sub_total;
    },
    totalDiscount() {
      return this.total_cart.cart_sub_total_disc
        ? this.total_cart.cart_sub_total_disc
        : this.discount;
    },
    totalPayment() {
      return this.total_cart.cart_sub_total_after_disc
        ? this.total_cart.cart_sub_total_after_disc
        : this.cart_sub_total;
    },
    newPrice() {
      return this.total_cart;
    },

    freeDeliveryStatus() {
      return sessionStorage.setItem("freeDelivery", this.freeDelivery);
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
.proceAfterDisc {
  position: fixed;
  top: 30%;
  right: 20px;
  background: #ccc;
  padding: 10px 15px;
  font-size: 20px;
  border-radius: 10px;
}
.input-holder {
  position: relative;
  .close {
    position: absolute;
    top: 12px;
    right: 0;
    padding: 15px;
    cursor: pointer;
    display: none;
  }
}
.coupon {
  display: none;
}
.coupon:first-of-type {
  display: block;
}
</style>
