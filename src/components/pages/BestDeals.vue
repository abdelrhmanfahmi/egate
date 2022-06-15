<template>
  <div class="product position-relative w-100 text-center single-supplier bg-white position-relative">
    <div class="supplier-data">
      <!-- <div class="thumb">

        <router-link :to="{ path: '/details', query: { id: `${deal.id}` } }" class="d-block text-center">
          <img v-if="deal.image_path"
            :src="deal.image_path"
            alt="supplier image"
          />
          <img v-else
            :src="deal.product.image_path"
            alt="supplier image"
          />
        </router-link>
        <p class="supplier-name text-center mt-3 text-capitalize">
          {{ deal.product.title }}
        </p>
      </div> -->
      <div class="thumb">
        <a
          @click="goProduct(deal)"
          v-if="deal.image_path !== null"
          class="d-flex justify-content-center align-items-center product-image"
        >
          <img
            :src="deal.image_path"
            alt="Product Image"
            class="Product-Image"
          />
        </a>
        <a
          @click="goProduct(deal)"
          v-else
          class="d-flex justify-content-center align-items-center product-image"
        >
          <img
            :src="deal.product.image_path"
            alt="Product Image"
            class="Product-Image"
          />
        </a>
        <div class="actions">
          <ul>
            <li v-if="userData">
              <a @click="addToWishlist(deal) ; changevalue()"  v-if="deal.is_favorite == false">
                <b-icon-heart></b-icon-heart>
              </a>
              <router-link :to="{ path: '/details', query: { id: deal.product_details_by_type.product_supplier_id } }" v-if="deal.is_favorite == true"  class="is_favorite">
                <b-icon-heart></b-icon-heart>
              </router-link>
            </li>
            <li>
              <router-link :to="{ path: '/details', query: { id: deal.product_details_by_type.product_supplier_id } }" @click="goPage2(deal)"><b-icon-eye></b-icon-eye></router-link>
            </li>
          </ul>
        </div>
        <div
          class="info d-flex flex-column align-items-center my-3"
          v-if="deal.product"
        >
          <router-link
            :to="{ path: '/details', query: { id: deal.product_details_by_type.product_supplier_id } }"
            class="name text-dark"
            v-if="deal.product.title"
            >{{ deal.product.title }}</router-link
          >
          <div class="price">
            <h5 v-if="deal.product_details_by_type.customer_price">
              {{ deal.product_details_by_type.customer_price | fixedCurrency }}
              {{ currency }}
            </h5>
            <p
              class="m-0 price-after"
              v-if="
                deal.product_details_by_type.price_before_discount &&
                deal.product_details_by_type.price_before_discount >
                  deal.product_details_by_type.customer_price
              "
            >
              {{
                deal.product_details_by_type.price_before_discount
                  | fixedCurrency
              }}
              {{ currency }}
            </p>
          </div>
        </div>
        <span class="discount d-block text-white" v-if="deal.discount">
          - {{ deal.discount }} %
        </span>
        <span class="new d-block text-white" v-if="deal.view_status_text">{{
          deal.view_status_text
        }}</span>
        <span class="new d-block text-white bg-white" v-else>
          &nbsp;
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { BIconHeart, BIconEye } from "bootstrap-vue";
import globalAxios from "@/services/global-axios";
export default {
  data() {
    return {
      errors:[]
    };
  },
  props: ["deal"],
  components: {
    BIconHeart,
    BIconEye,
  },
  methods: {
    addToWishlist(item) {
      let data = {
        product_supplier_id: item.product_details_by_type.product_supplier_id,
      };
      // this.addProductToWishlist({
      //   product: this.product,
      // });
      return globalAxios
        .post(`members/profile/favorite`, data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
          }
        })
        .catch((error) => {
          // const err = Object.values(error)[2].data;
          // this.errors = err.items;
          // this.errMsg(err.message);
          console.log(error);
        })
    },
    goProduct(data) {
      this.$router.push({
        path: "/details",
        query: {
          id: data.id,
        },
      });
      location.reload();
    },
    goPage2(data) {
      this.$router.push({
        path: "/details",
        query: {
          id: data.product_details_by_type.product_supplier_id,
        },
      });
      location.reload();
    },

    changevalue() {
      this.$emit('getWishlistData')
    },
    
  },
};
</script>
<style lang="scss" scoped>
.product {
  margin: 1rem;
  // background-color: #3a3a43;
  .thumb {
    // .product-image {
    //   padding: 20px 0;
    // }
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
      padding: 10px 0;
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
  object-fit: cover;
}
.is_favorite {
  background: #ed2124 !important;
}
</style>
