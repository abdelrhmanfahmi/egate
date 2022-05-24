<template>
  <div class="product-cart">
    <div v-if="slider">
      <router-link
        class="img-holder"
        :to="{ path: '/details', query: { id: `${slider.id}` } }"
        v-if="slider.product.image_path"
      >
        <b-img :src="slider.product.image_path"> </b-img>
      </router-link>
      <div class="card-info">
        <h4 class="main-header my-2" v-if="slider.product.title">
          <router-link
            :to="{ path: '/details', query: { id: `${slider.id}` } }"
          >
            {{ slider.product.title }}
          </router-link>
          <!-- {{ slider.product.title }} -->
        </h4>
        <h5 class="price m-0" v-if="slider.product_details_by_type.price">
          {{ slider.product_details_by_type.price | fixedCurrency }}
          {{ currency }}
        </h5>
        <p
          class="price-after price m-0"
          v-if="
            slider.product_details_by_type.price_before_discount &&
            slider.product_details_by_type.price_before_discount <
              slider.product_details_by_type.price
          "
        >
          {{
            slider.product_details_by_type.price_before_discount | fixedCurrency
          }}
          {{ currency }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["slider"],
};
</script>

<style lang="scss" scoped>
.product-cart {
  margin: 0 10px;
  text-align: center;
  display: inline-block;
  a {
    display: inline-block;
    opacity: 0.7;

    border-radius: 50%;
    &:hover {
      opacity: 1;
    }
    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      display: block;
    }
  }
  .card-info {
    h4 {
      a {
        opacity: 1;
        color: #312620;
        &:hover {
          color: #2b96cc;
        }
      }
    }
  }
}
</style>
