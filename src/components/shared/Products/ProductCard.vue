<template>
  <div>
    <div class="card-wrapper">
      <router-link to="/">
        <div class="top-data-holder d-flex justify-space-between align-center">
          <div class="discount-quantity">
            <div class="product-discount"><small>-20%</small></div> 
            <div class="product-quantity"><small >in stock</small></div>
          </div>
          <div class="product-rating d-flex justify-center align-center flex-column">
            <span class="icon" style="color: #0DEEFA;"><v-icon icon="mdi-star"></v-icon></span>
            <p class="rating-number">4</p>
          </div>
        </div>
      </router-link>

      <div class="product-image-wrapper">
        <router-link :to="{name:'productPage', params:{id:product.id}}">
          <img v-if="product.image != null" :src="product.image" class="productImage" style="cursor: pointer;"/>
          <img v-else src="/e-gate/img/Braun-Desktop-EN.9be0286a.png" class="productImage" style="cursor: pointer;"/>
        </router-link>
      </div>
      <div class="product-info">
        <template v-if="product.categories != null">
          <div>
            <div class="styleCssCategories">
              <router-link v-for="(category , idx) in product.categories" :key="idx" :to="{name:'categoryPage', params:{id:category.id}}">            
                  <p class="cat-name" v-if="category != null" > {{category.name_en}} </p>
              </router-link>
            </div>
            <p class="product-name">{{ product.name_en }}</p>
          </div>
        </template>
        <template v-else>
          <router-link to="/">
            <p class="cat-name"> Category Name </p>
            <p class="product-name">{{ product.name_en }}</p>
          </router-link>
        </template>
        
        <v-row class="aligned-row mt-1 mb-3 " >
          <v-col cols="6" lg="6" md="6" sm="6" >
            <p class="price-after-desc" v-if="product.product_price <= product.price">EGP {{product.price}}</p>
            <p class="product-price">EGP {{product.product_price}}</p>
          </v-col>
          <v-col cols="6" lg="6" md="6" sm="6" >
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
    </div>
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
.styleCssCategories{
  display: flex;
  margin-left: -7px;
}
.styleCssCategories .cat-name{
  font-size: 13px;
  border: 1px solid #eee;
  margin-left: 0.5rem;
  padding: 4px 7px;
  border-radius: 5px;
  color: #a3a3a1;
  &:hover {
    color: #fff;
    background: $main-color;
    transition : all .3s ease-in-out
  }
}
.card-wrapper {
  min-height: 300px;

  border-radius: 10px;
  padding: 10px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  background: #fff;

  &:hover {
    box-shadow: 0px 0px 10px rgb(55 54 45 / 12%);
    .product-short-actions {
      opacity: 1;
      transform: translateY(0);
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
@media (min-width:960px) and (max-width:1000px) {
    .addToCartBtn {
        padding: 8px 8px;
        font-size: 0.5rem;
    }
}

@media (min-width:1100px) and (max-width:1300px) {
    .addToCartBtn {
        padding: 8px 8px;
        font-size: 0.8rem;
    }
}
@media screen and (min-width: 1024px) {
    .addToCartBtn {
      padding: 8px 8px;
    }
}

</style>
