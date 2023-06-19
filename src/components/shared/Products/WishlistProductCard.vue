<template>
  <div>
    <div class="card-wrapper" v-if="product">
      <router-link v-if="product.product" :to="{ name: 'productPage', params: { id: product.product.id } }">
        <div class="top-data-holder d-flex justify-space-between align-center">
          <div class="discount-quantity">
            <!-- <div class="product-discount"><small>-20%</small></div> -->
            <div class="product-quantity" v-if="product.product.in_stock == true"><small>in stock</small></div>
          </div>
          <div class="product-rating d-flex justify-center align-center flex-column"
            v-if="product.product.reviews && product.product.reviews.average_rating >= 0">
            <span class="icon"><v-icon icon="mdi-star"></v-icon></span>
            <p class="rating-number">{{ product.product.reviews.average_rating }}</p>
          </div>
        </div>
      </router-link>

      <div class="product-image-wrapper"
        v-if="product.product.images && product.product.images[0] && product.product.images[0].url">
        <router-link :to="{ name: 'productPage', params: { id: product.product.id } }">

          <img :src="product.product.images[0].url" class="productImage" />
        </router-link>
      </div>
      <div class="product-info">
        <router-link :to="{ name: 'productPage', params: { id: product.product.id } }">

          <p class="cat-name" v-if="product.product.category_name">{{ product.category_name }}</p>
          <p class="product-name">
            {{ product.product.name }}
          </p>
        </router-link>
        <v-row class="aligned-row mt-1 mb-3 ">
          <v-col cols="12" lg="5" md="5" sm="12" class="m-0">
            <p class="price-after-desc"
              v-if="product.product.formatted_special_price < product.product.formatted_special_price && product.product.formatted_special_price">
              {{ product.product.formatted_special_price }}</p>
            <p class="product-price">{{ product.product.formatted_price }}</p>
          </v-col>
          <v-col cols="12" lg="7" md="7" sm="12" class="m-0 ">
            <v-button class="addToCartBtn" @click="moveProductToWishlist(product)">
              <span class="icon">
                <v-icon icon="mdi-cart-arrow-down"></v-icon>
              </span>
              {{ $t('cart.addToCart') }}</v-button>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="d-flex justify-space-between align-center">
      <div class="edit">
        <button class="text-main">Edit</button>
      </div>
      <div class="edit">
        <button class="red-text" @click="removeProduct(product)">Remove</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapActions } from 'vuex';
export default {
  props: ['id', 'product'],
  methods: {
    ...mapActions({ removeProduct: 'wishlist/removeProductFromWishlist' }),
    moveProductToWishlist(product) {
      // let data = {
      //   product: product,
      //   quantity: this.quantity ? this.quantity : 1,
      // }
      this.$store.dispatch('wishlist/moveProductToWishlist', product)
    },
  }
};
</script>
  
<style lang="scss" scoped>
.card-wrapper {
  min-height: 300px;

  border-radius: 10px;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  background: #fff;

  &:hover {
    box-shadow: 0px 0px 10px rgb(55 54 45 / 12%);

    .productImage {
      transform: scale(1.1) translateX(20px);
      width: 100%;
    }
  }

  .productImage {
    margin: 35px 0 !important;
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .discount-quantity {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    .product-discount {
      background-color: #b5140e;
      border-radius: 20px;
      opacity: 1;
      color: #fff;
      padding: 5px 10px;
      line-height: 15px;
      margin: 5px;
    }

    .product-quantity {
      background-color: #1da521;
      border-radius: 20px;
      color: #fff;
      padding: 5px 10px;
      line-height: 15px;
      margin: 5px;
    }
  }

  .product-rating {
    .icon {
      color: #eb6841;
    }
  }

  .product-image-wrapper {
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.actions {
  text-align: center;
}

.product-short-actions {
  opacity: 0;
  transform: translateY(-50%);
  transition: all 0.3s ease-in-out;
}</style>
  