<template>
  <div class="product position-relative w-100">
    <div class="thumb">
      <a
        href="#"
        class="d-flex justify-content-center align-items-center product-image"
      >
        <img :src="data.image" alt="Product Image" />
      </a>
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
      <div class="info d-flex flex-column align-items-center my-3">
        <a href="#" class="name">{{ data.name }}</a>
        <span class="price">{{ data.price }}</span>
      </div>
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
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.product {
  margin: 1rem;
  // background-color: #3a3a43;
  .thumb {
    .product-image {
      img {
      }
    }
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
  }
}
</style>
