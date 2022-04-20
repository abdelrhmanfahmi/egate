<template>
  <div class="product position-relative w-100" v-if="data">
    <div class="thumb">
      <router-link
        v-if="data.image_path !== null"
        :to="{ path: '/details', query: { id: `${data.id}` } }"
        class="d-flex justify-content-center align-items-center product-image"
      >
        <img :src="data.image_path" alt="Product Image" class="Product-Image" />
      </router-link>
      <router-link
        v-else-if="data.image_path == null && data.product.image_path"
        :to="{ path: '/details', query: { id: `${data.id}` } }"
        class="d-flex justify-content-center align-items-center product-image"
      >
        <img
          :src="data.product.image_path"
          alt="Product Image"
          class="Product-Image"
        />
      </router-link>
      <div class="Product-Image" v-else>
        <img :src="data.product.image_path" alt="Product-Image" />
      </div>
      <div class="actions">
        <ul>
          <li>
            <a href="#"><b-icon-heart></b-icon-heart></a>
          </li>
          <li>
            <a href="#"><b-icon-eye></b-icon-eye></a>
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
        <span class="price"
          >{{ data.product_details_by_type.customer_price }}
          {{ currency }}</span
        >
      </div>
      <span class="discount d-block text-white" v-if="data.discount">
        - {{ data.discount }} %
      </span>
      <span class="new d-block text-white" v-if="data.condition == 'new'">{{
        $t("items.new")
      }}</span>
    </div>
  </div>
</template>
<script>
import { BIconHeart, BIconEye } from "bootstrap-vue";
export default {
  components: {
    BIconHeart,
    BIconEye,
  },
  data() {
    return { count: 0 };
  },
  props: ["data"],
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
</style>
