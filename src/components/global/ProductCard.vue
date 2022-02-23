<template>
  <div class="product-cart">
    <router-link to="/">
      <b-img
        src="https://humhum.work/user-interface/public/assets/img/product/p4.png"
      >
      </b-img>
    </router-link>
    <div class="card-info">
      <h4 class="main-header my-2">
        <router-link to="/"> product </router-link>
      </h4>
      <span class="price">0.78 LE</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.product-cart {
  margin: 0 10px;
  text-align: center;
  display: inline-block;
  a {
    display: inline-block;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
    img {
      max-width: 100%;
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