<template>
  <div class="product position-relative w-100" v-if="data">
    <div class="thumb">
      <a @click="goProduct(data)"
        v-if="data.image_path !== null"
        
        class="d-flex justify-content-center align-items-center product-image"
      >
        <img :src="data.image_path" alt="Product Image" class="Product-Image" />
      </a>
      <div @click="goProduct(data)"
        v-else-if="data.image_path == null && data.product.image_path"
        
        class="d-flex justify-content-center align-items-center product-image"
      >
        <img
          :src="data.product.image_path"
          alt="Product Image"
          class="Product-Image"
        />
      </div>
      <div class="Product-Image" v-else>
        <img :src="data.product.image_path" alt="Product-Image" />
      </div>
      <div class="actions">
        <ul>
          <li>
            <a @click="addToWishlist(data)" v-if="data.is_favorite == false">
              <b-icon-heart></b-icon-heart>
            </a>
            <a v-if="data.is_favorite == true" class="is_favorite">
              <b-icon-heart></b-icon-heart>
            </a>
          </li>
          <li>
            <a @click="goPage2(data)"
              ><b-icon-eye></b-icon-eye
            ></a>
          </li>
        </ul>
      </div>
      <div
        class="info d-flex flex-column align-items-center my-3"
        v-if="data.product"
      >
        <a href="#" class="name" v-if="data.product.title">{{
          data.product.title
        }}</a>
        <div class="price">
          <h5 v-if="data.product_details_by_type.customer_price">
            {{ data.product_details_by_type.customer_price | fixedCurrency }}
            {{ currency }}
          </h5>
          <p
            class="m-0 price-after"
            v-if="
              data.product_details_by_type.price_before_discount &&
              data.product_details_by_type.price_before_discount >
                data.product_details_by_type.customer_price
            "
          >
            {{
              data.product_details_by_type.price_before_discount | fixedCurrency
            }}
            {{ currency }}
          </p>
        </div>
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
import suppliers from "@/services/suppliers"
export default {
  components: {
    BIconHeart,
    BIconEye,
  },
  data() {
    return { count: 0, errors: [] };
  },
  props: ["data"],
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
            this.getSupplierProducts()
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
    getSupplierProducts() {
      suppliers
        .getSupplierProducts(this.supplierProductsId)
        .then((resp) => {
          // console.log("resp", resp);
          this.supplierProducts = resp.data.items.data;
          this.supplierProductsLength = resp.data.items.data.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goProduct(data){
      this.$router.push({
        path:'/details',
        query:{
          id:data.id
        }
      })
    },
    goPage2(data){
      this.$router.push({
        path:'/details',
        query:{
          id:data.product_details_by_type.product_supplier_id
        }
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.product {
  margin: 1rem;
  // background-color: #3a3a43;
  .thumb {
    // .product-image {
    //   img {
    //   }
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
</style>
