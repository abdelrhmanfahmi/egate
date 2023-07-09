<template>
  <div>
    <!-- <div class="wrapper" v-if="product">
      <div class="rating">
        <div class="aligned-row" v-if="product.reveiws">
          <span><v-rating v-model="rating" half-increments disabled></v-rating></span>
          <span class="text-gray mx-2" v-if="product.reveiws.total">({{ product.reveiws.total }} REWIEWS)</span>
          <pre>{{ rating }}</pre>
        </div>
      </div>
      <div class="productInfo">
        <p class="productName" v-if="product.name">
          {{ product.name }}
        </p>
        <div class="product-price my-3" v-if="product.formatted_price">
          <p>{{ product.formatted_price }}</p>
        </div>
      </div>
      <div class="productActions my-5 d-flex align-center">
        <v-btn v-if="product.in_stock == true" variant="outlined" class="border-main mx-2"
          @click="addProductToCart(product)"> {{ $t('cart.addToCart') }}
        </v-btn>
        <v-btn v-if="product.in_stock == true" variant="outlined" class="bg-main mx-2"> Buy It Now </v-btn>
        <div class="wrapper" v-if="product">

          <div class="icon-wishlist mx-2" @click="addToWishlist(product)"
            :class="{ 'in-wishlist': product.is_saved == true }"></div>

        </div>
      </div>
      <div class="productColors my-3">
        <ProductVariants :product="product" />
      </div>
      <div class="productPower my-3">
        <p>Power:</p>
        <div class="d-flex">
          <label><input type="radio" name="select" value="1.5 HP" v-model="checkPower" /><span>1.5 HP</span>
          </label>
          <label><input type="radio" name="select" value="2 HP" v-model="checkPower" /><span>2 HP</span>
          </label>
          <label><input type="radio" name="select" value="3 HP" v-model="checkPower" /><span>3 HP</span>
          </label>
        </div>
      </div>
    </div> -->
    <div class="wrapper">
      <div class="rating">
        <div class="aligned-row">
          <span
            ><v-rating v-model="rating" half-increments disabled></v-rating
          ></span>
          <span class="text-gray mx-2">(3 REWIEWS)</span>
          <pre>{{ rating }}</pre>
        </div>
      </div>
      <div class="productInfo">
        <p class="productName">product name</p>
        <div class="product-price my-3">
          <p>price</p>
        </div>
      </div>
      <div class="productActions my-5 d-flex align-center">
        <v-btn variant="outlined" class="main-color border-second mx-2">
          <span class="main-color">{{ $t("cart.addToCart") }}</span>
        </v-btn>
        <v-btn variant="outlined" class="bg-main mx-2 text-white">
          Buy It Now
        </v-btn>
        <div class="wrapper">
          <div class="icon-wishlist mx-2"></div>
        </div>
      </div>
      <div class="productColors my-3">
        <ProductVariants />
      </div>
      <div class="productPower my-3">
        <p>Power:</p>
        <div class="d-flex">
          <label
            ><input
              type="radio"
              name="select"
              value="1.5 HP"
              v-model="checkPower"
            /><span>1.5 HP</span>
          </label>
          <label
            ><input
              type="radio"
              name="select"
              value="2 HP"
              v-model="checkPower"
            /><span>2 HP</span>
          </label>
          <label
            ><input
              type="radio"
              name="select"
              value="3 HP"
              v-model="checkPower"
            /><span>3 HP</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductVariants from "./ProductVariants.vue";
import myMixin from "@/mixins.js";
import productActions from "@/services/productActions";
export default {
  mixins: [myMixin],
  data: () => ({
    rating: 3.5,
    checkPower: null,
    quantity: 1,
  }),
  components: {
    ProductVariants,
  },
  methods: {
    showAlert() {
      this.sucessMsg("Product Added to favorite Successfully");
    },
    addProductToCart(product) {
      let data = {
        product: product,
        quantity: this.quantity,
      };
      this.$store.dispatch("cart/addProductToCart", data);
    },
    addToWishlist(product) {
      this.$store.dispatch("wishlist/addProductToWishlist", product);
    },
  },
  props: {
    product: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.mdi-heart-outline {
  color: $gray !important;
  font-size: 40px;
}

label {
  display: block;
  padding: 5px;
  position: relative;
  padding-left: 10px;
}

label input {
  display: none;
}

label span {
  border: 1px solid #ccc;

  display: block;
  text-align: center;
  border-radius: 5px;
  padding: 3px 20px;
}

input:checked + span {
  border: 1px solid $main-color;
}

// .wrapper {
//   padding: 50px;
//   margin: 0 auto;
//   display: block;
//   width: 100px;
// }

.icon-wishlist {
  cursor: pointer;
  width: 30px;
  height: 28px;
  opacity: 0.5;
  background:
    // DON't use a base64 encoded svg this is just for this prototype, use a normal external link to a svg file
    url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA0LjI1IDQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQuMjUgNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik0yLjEyLDRDMi4xLDQsMi4wNywzLjk5LDIuMDUsMy45OEMxLjk4LDMuOTIsMC4zLDIuNjgsMC4wNCwxLjYyYy0wLjEtMC40My0wLjAxLTAuODgsMC4yNC0xLjJDMC41LDAuMTUsMC44MSwwLDEuMTYsMAoJCWMwLjUsMCwwLjgsMC4yNiwwLjk2LDAuNTFDMi4yOCwwLjI2LDIuNTksMCwzLjA4LDBjMC4zNSwwLDAuNjYsMC4xNSwwLjg4LDAuNDNjMC4yNSwwLjMyLDAuMzQsMC43NywwLjI0LDEuMgoJCUMzLjk1LDIuNjgsMi4yNywzLjkyLDIuMiwzLjk4QzIuMTgsMy45OSwyLjE1LDQsMi4xMiw0eiBNMS4xNiwwLjI1Yy0wLjM1LDAtMC41NywwLjE4LTAuNjgsMC4zM0MwLjI4LDAuODQsMC4yLDEuMjIsMC4yOSwxLjU3CgkJYzAuMjEsMC44NSwxLjUxLDEuOSwxLjg0LDIuMTVjMC4zMy0wLjI1LDEuNjMtMS4zMSwxLjg0LTIuMTVjMC4wOC0wLjM1LDAuMDEtMC43My0wLjE5LTAuOThDMy42NSwwLjQzLDMuNDMsMC4yNSwzLjA4LDAuMjUKCQljLTAuNjcsMC0wLjg0LDAuNTctMC44NCwwLjU4QzIuMjMsMC44OCwyLjE4LDAuOTIsMi4xMiwwLjkyaDBjLTAuMDYsMC0wLjEtMC4wNC0wLjEyLTAuMDlDMiwwLjgxLDEuODMsMC4yNSwxLjE2LDAuMjV6Ii8+CjwvZz4KPC9zdmc+Cg==");

    background-repeat: no-repeat;
  &:hover {
    opacity: 1;
  }

  &.in-wishlist {
    opacity: 1;
    animation-name: wishlist-ani;
    animation-duration: 1000ms;
    background:
      // DON't use a base64 encoded svg this is just for this prototype, use a normal external link to a svg file
      url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjE5NyAtODYuNzIgODE0LjA5NSA3NjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMTk3IC04Ni43MiA4MTQuMDk1IDc2ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6IzIwMjAyMDt9DQoJLnN0MXtmaWxsOiNDQUQ3NDc7fQ0KPC9zdHlsZT4NCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02MDQuMDQ3LDY4MS4yOGMtMy44NCwwLTkuNi0xLjkyLTEzLjQ0LTMuODRjLTEzLjQ0LTExLjUyLTMzNi0yNDkuNi0zODUuOTItNDUzLjEyDQoJYy0xOS4yLTgyLjU2LTEuOTItMTY4Ljk2LDQ2LjA4LTIzMC40YzQyLjI0LTUxLjg0LDEwMS43Ni04MC42NCwxNjguOTYtODAuNjRjOTYsMCwxNTMuNiw0OS45MiwxODQuMzIsOTcuOTINCgljMzAuNzItNDgsOTAuMjQtOTcuOTIsMTg0LjMyLTk3LjkyYzY3LjIsMCwxMjYuNzIsMjguOCwxNjguOTYsODIuNTZjNDgsNjEuNDQsNjUuMjgsMTQ3Ljg0LDQ2LjA4LDIzMC40DQoJYy00OCwyMDEuNi0zNzAuNTYsNDM5LjY4LTM4NCw0NTEuMkM2MTUuNTY4LDY3OS4zNiw2MDkuODA3LDY4MS4yOCw2MDQuMDQ3LDY4MS4yOHoiLz4NCjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00MTkuNzI4LTM4LjcyYy02Ny4yLDAtMTA5LjQ0LDM0LjU2LTEzMC41Niw2My4zNmMtMzguNCw0OS45Mi01My43NiwxMjIuODgtMzYuNDgsMTkwLjA4DQoJYzQwLjMyLDE2My4yLDI4OS45MiwzNjQuOCwzNTMuMjgsNDEyLjhjNjMuMzYtNDgsMzEyLjk2LTI1MS41MiwzNTMuMjgtNDEyLjhjMTUuMzYtNjcuMiwxLjkyLTE0MC4xNi0zNi40OC0xODguMTYNCgljLTI0Ljk2LTMwLjcyLTY3LjItNjUuMjgtMTM0LjQtNjUuMjhjLTEyOC42NCwwLTE2MS4yOCwxMDkuNDQtMTYxLjI4LDExMS4zNmMtMS45Miw5LjYtMTEuNTIsMTcuMjgtMjMuMDQsMTcuMjhsMCwwDQoJYy0xMS41MiwwLTE5LjItNy42OC0yMy4wNC0xNy4yOEM1ODEuMDA4LDY4LjgsNTQ4LjM2Ny0zOC43Miw0MTkuNzI4LTM4LjcyeiIvPg0KPC9zdmc+DQo=");
  }
}

@keyframes wishlist-ani {
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(0.5);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>
