<template>
  <div>
    <div class="card-wrapper">
      <router-link to="/">
        <div class="top-data-holder d-flex justify-space-between align-center">
          <div class="discount-quantity">
            <!-- <div class="product-discount"><small>-20%</small></div> -->
            <div class="product-quantity">
              <small>in stock</small>
            </div>
          </div>
          <div
            class="product-rating d-flex justify-center align-center flex-column"
          >
            <span class="icon"><v-icon icon="mdi-star"></v-icon></span>
            <p class="rating-number text-black">3.5</p>
          </div>
        </div>
      </router-link>

      <div class="product-image-wrapper">
        <router-link to="/">
          <v-img
            src="@/assets/images/product/Image15.png"
            class="productImage"
          ></v-img>
        </router-link>
      </div>
      <div class="product-info">
        <router-link to="/">
          <p class="cat-name">category name</p>
          <p class="product-name">product.name</p>
        </router-link>
        <div class="d-flex justify-space-between align-center mt-1  mb-4">
          <div >
            <p class="price-after-desc">price 1</p>
            <p class="product-price">price 2</p>
          </div>
          <div >
            <v-button class="addToCartBtn">
              <span class="icon">
                <v-icon icon="mdi-cart-outline"></v-icon>
              </span>
              {{ $t("cart.addToCart") }}</v-button
            >
          </div>
        </div>
      </div>
      <div class="product-short-actions">
        <span class="myhr"></span>
        <div class="actions">
          <v-row>
            <v-col cols="12" md="6" sm="12" class="pr-0 pl-0 m-0">
              <v-button class="quickViewBtn actionBtn"
                ><span class="icon">
                  <v-icon icon="mdi-eye-outline"></v-icon> </span
                >quick view</v-button
              >
            </v-col>
            <v-col cols="12" md="6" sm="12" class="pr-0 pl-0 m-0">
              <v-button class="wishlistBtn actionBtn">
                <span class="icon">
                  <v-icon icon="mdi-heart-outline"></v-icon> </span
                >add to wishlist</v-button
              >
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
    <!-- <div class="card-wrapper" v-if="product">
      <router-link :to="{ name: 'productPage', params: { id: product.id } }">
        <div class="top-data-holder d-flex justify-space-between align-center">
          <div class="discount-quantity">
            <div class="product-discount"><small>-20%</small></div>
            <div class="product-quantity">
              <small v-if="product.in_stock == true">in stock</small>
            </div>
          </div>
          <div
            class="product-rating d-flex justify-center align-center flex-column"
            v-if="product.reviews.average_rating >= 0"
          >
            <span class="icon"><v-icon icon="mdi-star"></v-icon></span>
            <p class="rating-number">{{ product.reviews.average_rating }}</p>
          </div>
        </div>
      </router-link>

      <div
        class="product-image-wrapper"
        v-if="product.images[0] && product.images[0].original_image_url"
      >
        <router-link :to="{ name: 'productPage', params: { id: product.id } }">
          <img
            :src="product.images[0].original_image_url"
            class="productImage"
          />
        </router-link>
      </div>
      <div class="product-info">
        <router-link :to="{ name: 'productPage', params: { id: product.id } }">
          <p class="cat-name" v-if="product.category_name">
            {{ product.category_name }}
          </p>
          <p class="product-name">
            {{ product.name }}
          </p>
        </router-link>
        <v-row class="aligned-row mt-1 mb-3">
          <v-col cols="6" lg="6" md="6" sm="6">
            <p
              class="price-after-desc"
              v-if="
                product.formatted_special_price <
                  product.formatted_special_price &&
                product.formatted_special_price
              "
            >
              {{ product.formatted_special_price }}
            </p>
            <p class="product-price">{{ product.formatted_price }}</p>
          </v-col>
          <v-col cols="6" lg="6" md="6" sm="6" v-if="product.in_stock == true">
            <v-button class="addToCartBtn" @click="addProductToCart(product)">
              <span class="icon">
                <v-icon icon="mdi-cart-outline"></v-icon>
              </span>
              {{ $t("cart.addToCart") }}</v-button
            >
          </v-col>
        </v-row>
      </div>
      <div class="product-short-actions">
        <span class="myhr"></span>
        <div class="actions">
          <v-row>
            <v-col cols="12" md="4" sm="12" class="pr-0 pl-0 m-0">
              <v-button class="quickViewBtn actionBtn"
                ><span class="icon">
                  <v-icon icon="mdi-eye-outline"></v-icon> </span
                >quick view</v-button
              >
            </v-col>
            <v-col cols="12" md="4" sm="12" class="pr-0 pl-0 m-0">
              <v-button class="wishlistBtn actionBtn">
                <span class="icon">
                  <v-icon icon="mdi-heart-outline"></v-icon> </span
                >add to wishlist</v-button
              >
            </v-col>
            <v-col cols="12" md="4" sm="12" class="pr-0 pl-0 m-0">
              <v-button class="compareBtn actionBtn">
                <span class="icon">
                  <font-awesome-icon icon="fa-solid fa-code-compare" /> </span
                >compare</v-button
              >
            </v-col>
          </v-row>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ["id", "product"],
  data() {
    return {
      quantity: 1,
    };
  },
  methods: {
    addProductToCart(product) {
      let data = {
        product: product,
        quantity: this.quantity,
      };
      this.$store.dispatch("cart/addProductToCart", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  min-height: 300px;

  border-radius: 10px;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;

  &:hover {
    box-shadow: 0px 0px 10px rgb(55 54 45 / 12%);
    .product-short-actions {
      opacity: 1;
      transform: translateY(0);
    }
    // .productImage {
    //   transform: scale(1.1) translateX(20px);
    //   width: 100%;
    // }
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
}
</style>
