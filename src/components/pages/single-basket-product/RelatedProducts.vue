<template>
    <!-- product component  -->
    <div class="product position-relative w-100" v-if="data && data.in_stock == true">
      <div class="thumb">
        <a @click="goProduct(data)" v-if="data.image_path !== null"
          class=" product-image">
          <img :src="data.image_path" alt="Product Image" class="Product-Image" />
        </a>
        <div @click="goProduct(data)" v-else-if="data.image_path == null && data.product.image_path"
          class=" product-image">
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
        </div>
        <div class="info d-flex flex-column align-items-center my-3" v-if="data">
          <a @click="goPage2(data)" class="name" v-if="data.title">{{
            data.title
          }}</a>
          <div class="price">
            <h5 v-if="data.basket_price">
              {{ data.basket_price | fixedCurrency }}
              {{ currency }}
            </h5>
          </div>
        </div>
        <!-- <div class="addToCartHolder d-flex justify-content-end align-items-center"
          v-if="data.in_stock == true">
          <b-button @click="addToCart(data)"
            class="btn btn-loght border-0 outline-none shadow-none d-block add-cart cart-btn btn-block new w-25" v-if="
              (add_to_cart == true&&
                data.product_details_by_type.add_type === 'cart') ||
              (add_to_cart == true&&
                data.product_details_by_type.add_type === 'both')
            ">
            <span>
              <font-awesome-icon icon="fa-solid fa-cart-shopping" />
            </span>
          </b-button>
        </div>
        <div class="addToCartHolder d-flex justify-content-end align-items-center" v-else>
          <div v-if="add_to_cart == true">
            <div>
              <b-form-select v-model="selected">
                <b-form-select-option :value="i" v-for="(i, index) in 30"
                  :key="index">{{ i }}</b-form-select-option>
              </b-form-select>
            </div>
          </div>
          <b-button @click="addToCartAgain(data)"
            class="btn btn-loght border-0 outline-none shadow-none d-block add-cart cart-btn btn-block new w-25" v-if="
              (add_to_cart == true&&
                data.product_details_by_type.add_type === 'cart') ||
              (add_to_cart == true&&
                data.product_details_by_type.add_type === 'both')
            ">
            <span>
              <font-awesome-icon icon="fa-solid fa-cart-shopping" />
            </span>
          </b-button>
        </div> -->
        <span class="new d-block text-white" v-if="data.view_status_text">{{
          data.view_status_text
        }}</span>
      </div>
    </div>
  </template>
  <script>
  import globalAxios from "@/services/global-axios";
  import suppliers from "@/services/suppliers";
  export default {

    data() {
      return {
        count: 0,
        errors: [],
        mySelectedOption:1,
        selected: 1,
        options: [
          { value: null, text: "Please select an option" },
          { value: "a", text: "This is First option" },
        ],
      };
    },
    /**
     *  props
     */
    props: ["data" , "dealType"],
    methods: {
      /**
       * @vuese
       *  add product to wishlist (favorite)
       */
      addToWishlist(item) {
        let data = {
          product_supplier_id: item.id,
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
            path: "/basketOfferDetails",
            query: {
              id: data.id,
              type:this.dealType ? this.dealType :null
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
            path: "/basketOfferDetails",
            query: {
              id: data.id,
              type:this.dealType ? this.dealType :null
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
            myProduct.id,
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
            myProduct.id,
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
                background: $main-color;
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
            color: $main-color;
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
        background: $main-color;
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
    background: $main-color !important;
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
  