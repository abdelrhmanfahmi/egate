<template>
  <!-- product component  -->
  <div class="product position-relative w-100" v-if="data && data.product_details_by_type.quantity >= 1">
    <div class="thumb">
      <a @click="goProduct(data)" v-if="data.image_path !== null"
        class="d-flex justify-content-center align-items-center">
        <img :src="data.image_path" alt="Product Image" class="Product-Image" />
      </a>
      <div @click="goProduct(data)" v-else-if="data.image_path == null && data.product.image_path"
        class="d-flex justify-content-center align-items-center ">
        <img @click="goPage2(data)" :src="data.product.image_path" alt="Product Image" class="Product-Image" />
      </div>
      <div class="Product-Image" @click="goPage2(data)" v-else>
        <img :src="data.product.image_path" v-if="data.product.image_path" alt="Product-Image" />
        <div class="logo-holder" v-else>
          <img :src="logoEnv" v-if="logoEnv" class="Product-Image" alt="logo">
          <img src="@/assets/images/logo.png" v-else alt="logo" class="Product-Image" />
        </div>
      </div>
      <div class="actions">
        <ul>
          <li v-if="buyerUserData">
            <div class="" v-if="favourite">

              <a @click="addToWishlist(data)" v-if="data.is_favorite == false">
                <b-icon-heart></b-icon-heart>
              </a>
              <a v-if="data.is_favorite == true" class="is_favorite">
                <b-icon-heart></b-icon-heart>
              </a>
            </div>
          </li>
          <li>
            <a @click="goPage2(data)"><b-icon-eye></b-icon-eye></a>
          </li>
        </ul>
      </div>
      <div class="info d-flex flex-column align-items-center my-3" v-if="data.product">
        <a @click="goPage2(data)" class="name" v-if="data.product.title">{{
          data.product.title
        }}</a>
        <div class="price">
          <h5 v-if="data.product_details_by_type.customer_price">
            {{ data.product_details_by_type.customer_price | fixedCurrency }}
            {{ currency }}
          </h5>
          <p class="m-0 price-after" v-if="
            data.product_details_by_type.price_before_discount &&
            data.product_details_by_type.price_before_discount >
            data.product_details_by_type.customer_price
          ">
            {{
              data.product_details_by_type.price_before_discount | fixedCurrency
            }}
            {{ currency }}
          </p>
        </div>
      </div>
      <div class="addToCartHolder d-flex justify-content-end align-items-center"
        v-if="data.product_details_by_type.quantity <= 1">
        <b-button @click="addToCart(data)"
          class="btn btn-loght border-0 outline-none shadow-none d-block add-cart cart-btn btn-block new w-25" v-if="
            (add_to_cart &&
              data.product_details_by_type.add_type === 'cart') ||
            (add_to_cart &&
              data.product_details_by_type.add_type === 'both')
          ">
          <span>
            <font-awesome-icon icon="fa-solid fa-cart-shopping" />
          </span>
        </b-button>
      </div>
      <div class="addToCartHolder d-flex justify-content-end align-items-center" v-else>
        <div v-if="add_to_cart === 'available'">
          <div>
            <b-form-select v-model="selected">
              <b-form-select-option :value="i" v-for="(i, index) in 30"
                :key="index">{{ i }}</b-form-select-option>
            </b-form-select>
          </div>
        </div>
        <b-button @click="addToCartAgain(data)"
          class="btn btn-loght border-0 outline-none shadow-none d-block add-cart cart-btn btn-block new w-25" v-if="
            (add_to_cart &&
              data.product_details_by_type.add_type === 'cart') ||
            (add_to_cart &&
              data.product_details_by_type.add_type === 'both')
          ">
          <span>
            <font-awesome-icon icon="fa-solid fa-cart-shopping" />
          </span>
        </b-button>
      </div>
      <span class="discount d-block text-white" v-if="data.discount">
        - {{ data.discount }} %
      </span>
      <span class="new d-block text-white" v-if="data.view_status_text">{{
        data.view_status_text
      }}</span>
    </div>
  </div>
</template>
<script>
import { BIconHeart, BIconEye } from "bootstrap-vue";
import globalAxios from "@/services/global-axios";
import suppliers from "@/services/suppliers";
export default {
  components: {
    BIconHeart,
    BIconEye,
  },
  data() {
    return {
      count: 0,
      errors: [],
      mySelectedOption: this.data.product_details_by_type.min_order_quantity
        ? this.data.product_details_by_type.min_order_quantity
        : 1,
      selected: this.data.product_details_by_type.min_order_quantity
        ? this.data.product_details_by_type.min_order_quantity
        : 1,
      options: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
      ],
    };
  },
  /**
   *  props
   */
  props: ["data"],
  methods: {
    /**
     * @vuese
     *  add product to wishlist (favorite)
     */
    addToWishlist(item) {
      let data = {
        product_supplier_id: item.product_details_by_type.product_supplier_id,
      };
      return globalAxios
        .post(`members/profile/favorite`, data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
            this.getSupplierProducts();
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        })
        .finally(() => {
          this.getWishlistProducts();
        });
    },
    /**
     * @vuese
     *  get supplier products
     */
    getSupplierProducts() {
      suppliers
        .getSupplierProducts(this.supplierProductsId)
        .then((resp) => {
          this.supplierProducts = resp.data.items.data;
          this.supplierProductsLength = resp.data.items.data.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
     *  go to product page
     */
    goProduct(data) {
      this.$router.replace(
        {
          path: "/details",
          query: {
            id: data.id,
          },
        },
        () => {
          this.$router.go(0);
        }
      );
    },
    /**
     * @vuese
     *  gog to product page by supplier
     */
    goPage2(data) {
      this.$router.replace(
        {
          path: "/details",
          query: {
            id: data.product_details_by_type.product_supplier_id,
          },
        },
        () => {
          this.$router.go(0);
        }
      );
    },
    /**
     * @vuese
     *  add product to cart if not select quantity from dropdown
     */
    addToCart(myProduct) {
      let data = {
        product_supplier_id:
          myProduct.product_details_by_type.product_supplier_id,
        quantity: this.selected > 0 ? this.selected : 1,
      };
      return globalAxios
        .post(`cart/add`, data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);

            this.$modal.show(
              () => import("@/components/cart/cartModal.vue"),
              {
                product: myProduct,
              },
              { width: "700", height: "auto", adaptive: true }
            );
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        })
        .finally(() => {
          setTimeout(() => {
            this.$store.dispatch("cart/getCartProducts");
          }, 500);
        });
    },
    /**
     * @vuese
     *  add product to cart by select quantity from dropdown numbers
     */
    addToCartAgain(myProduct) {
      let data = {
        product_supplier_id:
          myProduct.product_details_by_type.product_supplier_id,
        quantity: this.selected > 0 ? this.selected : 1,
      };
      return globalAxios
        .post(`cart/add`, data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);

            this.$modal.show(
              () => import("@/components/cart/cartModal.vue"),
              {
                product: myProduct,
              },
              { width: "700", height: "auto", adaptive: true }
            );
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        })
        .finally(() => {
          setTimeout(() => {
            this.$store.dispatch("cart/getCartProducts");
          }, 500);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
/**
      *  component style
    */
.product {
  margin: 1rem;

  .thumb {
    .actions {
      position: absolute;
      top: 25px;
      right: 25px;
      z-index: 1;
      transform: translateX(30px);
      transition: 0.3s linear;
      opacity: 0;

      ul {
        li {
          margin-bottom: 1rem;

          a {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 27px;
            height: 27px;
            background: #3a3a43;
            border-radius: 50%;
            color: #fff;

            &:hover {
              background: #ed2124;
            }
          }
        }
      }
    }

    &:hover {
      .actions {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .info {
      .name {
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 6px;
        color: #544842;

        &:hover {
          color: #ed2124;
        }
      }

      .price {
        display: block;
        font-size: 14px;
        font-weight: 600;
        color: #544842;
        font-family: "Almarai", sans-serif;
      }
    }

    .new,
    .discount {
      margin: 0.2rem 0;
    }

    .new {
      background: red;
    }

    .discount {
      background: #ca84ac;
    }
  }
}

.Product-Image {
  width: 100%;
  height: 200px;
  object-fit: contain;
}

.is_favorite {
  background: #ed2124 !important;
}

.Product-Image {
  cursor: pointer;
}

.custom-select,
.custom-select:focus {
  border: none;
  box-shadow: none;
}
</style>
