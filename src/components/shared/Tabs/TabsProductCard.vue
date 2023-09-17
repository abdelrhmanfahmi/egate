<template>
  <div>
    <div class="card-wrapper">
      <div class="top-data-holder d-flex justify-space-between align-center">
        <div class="discount-quantity">
          <div class="product-discount"><small>-20%</small></div>
          <div class="product-quantity"><small>in stock</small></div>
        </div>
        <div class="product-rating">
          <span class="icon"><v-icon icon="mdi-star"></v-icon></span>
          <p class="rating-number">4.7</p>
        </div>
      </div>

      <div class="product-image-wrapper">
        <img
          :src="require('@/assets/images/product/Image-11.png')"
          class="productImage"
        />
      </div>
      <div class="product-info">
        <p class="cat-name">Category Name</p>
        <p class="product-name">
          Fresh 65LU433RG Smart Android TV, 65 inch, Frameless,…
        </p>
        <v-row class="aligned-row mt-1 mb-3">
          <v-col cols="6" sm="6" md="12">
            <p class="price-after-desc">Egp 17,999.00</p>
            <p class="product-price">Egp 15,999.00</p>
          </v-col>
          <v-col cols="6" sm="6" md="12">
            <v-button class="addToCartBtn">
              <span class="icon">
                <v-icon icon="mdi-cart-arrow-down"></v-icon>
              </span>
              add to cart</v-button
            >
          </v-col>
        </v-row>
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
            <!-- <v-col cols="12" md="4" sm="12" class="pr-0 pl-0 m-0">
              <v-button class="compareBtn actionBtn">
                <span class="icon"> <font-awesome-icon icon="fa-solid fa-code-compare" /> </span
                >compare</v-button
              >
            </v-col> -->
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
}
</style>
